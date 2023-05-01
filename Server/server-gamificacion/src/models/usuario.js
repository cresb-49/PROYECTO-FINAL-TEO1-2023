const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const usuarioSchema =new Schema({
    username:String,
    password:String,
    rol:String
})

usuarioSchema.index({username: 1}, {unique: true});

module.exports = model('usuario',usuarioSchema);