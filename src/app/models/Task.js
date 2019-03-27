const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = () => {
  const taskSchema = schema({
    nome: String,
    tipo: String,
    dataCriacao: { type: Date, default: Date.now },
    data: Date,
    status: String
  });

  return mongoose.model('Task', taskSchema);
};
