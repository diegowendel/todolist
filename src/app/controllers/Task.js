const util = require('util');

module.exports = (app) => {

  const service = app.services.TaskService;

  const TaskController = {
    findAll(req, res) {
      const findAllAsync = util.promisify(service.findAll);
      findAllAsync()
        .then(response => res.status(response.status).json(response.json))
        .catch(response => res.status(response.status).json(response.json));
    },
    find(req, res) {
      const id = String(req.params.id);
      const findAsync = util.promisify(service.find);
      findAsync(id)
        .then(response => res.status(response.status).json(response.json))
        .catch(response => res.status(response.status).json(response.json));
    },
    insert(req, res) {
      const newTask = req.body;
      const insertAsync = util.promisify(service.insert);
      insertAsync(newTask)
        .then(response => res.status(response.status).json(response.json))
        .catch(response => res.status(response.status).json(response.json));
    },
    update(req, res) {
      const newTask = req.body;
      const updateAsync = util.promisify(service.update);
      updateAsync(newTask)
        .then(response => res.status(response.status).json(response.json))
        .catch(response => res.status(response.status).json(response.json));
    },
    delete(req, res) {
      const id = String(req.params.id);
      const deleteAsync = util.promisify(service.remove);
      deleteAsync(id)
        .then(response => res.status(response.status).json(response.json))
        .catch(response => res.status(response.status).json(response.json));
    }
  };

  return TaskController;
};
