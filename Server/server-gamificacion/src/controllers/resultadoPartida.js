const resultadoPartida = require('../models/resultadoPartida');

const registarPartida = async (req, res) => {
    try {
        const data = {
            codigo: req.body.codigo,
            juego: req.body.juego,
            usuario: req.body.usuario,
            data: req.body.data
        }
        const resultPartida = new resultadoPartida({
            codigo: data.codigo,
            juego: data.juego,
            usuario: data.usuario,
            data: data.data
        });
        const result = await resultPartida.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}
const obtenerPartida = async (req, res) => {
    try {
        const data = {
            usuario: req.query.usuario,
            codigo: req.query.codigo,
            juego: req.query.juego
        }
        const resultPartida = await resultadoPartida.find({ usuario: data.usuario, codigo: data.codigo, juego: data.juego });
        if (resultPartida) {
            res.status(200).json(resultPartida);
        } else {
            res.status(409).json(`No existe un juego para el codigo ${data.codigo} en el juego ${juego}`);
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

module.exports = {
    registarPartida: registarPartida,
    obtenerPartida: obtenerPartida
}