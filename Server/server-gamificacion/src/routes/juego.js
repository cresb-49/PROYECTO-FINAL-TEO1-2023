const express = require('express');
const router = express.Router();

const juegoController = require('../controllers/juego');

router.get('/juego', juegoController.getJuego);

router.get('/juegos', juegoController.getJuegos);

router.post('/juego/like', juegoController.valorizarJuego);

router.get('/juego/like', juegoController.isLike);

router.delete('/juego/like', juegoController.elimimarLike);

router.get('/juego/imagen', juegoController.obtenerImagenJuego);

router.put('/modificarUsuarioLike', juegoController.modificarUsuarioLike);

module.exports = router;