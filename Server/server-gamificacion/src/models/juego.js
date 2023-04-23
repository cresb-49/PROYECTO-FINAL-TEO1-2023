const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const juegoSchema = new Schema({
    nombre:String,
    autores:String,
    partidas:Array
});

module.exports = model('juego',juegoSchema);