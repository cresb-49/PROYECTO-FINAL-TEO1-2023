const juego = require('../models/juego');

const getJuego = async (req, res) => {
    const codigo = req.query.codigo;
    try {
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
        const fillter = { codigo: req.body.codigo }
        const valorizacion = {
            usuario: req.body.usuario,
            like: req.body.like
        }
        const resultJuego = await juego.findOne(fillter);
        const foundLike = await resultJuego.like.find(like => like.usuario === valorizacion.usuario);
        if (foundLike) {
            foundLike.like = valorizacion.like;
            const result = await resultJuego.save()
            res.status(200).json(result);
        } else {
            resultJuego.like.push(valorizacion)
            const result = await resultJuego.save()
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const isLike = async (req, res) => {
    try {
        const fillterJuego = { codigo: req.query.codigo }
        const user = req.query.usuario
        const result = await juego.findOne(fillterJuego);
        if (result) {
            const foundLike = await result.like.find(like => like.usuario === user);
            if (foundLike) {
                res.status(200).json(foundLike);
            } else {
                res.status(409).json({ usuario: user, like: null });
            }
        } else {
            res.status(409).json({ error: `No existe like del usuario ${user}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const elimimarLike = async (req, res) => {
    const data = { usuario: req.body.usuario, codigo: req.body.codigo }
    try {
        const resultJuego = await juego.findOne({ codigo: data.codigo });
        if (resultJuego) {
            const newLike = await resultJuego.like.filter(like => like.usuario !== data.usuario);
            resultJuego.like = newLike;
            await resultJuego.save();
            const result = await juego.aggregate([
                {
                    $match: { codigo: data.codigo }
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
            res.status(200).json(result[0]);
        } else {
            res.status(409).json({ error: `No existe el juego ${data.codigo}` });
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

module.exports = {
    getJuego: getJuego,
    getJuegos: getJuegos,
    valorizarJuego: valorizarJuego,
    isLike, isLike,
    elimimarLike: elimimarLike
}