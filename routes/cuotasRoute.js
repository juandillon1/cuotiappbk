const express = require('express');
const cuotasRoute = express.Router();
const { Cuota, Banco, Persona, Prestamo } = require('../models/Models');

// Buscar

// CuotasxBancoxPersona
cuotasRoute.get('/api/cuota/bancos/:idBanco/:idPersona', (req, res) => {
    const banco = req.params.idBanco;
    const persona = req.params.idPersona;
    Cuota.find({ _bancos: banco, _personas: persona })
    .populate({path: '_bancos', model: Banco})
    .populate({path: '_personas', model: Persona})
    .then(async (data) => {
        if (data.length > 0) return res.status(200).json({data})
        else return res.status(204).json();
    })
    .catch((e) => {
        console.log('ERROR: ', e);
    });
});

// CuotasxPrestamoxPersona
cuotasRoute.get('/api/cuota/prestamos/:idPrestamo/:idPersona', (req, res) => {
    const prestamo = req.params.idPrestamo;
    const persona = req.params.idPersona;
    Cuota.find({ _prestamos: prestamo, _personas: persona })
    .populate({path: '_prestamos', model: Prestamo})
    .populate({path: '_personas', model: Persona})
    .then(async (data) => {
        if (data.length > 0) return res.status(200).json({data})
        else return res.status(204).json();
    })
    .catch((e) => {
        console.log('ERROR: ', e);
    });
});

// CuotasxPersona
cuotasRoute.get('/api/cuota/personas/:idPersona', (req, res) => {
    const persona = req.params.idPersona;
    Cuota.find({ _personas: persona })
    .populate({path: '_bancos', model: Banco})
    .populate({path: '_personas', model: Persona})
    .populate({path: '_prestamos', model: Prestamo})
    .then(async (data) => {
        if (data.length > 0) return res.status(200).json({data})
        else return res.status(204).json();
    })
    .catch((e) => {
        console.log('ERROR: ', e);
    });
});


module.exports = cuotasRoute;