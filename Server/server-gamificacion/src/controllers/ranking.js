
const resultadoPartida = require('../models/resultadoPartida');

const estaditicas = async (req, res) => {
    const { juego } = req.query;
    try {
        const result = await calcularJuego(juego);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

async function calcularJuego(juego) {
    if (juego === "J00001") {
        //Torres de Hanoi
        const result = await resultadoPartida.aggregate([
            { $match: { juego: juego } },
            { $unwind: "$data" },
            {
                $project: {
                    _id: 0,
                    usuario: 1,
                    jugado: { $ifNull: ["$jugado", 1] },
                    movimientos: "$data.movimientos",
                    movimientosEsperados: "$data.movimientosEsperados",
                    tiempo: { $split: ["$data.tiempo", ":"] }
                }
            },
            {
                $project: {
                    _id: 0,
                    usuario: 1,
                    jugado: "$jugado",
                    movimientos: "$movimientos",
                    movimientosEsperados: "$movimientosEsperados",
                    horas: {
                        $multiply:
                            [
                                {
                                    $convert: { input: { $arrayElemAt: ["$tiempo", 0] }, to: "int", onError: 0, onNull: 0 }
                                },
                                3600
                            ]
                    },
                    minutos: {
                        $multiply:
                            [
                                {
                                    $convert: { input: { $arrayElemAt: ["$tiempo", 1] }, to: "int", onError: 0, onNull: 0 }
                                },
                                60
                            ]
                    },
                    segundos: {
                        $convert: { input: { $arrayElemAt: ["$tiempo", 2] }, to: "int", onError: 0, onNull: 0 }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    usuario: 1,
                    jugado: "$jugado",
                    movimientosDeMas: { $abs: { $subtract: ["$movimientos", "$movimientosEsperados"] } },
                    tiempo: { $sum: ['$horas', '$minutos', '$segundos'] }
                }
            },
            {
                $group: {
                    _id: "$usuario",
                    jugado: { $sum: "$jugado" },
                    movimientosDeMas: { $sum: "$movimientosDeMas" },
                    tiempo: { $sum: "$tiempo" }
                }
            },
            {
                $sort: {
                    jugado: -1,
                    movimientosDeMas: 1,
                    tiempo: 1
                }
            }
        ]);

        return result;
    } else if (juego === "J00002") {
        //Ahorcado
        const result = await resultadoPartida.aggregate([
            { $match: { juego: juego } },
            { $unwind: "$data" },
            {
                $project: {
                    _id: 0,
                    usuario: 1,
                    jugado: { $ifNull: ["$jugado", 1] },
                    palabrasEncontradas: "$data.palabrasEncontradas",
                    palabrasFalladas: "$data.palabrasFalladas",
                    punteo: "$data.punteo"
                }
            },
            {
                $group: {
                    _id: "$usuario",
                    jugado: { $sum: "$jugado" },
                    palabrasEncontradas: { $sum: "$palabrasEncontradas" },
                    palabrasFalladas: { $sum: "$palabrasFalladas" },
                    punteo: { $sum: "$punteo" }
                }
            },
            {
                $sort: {
                    punteo: -1,
                    jugado: 1,
                    palabrasEncontradas: -1,
                    palabrasFalladas: 1
                }
            }
        ]);

        return result;
    } else if (juego === "J00003") {
        //Crusigrama
        const result = await resultadoPartida.aggregate([
            { $match: { juego: juego } },
            { $unwind: "$data" },
            {
                $project: {
                    _id: 0,
                    usuario: 1,
                    jugado: { $ifNull: ["$jugado", 1] },
                    tiempo: { $split: ["$data.tiempo", ":"] }
                }
            },
            {
                $project: {
                    _id: 0,
                    usuario: 1,
                    jugado: "$jugado",
                    horas: {
                        $multiply:
                            [
                                {
                                    $convert: { input: { $arrayElemAt: ["$tiempo", 0] }, to: "int", onError: 0, onNull: 0 }
                                },
                                3600
                            ]
                    },
                    minutos: {
                        $multiply:
                            [
                                {
                                    $convert: { input: { $arrayElemAt: ["$tiempo", 1] }, to: "int", onError: 0, onNull: 0 }
                                },
                                60
                            ]
                    },
                    segundos: {
                        $convert: { input: { $arrayElemAt: ["$tiempo", 2] }, to: "int", onError: 0, onNull: 0 }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    usuario: 1,
                    jugado: "$jugado",
                    tiempo: { $sum: ['$horas', '$minutos', '$segundos'] }
                }
            },
            {
                $group: {
                    _id: "$usuario",
                    jugado: { $sum: "$jugado" },
                    tiempo: { $sum: "$tiempo" }
                }
            },
            {
                $sort: {
                    jugado: -1,
                    tiempo: 1
                }
            }
        ]);

        return result;
    } else if (juego === "J00004") {
        //Sopa de Letras
        const result = await resultadoPartida.aggregate([
            { $match: { juego: juego } },
            { $unwind: "$data" },
            {
                $project: {
                    _id: 0,
                    usuario: 1,
                    jugado: { $ifNull: ["$jugado", 1] },
                    tiempo: { $split: ["$data.tiempo", ":"] }
                }
            },
            {
                $project: {
                    _id: 0,
                    usuario: 1,
                    jugado: "$jugado",
                    horas: {
                        $multiply:
                            [
                                {
                                    $convert: { input: { $arrayElemAt: ["$tiempo", 0] }, to: "int", onError: 0, onNull: 0 }
                                },
                                3600
                            ]
                    },
                    minutos: {
                        $multiply:
                            [
                                {
                                    $convert: { input: { $arrayElemAt: ["$tiempo", 1] }, to: "int", onError: 0, onNull: 0 }
                                },
                                60
                            ]
                    },
                    segundos: {
                        $convert: { input: { $arrayElemAt: ["$tiempo", 2] }, to: "int", onError: 0, onNull: 0 }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    usuario: 1,
                    jugado: "$jugado",
                    tiempo: { $sum: ['$horas', '$minutos', '$segundos'] }
                }
            },
            {
                $group: {
                    _id: "$usuario",
                    jugado: { $sum: "$jugado" },
                    tiempo: { $sum: "$tiempo" }
                }
            },
            {
                $sort: {
                    jugado: -1,
                    tiempo: 1
                }
            }
        ]);

        return result;
    }
    throw new Error('Codigo de juego erroneo')
}

module.exports = {
    estaditicas: estaditicas
}