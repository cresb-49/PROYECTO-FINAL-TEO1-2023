const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const usuarioSchema =new Schema({
    username:String,
    password:String,
    rol:String
})

module.exports = model('usuario',usuarioSchema);