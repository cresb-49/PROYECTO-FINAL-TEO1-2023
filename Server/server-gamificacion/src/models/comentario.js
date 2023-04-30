const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const comentarioSchema = new Schema({
    usuario:String,
    juego:String,
    comentario:String,
    fecha:String
});

module.exports = model('comentario',comentarioSchema);