module.exports = (app) => {
  const {Task} = app.controllers;
  app.get('/tarefa', Task.findAll);
  app.get('/tarefa/:id', Task.find);
  app.post('/tarefa', Task.insert);
  app.put('/tarefa', Task.update);
  app.delete('/tarefa/:id', Task.delete);
};
