const express = require('express');
const router = express.Router();

const modeloPartidaController = require('../controllers/modeloPartida');

router.post('/modelo', modeloPartidaController.registroModelo);

router.get('/modelo', modeloPartidaController.obtenerModelo);

module.exports = router;