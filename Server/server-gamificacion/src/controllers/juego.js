const juego = require('../models/juego');

const getJuego = async (req, res) => {
    const fillter = { nombre: req.query.nombre }
    try {
        const result = await juego.findOne(fillter);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const getJuegos = async (req, res) => {
    try {
        const result = await juego.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

module.exports = {
    getJuego: getJuego,
    getJuegos: getJuegos
}