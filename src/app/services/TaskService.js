const HTTP = require('../utils/HTTP');
const Logger = require('../utils/Logger');
const Moment = require('moment');
const { TaskResponse } = require('../dto/TaskResponse');

module.exports = (app) => {

  const { Task } = app.models;

  const TaskService = {
    findAll(callback) {
      const query = Task.find({});
      query.exec((err, tasks) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar buscar os registros no banco de dados.'}), null);
        } else {
          callback(null, new TaskResponse(HTTP.OK, tasks));
        }
      });
    },
    find(id, callback) {
      Task.findById(id, (err, task) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar buscar o registro no banco de dados.'}), null);
        } else {
          callback(null, new TaskResponse(HTTP.OK, task));
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
          callback(null, new TaskResponse(HTTP.CREATED, task));
        }
      });
    },
    update(task, callback) {
      const id = String(task._id);
      Task.findByIdAndUpdate(id, task, {new: true}, (err, task) => {
        if (err) {
          Logger.error(err);
          callback(new TaskResponse(HTTP.INTERNAL_SERVER_ERROR,
            {message: 'Erro ao tentar ataulizar o registro no banco de dados.'}), null);
        } else {
          callback(null, new TaskResponse(HTTP.OK, task));
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
          callback(null, new TaskResponse(HTTP.OK, task));
        }
      });
    }
  };

  return TaskService;
};
