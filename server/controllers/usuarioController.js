const Usuarios = require('../models/usuarioSchema');

const registroUsuario = async (req, res) => {
  try {
    const {
      Nombre,
      Correo,
      Contraseña,
      Puesto,
      FechaIngreso,
      Escolaridad,
      TipoUsuario
    } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuarios.findOne({ Correo });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuarios({
      Nombre,
      Correo,
      Contraseña,
      Puesto,
      FechaIngreso,
      Escolaridad,
      TipoUsuario
    });

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  registroUsuario
};
