const comentario = require("../models/comentario");

const moment = require("moment");

const registarComentario = async (req, res) => {
  const coment = new comentario({
    usuario: req.body.usuario,
    juego: req.body.juego,
    comentario: req.body.comentario,
    fecha: moment().format("YYYY-MM-DD"),
  });
  try {
    const result = await coment.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const obtenerComentarios = async (req, res) => {
  const filler = { juego: req.query.juego };
  try {
    const result = await comentario.find(filler);
    res.status(200).json(result);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

module.exports = {
  registarComentario: registarComentario,
  obtenerComentarios: obtenerComentarios,
};
