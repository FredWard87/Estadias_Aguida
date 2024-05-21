const Datos = require('../models/datosSchema');

const nuevoAuditoria = async (req, res) => {
  try {
    const {
      TipoAuditoria,
      Duracion,
      AreasAudi,
      Auditados,
      AuditorLider,
      EquipoAuditor,
      Observador,
      NombresObservadores,
      Programa
    } = req.body;

    // Crear una nueva Auditoria
    const nuevaAuditoria = new Datos({
      TipoAuditoria,
      Duracion,
      AreasAudi,
      Auditados,
      AuditorLider,
      EquipoAuditor,
      Observador,
      NombresObservadores,
      Programa
    });

    // Guardar los datos en la base de datos
    await nuevaAuditoria.save();

    res.status(201).json({ message: 'Auditoria generada exitosamente' });
  } catch (error) {
    console.error('Error al generar auditoria:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Error de validación', details: error.message });
    } else {
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
  }
};

module.exports = {
  nuevoAuditoria
};
