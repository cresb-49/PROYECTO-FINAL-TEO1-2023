const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const like = new Schema({
    usuario: String,
    like: Boolean
}, {
    versionKey: false,
    _id: false
});

const juegoSchema = new Schema({
    codigo: {
        type: String,
        unique: true
    },
    nombre: String,
    autores: String,
    imagen: String,
    descripcion: String,
    like: {
        type: [like],
        default: []
    }
}, {
    versionKey: false
});

module.exports = model('juego', juegoSchema);