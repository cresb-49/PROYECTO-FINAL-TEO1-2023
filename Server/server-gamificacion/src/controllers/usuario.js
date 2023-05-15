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


const getProfilePic = async (req, res) => {
    const filler = { username: req.query.username };
    try {
        const result = await usuario.findOne(filler);
        res.setHeader('Content-Type', 'application/octet-stream');
        if (result) {
            res.send(Buffer.from(result.perfil.split(',')[1], 'base64'));
        } else {
            res.send(Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAgMAAACJFjxpAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURbOzs////9ra2tYEXekAAATcSURBVHja7Z09bttAFIRFAizonkdgkVvwCCq8hOCKZZBT8BLs0wgIcsokCPLjxCbfSpz9LHnmAvth9s17K4paHQ6WZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWZVmWdbGWlL6iAOm7xhkGQAkSTfATID3RAOkjmIKfmmmAEQLofgGkiQaAktD/BkgnGoCpwybBFvwNgFjwDICwoE2wBc8BTjRAwgEmtgiJibA8B0hD4fXP/6xfugzb9J+KJrH+f/2yZdi/ADCyG1B2D5YXAU6wAQX34GUDyrWCh1fWL7YH/WsAiesBRVtB+zrACS3BUjlY2YEyOWjWAI7sDhTZg9UdKDEP2nUAfRC7dQB9ENfX1xdBtQEgL4JmC+DIloC+CLbWVxfBZgmoi6DZBtB2gn4bQFuFyzbAI1uD4nNZFQFQVmEbARjYGtRWYRcBOLEhkMagjqyvbMahEChj0MYAdDFoYgATm0JlDrsYwIlNoRIgtr6uEdRBgJEGSHAf0nWilgZoogADDTCxjfANABzZTqxrhTjAkuBejAOkmwEY7xQgPAxV49AAVRxgph2Y79OBWwIYDGAAAxjAAJ4FdsAHEgMYwAAGMIABDOBnRO/+MZ0dMIAB7hTgYAADvPsU9DRAgsdxmwFwgndAY8GSAzChGdDsQZUFMLI1KAlikwcwsyFQPKztaIAlD2C6P4B0YwBHO/DuHTDAcH8Ay40B7D+OuxsDgE/lijMhDpB3JhS8V5t3KsY/F+AAgvfra3gWZQ6DQQCwsI0wsxUqAHq2D+V1Isn7/fgzopptA3k5HCQACxuCrBzSj2pFP/Fo2RTmzEPRb81qdBZm5XAQAXRsCjNiIFo/PI5kP3yuyFGUEwPdr+/hFIbH0SwD6NkQRGMgvIWjZVMYzaHyJhY4BMEYDEKAjk1hMIfC9UMxkN5JVcEhCI0j7bVgcApDMRikAD0bgsg4Et/O17IpjMQAvyBRfUXkwoYgkMP5AMdAvP5mDPCLUvGrYvUXFi/kKArEYJAD9GwItmJQ4MroihxF2+MIv7V7KgDQsSHYmAYF1l+NAX53fZnb++EQrMZgKgLQc8ehrSos9D8iFdmI16vwWAhgYWtwpQrnQgAdW4Ovb8EjDVCqBg/kLF6dRqUMqOgSqOgQtPQWNHQR9m+2E5fqAx09jRf4PHKgT2Q1+7loFeCINsJiVdjCn8xWP5zOaBso1QsX+sMp/Iho4yEV/YCkRBF08LPqA/y0fvNxvbwTbH1zOZFdoEQQt7+4nNkdUO9B4P2BR9gA7R6E3uc7wQakcWYNeAN/Z8T/lQ3+FxaiIHyIv93/hG7AD31EN+CHPlMJkDWDzDs4dieoU0IJ6iVdoB3r4Jwu0heoAP/oU/EOJOlID+kK7VCKV62/A8FlAdiP4Or1ryU4p+s1wutfc0D5kPbRBK9/6RHpYbf1LyuDOu2oSzZh2RNgLDiBdjoltmlnzWABXNIMzrsD5FnQ7r9+1rcZtWD9rCD0CoCMXiAxIMeCswYgXIataP1wEnsVwIhWQLwMGx1AbA86HUDsGx3h+iNcAsHnyAmugZoGsAN2wA7YATtgB+yAHbADdsAO2AE7YAfsgB2wA3bADtgBO2AH7IAdsAO4A5ZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWZZlWdZ70zfEOlBzdVBO/QAAAABJRU5ErkJggg==", 'base64'));
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const obtenerUsuario = async (req, res) => {
    const filler1 = { username: req.query.username };
    try {
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

const agregarLogro = async (req, res) => {
    const { username, logro } = req.body
    try {
        const actualizacion = await usuario.updateOne({ username }, {
            $push: { "data.logros": logro }
        })
        res.status(200).json(actualizacion);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }

}

module.exports = {
    registro: registro,
    login: login,
    modificar: modificar,
    modificarPassword: modificarPassword,
    getProfilePic: getProfilePic,
    obtenerUsuario: obtenerUsuario,
    agregarLogro: agregarLogro
}