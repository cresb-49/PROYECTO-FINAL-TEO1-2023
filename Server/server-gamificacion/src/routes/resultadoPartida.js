const express = require('express');
const router = express.Router();

const resultadoPartidaController = require('../controllers/resultadoPartida');

router.post('/partida', resultadoPartidaController.registarPartida);

router.get('/partida', resultadoPartidaController.obtenerPartida);

module.exports = router;