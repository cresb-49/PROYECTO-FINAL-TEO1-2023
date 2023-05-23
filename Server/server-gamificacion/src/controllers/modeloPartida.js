const { generarCodigoJuegos } = require('../helpers/funciones');
const modeloPartida = require('../models/modeloPartida');

const registroModelo = async (req, res) => {
    try {
        const data = {
            juego: req.body.juego,
            usuario: req.body.usuario,
            data: req.body.data
        }
        let partida;
        let nuevoCodigo = "";
        do {
            nuevoCodigo = generarCodigoJuegos();
            partida = await modeloPartida.findOne({ "codigo": nuevoCodigo });
        } while (partida != undefined);

        const modelo = new modeloPartida({
            codigo: nuevoCodigo,
            juego: data.juego,
            usuario: data.usuario,
            data: data.data
        });
        const result = await modelo.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const obtenerModelo = async (req, res) => {
    try {
        const codigo = req.query.codigo;
        const juego = req.query.juego;
        const result = await modeloPartida.findOne({ codigo: codigo, juego: juego });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(409).json({ error: `No existe una partida personalizada con el codigo ${codigo}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const obtenerModelosPorUsuario = async (req, res) => {
    try {
        const { usuario } = req.query;
        const result = await modeloPartida.find({ usuario: usuario });
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const obtenerModeloPorCodigo = async (req, res) => {
    try {
        const { codigo } = req.query;
        const result = await modeloPartida.findOne({ codigo: codigo });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(409).json({ error: `No existe una partida personalizada con el codigo ${codigo}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const borrarModelo = async (req, res) => {
    try {
        const { codigo } = req.query;
        const result = await modeloPartida.deleteOne({ codigo: codigo });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(409).json({ error: `No existe una partida personalizada con el codigo ${codigo}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}



module.exports = {
    registroModelo: registroModelo,
    obtenerModelo: obtenerModelo,
    obtenerModelosPorUsuario: obtenerModelosPorUsuario,
    obtenerModeloPorCodigo: obtenerModeloPorCodigo,
    borrarModelo: borrarModelo
}