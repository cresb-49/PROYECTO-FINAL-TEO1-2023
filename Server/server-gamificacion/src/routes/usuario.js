const express = require('express');
const router = express.Router();

const usuariocontroller = require('../controllers/usuario');

router.post('/registro', usuariocontroller.registro);

router.post('/login', usuariocontroller.login);

module.exports = router;