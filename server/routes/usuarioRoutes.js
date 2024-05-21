const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarioController');

// Ruta para el registro de usuarios
router.post('/', usuariosController.registroUsuario);
router.get('/', usuariosController.obtenerUsuarios);

module.exports = router;
