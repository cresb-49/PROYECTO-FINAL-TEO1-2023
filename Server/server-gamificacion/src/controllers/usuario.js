const usuario = require('../models/usuario');
const encrypt = require('../helpers/encrypt');

const registro = async (req, res) => {
    const insert = new usuario({
        username: req.body.username,
        password: await encrypt.encrypt(req.body.password),
        perfil: "../../assets/imageNotFound.webp",
        rol: req.body.rol
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

module.exports = {
    registro: registro,
    login:login
}