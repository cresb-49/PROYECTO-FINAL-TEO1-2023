const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const modeloPartidaSchema = new Schema(
    {
        codigo: String,
        juego: String,
        usuario: String,
        data: Object
    },
    {
        versionKey: false
    }
);

modeloPartidaSchema.index({ codigo: 1 }, { unique: true });

module.exports = model('modeloPartida', modeloPartidaSchema);