const { json } = require('body-parser');
const express = require('express');
const personasRoute = express.Router();

// Buscar personas
personasRoute.get('/api/personas', (req, res) => {
    const { Persona } = require('../models/Models');
    Persona.find()
    .then((data) => {
        if (data.length > 0) return res.status(200).json({personas: data})
        else return res.status(204).json();
    })
    .catch((e) => {
        console.log('ERROR: ', e);
    });
});

// Cargar
personasRoute.post('/api/personas', (req, res) => {
    const personaNueva = {
        nombre: req.body.nombre,
        fnacimiento: req.body.fnacimiento,
        email: req.body.email,
    }
    const { Persona } = require('../models/Models');
    Persona.findOne({ email: personaNueva.email })
    .then((personaOld) => {
        if (!personaOld) { // sólo inserto si no hay una persona con ese email
            const persona = new Persona(personaNueva);
            persona.save((err, usuario) => {
                if (err) console.log(err);
                if (usuario) return res.status(200).json({ message: 'Carga exitosa!', personaCargada: usuario })
                else return res.status(500).json({
                    error: err,
                });
            });
        } else {
            return res.status(500).json({ message: 'Ya hay un usuario con ese email' });
        }
    })
    .catch((e) => console.log(e));
});

// Modificar
personasRoute.put('/api/personas/:id', (req, res) => {
    const personaModificada = {
        nombre: req.body.nombre,
        fnacimiento: req.body.fnacimiento,
        email: req.body.email,
    }
    const { Persona } = require('../models/Models');
    Persona.findOne({ _id: req.params.id })
    .then((personaOld) => {
        if (personaOld) { // sólo updateo si hay una persona con ese id
            Persona.findOneAndUpdate({ _id: personaOld._id}, personaModificada, {
                returnOriginal: false,
            })
            .then((usuarioActualizado) => {
                if (usuarioActualizado) return res.status(200).json({ message: 'Modificación exitosa!', personaActualizada: usuarioActualizado })
            });
        } else {
            return res.status(500).json({ message: 'No existe un usuario relacionado' });
        }
    })
    .catch((e) => console.log(e));
});

// Borrar
personasRoute.delete('/api/personas/:id', (req, res) => {

    const { Persona } = require('../models/Models');
    Persona.findOne({ _id: req.params.id })
    .then((personaOld) => {
        if (personaOld) { // sólo borro si hay una persona con ese id
            Persona.findByIdAndRemove({ _id: personaOld._id})
            .then(() => {
                return res.status(200).json({ message: 'Usuario borrado con éxito!' })
            });
        } else {
            return res.status(500).json({ message: 'No existe un usuario relacionado' });
        }
    })
    .catch((e) => console.log(e));
});
module.exports = personasRoute;