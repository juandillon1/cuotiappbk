const mongoose = require("mongoose");

const PersonaSchema = new mongoose.Schema({
    nombre: String,
    fnacimiento: Date,
    email: String,
});

const BancoSchema = new mongoose.Schema({
    nombre: String,
    img: String,
});

const PrestamoSchema = new mongoose.Schema({
    nombre: String,
    img: String,
});

const CuotasSchema = new mongoose.Schema({
    importe: Number,
    cantidad: Number,
    descripcion: String,
    _bancos: { type: mongoose.Schema.Types.ObjectId, ref: 'bancos' },
    _prestamos: { type: mongoose.Schema.Types.ObjectId, ref: 'prestamos' },
    _personas: { type: mongoose.Schema.Types.ObjectId, ref: 'personas' }
});


const Persona = mongoose.model('Personas', PersonaSchema, 'personas');
const Banco = mongoose.model('Bancos', BancoSchema, 'bancos');
const Prestamo = mongoose.model('Prestamos', PrestamoSchema, 'prestamos');
const Cuota = mongoose.model('Cuotas', CuotasSchema, 'cuotas');


module.exports = {
    Persona,
    Banco,
    Prestamo,
    Cuota,
}