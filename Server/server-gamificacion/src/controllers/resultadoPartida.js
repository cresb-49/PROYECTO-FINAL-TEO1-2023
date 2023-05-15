const resultadoPartida = require('../models/resultadoPartida');

const registarPartida = async (req, res) => {
    try {
        const data = {
            codigo: req.body.codigo,
            juego: req.body.juego,
            usuario: req.body.usuario,
            fecha: req.body.fecha,
            data: req.body.data
        }
        const resultPartida = new resultadoPartida({
            codigo: data.codigo,
            juego: data.juego,
            usuario: data.usuario,
            fecha: data.fecha,
            data: data.data
        });
        const result = await resultPartida.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const obtenerPartida = async (req, res) => {
    try {
        const data = {
            usuario: req.query.usuario,
            codigo: req.query.codigo,
            juego: req.query.juego
        }
        const resultPartida = await resultadoPartida.findOne({ usuario: data.usuario, codigo: data.codigo, juego: data.juego });
        if (resultPartida) {
            res.status(200).json(resultPartida);
        } else {
            res.status(409).json(`No existe un juego para el codigo ${data.codigo} en el juego ${juego}`);
        }
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}


const obtenerPartidasPorJuego = async (req, res) => {
    try {
        const data = {
            usuario: req.query.username,
            juego: req.query.juego
        }
        const resultPartida = await resultadoPartida.find({ usuario: data.usuario, juego: data.juego }).sort("-fecha").limit(15);
        res.status(200).json(resultPartida);

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const estadisticasGenerales = async (req, res) => {
    try {
        const { username } = req.query;
        const partidasJugadas = await resultadoPartida.countDocuments({ usuario: username });
        const partidasJuego = await resultadoPartida.aggregate([
            {
                $match: {
                    usuario: username
                }
            },
            {
                $group: {
                    _id: "$juego",
                    partidas: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    partidas: -1
                }
            }
        ]);
        res.status(200).json({ generales: partidasJugadas, juegos: partidasJuego });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const estadisticasAhorcado = async (req, res) => {
    try {
        const { username } = req.query;
        const estadisticas = await resultadoPartida.aggregate([
            { $match: { usuario: username, juego: "J00002" } },
            { $unwind: "$data" },
            {
                $project: {
                    _id: 0,
                    palabrasEncontradas: "$data.palabrasEncontradas",
                    palabrasFalladas: "$data.palabrasFalladas",
                    punteo: "$data.punteo"
                }
            },
            {
                $group: {
                    _id: "$usuario",
                    palabrasEncontradas: { $sum: "$palabrasEncontradas" },
                    palabrasFalladas: { $sum: "$palabrasFalladas" },
                    punteo: { $sum: "$punteo" },
                }
            },
            { $sort: { palabrasEncontradas: -1 } },
            { $limit: 10 }
        ]);
        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const estadisticasHanoi = async (req, res) => {
    try {
        const { username } = req.query;
        const estadisticas = await resultadoPartida.aggregate([
            { $match: { usuario: username, juego: "J00001" } },
            { $unwind: "$data" },
            {
                $project: {
                    _id: 0,
                    movimientos: "$data.movimientos"
                }
            },
            {
                $group: {
                    _id: "$usuario",
                    movimientos: { $sum: "$movimientos" }
                }
            },
            { $sort: { palabrasEncontradas: -1 } },
            { $limit: 10 }
        ]);
        res.status(200).json(estadisticas);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

module.exports = {
    registarPartida: registarPartida,
    obtenerPartida: obtenerPartida,
    estadisticasGenerales: estadisticasGenerales,
    obtenerPartidasPorJuego: obtenerPartidasPorJuego,
    estadisticasAhorcado: estadisticasAhorcado, 
    estadisticasHanoi: estadisticasHanoi 
}