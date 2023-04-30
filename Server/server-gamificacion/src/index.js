//Configuraciones del entorno del servidor
const PORT = 5000;
const DATABASE = 'gamificacion'

//Imports
const express = require('express')
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//Configuracion de CORS
const corsOptions = {
    origin: 'http://localhost:8080', //TODO: puerto del forntend
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors(corsOptions));


async function start() {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/' + DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log('Conectado a la base de datos: ', db.connection.name)
    } catch (error) {
        console.log(error);
    }
}

//Rutas de la api
app.use('/api',require('./routes/usuario'));
app.use('/api',require('./routes/juego'));
app.use('/api',require('./routes/comentario'));

//Inicio de la conexion con la base de datos
start()

//Inicio dels servidor con el puerto configurado
app.listen(PORT)
console.log("Listening to port: ",PORT)
