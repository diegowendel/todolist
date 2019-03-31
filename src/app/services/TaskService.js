const HTTP = require('../utils/HTTP');
const Logger = require('../utils/Logger');
const Moment = require('moment');
const { TaskResponse } = require('../dto/TaskResponse');

const prepareResponse = (task) => {
  response = {};
  response.id = task._id;
  response.nome = task.nome;
  response.tipo = task.tipo;
  response.data = Moment(task.data).format("YYYY-MM-DD HH:mm:ss");
  response.status = task.status;
  response.dataCriacao = Moment(task.dataCriacao).format("YYYY-MM-DD HH:mm:ss");
  return response;
}

module.exports = (app) => {

  const { Task } = app.models;

  const TaskService = {
    findById(id, callback) {
      Task.findById(id, (err, task) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar buscar o registro no banco de dados.'}), null);
        } else {
          const response = task ? new TaskResponse(HTTP.OK, prepareResponse(task)) :
            new TaskResponse(HTTP.NOT_FOUND, {message: "id passado não corresponde a nenhuma tarefa."});
          callback(null, response);
        }
      });
    },
    find(params, callback) {
      Task.find({ 'nome': new RegExp(params.nome, 'i')}, (err, tasks) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar buscar os registros no banco de dados.'}), null);
        } else {
          callback(null, new TaskResponse(HTTP.OK, tasks.map(prepareResponse)));
        }
      });
    },
    insert(newTask, callback) {
      let task = new Task(newTask);
      task.data = Moment(newTask.data).toDate();
      task.save((err) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar criar novo registro no banco de dados.'}), null);
        } else {
          callback(null, new TaskResponse(HTTP.CREATED, prepareResponse(task)));
        }
      });
    },
    update(task, callback) {
      const id = String(task.id);
      Task.findByIdAndUpdate(id, task, {new: true}, (err, task) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar atualizar o registro no banco de dados.'}), null);
        } else {
          const response = task ? new TaskResponse(HTTP.OK, prepareResponse(task)) :
            new TaskResponse(HTTP.NOT_FOUND, {message: "id passado não corresponde a nenhuma tarefa."});
          callback(null, response);
        }
      });
    },
    remove(id, callback) {
      Task.findByIdAndDelete(id, (err, task) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar remover o registro do banco de dados.'}), null);
        } else {
          const response = task ? new TaskResponse(HTTP.OK, {message: "Registro removido com sucesso."}) :
            new TaskResponse(HTTP.NOT_FOUND, {message: "id passado não corresponde a nenhuma tarefa."});
          callback(null, response);
        }
      });
    }
  };

  return TaskService;
};
