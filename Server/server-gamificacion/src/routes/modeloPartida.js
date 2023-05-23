const express = require('express');
const router = express.Router();

const modeloPartidaController = require('../controllers/modeloPartida');

router.post('/modelo', modeloPartidaController.registroModelo);

router.get('/modelo', modeloPartidaController.obtenerModelo);

router.get('/modelosUsuario', modeloPartidaController.obtenerModelosPorUsuario);

router.get('/modeloPorCodigo', modeloPartidaController.obtenerModeloPorCodigo);

router.delete('/modelo', modeloPartidaController.borrarModelo);

module.exports = router;