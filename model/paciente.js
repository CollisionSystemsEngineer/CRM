let mongoose = require("mongoose")
let Schema = mongoose.Schema

let PacienteSchema = Schema({

nombre: String,
apellido: String,
email: String,
sexo: String,
edad: Number,
foto: String,
tipo: String
})

module.exports = mongoose.model('paciente',PacienteSchema)