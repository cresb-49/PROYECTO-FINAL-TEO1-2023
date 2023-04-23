const express = require('express');
const router = express.Router();

const juegoController = require('../controllers/juego');

router.get('/juego',juegoController.getJuego);

router.get('/juegos',juegoController.getJuegos);

module.exports = router;