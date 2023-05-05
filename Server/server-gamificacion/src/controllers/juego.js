const juego = require('../models/juego');

const getJuego = async (req, res) => {
    const codigo = req.query.juego;
    try {
        const result = await obtenerJuego(codigo);
        if (result.length === 1) {
            res.status(200).json(result[0]);
        } else {
            res.status(409).json({ error: `No existe el juego ${codigo}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const getJuegos = async (req, res) => {
    try {
        const result = await juego.aggregate([
            {
                $project: {
                    _id: 1,
                    codigo: 1,
                    nombre: 1,
                    autores: 1,
                    like: 1,
                    likes: { $sum: { $map: { input: "$like", as: "v", in: { $cond: [{ $eq: ["$$v.like", true] }, 1, 0] } } } },
                    dislikes: { $subtract: [{ $size: "$like" }, { $sum: { $map: { input: "$like", as: "v", in: { $cond: [{ $eq: ["$$v.like", true] }, 1, 0] } } } }] }
                }
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const valorizarJuego = async (req, res) => {
    try {
        const fillter = { codigo: req.body.juego }
        const valorizacion = {
            usuario: req.body.usuario,
            like: req.body.like
        }
        const resultJuego = await juego.findOne(fillter);
        if (resultJuego) {
            const foundLike = await resultJuego.like.find(like => like.usuario === valorizacion.usuario);
            if (foundLike) {
                foundLike.like = valorizacion.like;
                await resultJuego.save();
                const result = await obtenerJuego(fillter.codigo);
                res.status(200).json(result[0]);
            } else {
                resultJuego.like.push(valorizacion)
                await resultJuego.save();
                const result = await obtenerJuego(fillter.codigo);
                res.status(200).json(result[0]);
            }
        } else {
            res.status(409).json({ error: `No existe un juego ${fillter.codigo}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const isLike = async (req, res) => {
    try {
        const fillterJuego = { codigo: req.query.juego }
        const user = req.query.usuario
        const result = await juego.findOne(fillterJuego);
        if (result) {
            const foundLike = await result.like.find(like => like.usuario === user);
            if (foundLike) {
                res.status(200).json(foundLike);
            } else {
                res.status(200).json({ usuario: user, like: null });
            }
        } else {
            res.status(409).json({ error: `No existe el juego ${fillterJuego.codigo}` });
        }
    } catch (error) {
    console.log(error)
        res.status(409).json({ error: error.message });
    }
}

const elimimarLike = async (req, res) => {
    const data = { usuario: req.body.usuario, codigo: req.body.juego }
    try {
        const resultJuego = await juego.findOne({ codigo: data.codigo });
        if (resultJuego) {
            const newLike = await resultJuego.like.filter(like => like.usuario !== data.usuario);
            resultJuego.like = newLike;
            await resultJuego.save();
            const result = await obtenerJuego(data.codigo);
            res.status(200).json(result[0]);
        } else {
            res.status(409).json({ error: `No existe el juego ${data.codigo}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const obtenerJuego = async (codigo) => {
    const result = await juego.aggregate([
        {
            $match: { codigo: codigo }
        },
        {
            $project: {
                _id: 1,
                codigo: 1,
                nombre: 1,
                autores: 1,
                like: 1,
                likes: { $sum: { $map: { input: "$like", as: "v", in: { $cond: [{ $eq: ["$$v.like", true] }, 1, 0] } } } },
                dislikes: { $subtract: [{ $size: "$like" }, { $sum: { $map: { input: "$like", as: "v", in: { $cond: [{ $eq: ["$$v.like", true] }, 1, 0] } } } }] }
            }
        }
    ]);
    return result;
}

module.exports = {
    getJuego: getJuego,
    getJuegos: getJuegos,
    valorizarJuego: valorizarJuego,
    isLike: isLike,
    elimimarLike: elimimarLike
}
