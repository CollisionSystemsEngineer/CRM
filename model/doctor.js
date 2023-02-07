let mongoose = require("mongoose")
let Schema = mongoose.Schema

let Doctor = Schema({

nombre: String,
email: String,
cedula: String,
especialidad: String,
pacientes: Number,
facturas: String,
tipo: String
})

module.exports = mongoose.model('doctor',DoctorSchema)