const Programas = require('../models/programasSchema');

const obtenerProgramas = async (req, res) => {
  try {
    const programas = await Programas.find();
    res.status(200).json(programas);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  obtenerProgramas
};