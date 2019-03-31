module.exports = (app) => {
  const { Task } = app.controllers;
  app.get('/tarefa', Task.find);
  app.get('/tarefa/:id', Task.findById);
  app.post('/tarefa', Task.insert);
  app.put('/tarefa', Task.update);
  app.delete('/tarefa/:id', Task.delete);
};
