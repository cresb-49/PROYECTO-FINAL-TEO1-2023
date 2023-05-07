const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const resultadoPartidaSchema = new Schema(
    {
        codigo: String,
        juego: String,
        usuario: String,
        fecha: String,
        data: Object
    },
    {
        versionKey: false
    }
);
module.exports = model('resultadoPartida', resultadoPartidaSchema);