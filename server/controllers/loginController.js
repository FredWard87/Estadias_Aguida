// loginController.js
const Usuarios = require('../models/usuarioSchema');

const iniciarSesion = async (req, res) => {
  const { Correo, Contraseña } = req.body;

  try {
    // Buscar el usuario por correo electrónico
    const usuario = await Usuarios.findOne({ Correo });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!usuario || usuario.Contraseña !== Contraseña) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar si el usuario es administrador
    if (usuario.TipoUsuario !== 'Administrador') {
      return res.status(403).json({ error: 'No tienes permisos de administrador' });
    }

    // Si todo está bien, el usuario es un administrador válido
    res.status(200).json({ message: 'Inicio de sesión exitoso como administrador' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  iniciarSesion
};
