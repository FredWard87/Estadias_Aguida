const mongoose = require('mongoose');

const programasSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Descripcion: { type: [String], required: true } // Cambiado a String
});

const Programas = mongoose.model('Programas', programasSchema);

module.exports = Programas;
