const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = () => {
  const taskSchema = schema({
    nome: String,
    tipo: String,
    periodo: Date,
    status: String
  });

  return mongoose.model('Task', taskSchema, 'tasks');
};
