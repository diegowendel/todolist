const promise = require('bluebird');

module.exports = (app) => {

  const service = app.services.TaskService;
  promise.promisifyAll(service);

  const TaskController = {
    findById(req, res) {
      const id = String(req.params.id);
      service.findByIdAsync(id).then(response => res.status(response.status).json(response.json));
    },
    find(req, res) {
      const params = req.query;
      service.findAsync(params).then(response => res.status(response.status).json(response.json));
    },
    insert(req, res) {
      const newTask = req.body;
      service.insertAsync(newTask).then(response => res.status(response.status).json(response.json));
    },
    update(req, res) {
      const newTask = req.body;
      service.updateAsync(newTask).then(response => res.status(response.status).json(response.json));
    },
    delete(req, res) {
      const id = String(req.params.id);
      service.removeAsync(id).then(response => res.status(response.status).json(response.json));
    }
  };

  return TaskController;
};
