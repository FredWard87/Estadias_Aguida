const express = require('express');
const router = express.Router();
const areasController = require('../controllers/programasController');

router.get('/', areasController.obtenerProgramas);

module.exports = router;