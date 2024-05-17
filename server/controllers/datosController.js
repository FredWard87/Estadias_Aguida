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
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
    nuevoAuditoria
};


