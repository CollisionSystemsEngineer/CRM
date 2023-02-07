let mongoose = require("mongoose")
let Schema = mongoose.Schema

let DoctorSchema = Schema({

nombre: String,
email: String,
cedula: String,
especialidad: String,
pacientes: Number,
facturas: String,
tipo: String,
usuario: String
})

module.exports = mongoose.model('doctor',DoctorSchema)