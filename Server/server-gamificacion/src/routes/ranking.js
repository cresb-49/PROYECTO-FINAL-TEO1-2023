const express = require('express');
const router = express.Router();

const estadisticas = require('../controllers/ranking');

router.get('/estadisticas', estadisticas.estaditicas);

module.exports = router;