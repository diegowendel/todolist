const service = require('../service/TaskService');

module.exports = (app) => {
  const Tasks = app.models.task;

  const TaskController = {
    findAll(req, res) {
      service.findAll();
    },
    find(req, res) {
      service.find();
    },
    insert(req, res) {
      service.insert();
    },
    update(req, res) {
      service.update();
    },
    delete(req, res) {
      service.delete();
    }
  };

  return TaskController;
};
