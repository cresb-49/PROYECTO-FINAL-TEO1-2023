const usuario = require('../models/usuario');
const encrypt = require('../helpers/encrypt');
const moment = require('moment/moment');

const registro = async (req, res) => {
    const insert = new usuario({
        username: req.body.username,
        password: await encrypt.encrypt(req.body.password),
        perfil: "../../assets/imageNotFound.webp",
        rol: req.body.rol,
        data: {
            logros: [
                {
                    id: "L00001",
                    nombre: "Crea tu cuenta",
                    fecha: moment().format("YYYY-MM-DD")
                }
            ]
        }
    });
    try {
        await insert.save();
        res.status(200).json({ mensaje: 'Se registró con éxito el usuario' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const login = async (req, res) => {
    const filler1 = { username: req.body.username };
    try {
        const result = await usuario.findOne(filler1);
        if (result == undefined) {
            res.status(409).json({ error: `No existe el usuario "${filler1.username}"` });
        } else {
            const isCorrect = await encrypt.compare(req.body.password, result.password);
            if (isCorrect) {
                res.status(200).json({ mensaje: 'Sesión iniciada', usuario: result });
            } else {
                res.status(409).json({ error: `Password incorrecta` });
            }
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const modificar = async (req, res) => {
    const { nuevoUsername, usernameActual, perfil } = req.body;

    try {
        const result = await usuario.updateOne(
            { username: usernameActual },
            { $set: { username: nuevoUsername, perfil: perfil } }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const modificarPassword = async (req, res) => {
    const filler1 = { username: req.body.username };
    try {
        const result = await usuario.findOne(filler1);
        if (result == undefined) {
            res.status(409).json({ error: `No existe el usuario "${filler1.username}"` });
        } else {
            const isCorrect = await encrypt.compare(req.body.passwordActual, result.password);
            if (isCorrect) {
                const update = await usuario.updateOne(filler1, {
                    $set: { password: await encrypt.encrypt(req.body.nuevaPassword) }
                });
                res.status(200).json(update);
            } else {
                res.status(409).json({ error: `Password incorrecta` });
            }
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

//Agregar a API
const obtenerUsuario = async (req, res) => {
    const filler1 = { username: req.query.username };
    try {
        console.log(filler1);
        const result = await usuario.findOne(filler1);
        if (result == undefined) {
            res.status(409).json({ error: `No existe el usuario "${filler1.username}"` });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

module.exports = {
    registro: registro,
    login: login,
    modificar: modificar,
    modificarPassword: modificarPassword,
    obtenerUsuario
}