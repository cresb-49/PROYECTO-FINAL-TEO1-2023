const express = require('express');
const router = express.Router();

const usuariocontroller = require('../controllers/usuario');

router.post('/registro', usuariocontroller.registro);

router.post('/login', usuariocontroller.login);

router.put('/modificar', usuariocontroller.modificar);

router.put('/modificarPassword', usuariocontroller.modificarPassword);

router.get('/usuario', usuariocontroller.obtenerUsuario);

router.put('/agregarLogro', usuariocontroller.agregarLogro);

module.exports = router;