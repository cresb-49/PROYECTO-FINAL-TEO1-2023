const express = require('express');
const router = express.Router();

const resultadoPartidaController = require('../controllers/resultadoPartida');

router.post('/partida', resultadoPartidaController.registarPartida);

router.get('/partida', resultadoPartidaController.obtenerPartida);

router.get('/partidasPorJuego', resultadoPartidaController.obtenerPartidasPorJuego);

router.get('/estadisticasGenerales', resultadoPartidaController.estadisticasGenerales);

router.get('/estadisticasAhorcado', resultadoPartidaController.estadisticasAhorcado);

router.get('/estadisticasHanoi', resultadoPartidaController.estadisticasHanoi);

module.exports = router;