const express = require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentario');

router.post('/comentario',comentarioController.registarComentario);

router.get('/comentarios',comentarioController.obtenerComentarios);

router.put('/modificarUsuarioComentario',comentarioController.modificarUsername);

module.exports = router;