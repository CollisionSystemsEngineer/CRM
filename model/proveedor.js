let mongoose = require("mongoose")
let Schema = mongoose.Schema

let Proveedor = Schema({

empresa: String,
rfc: String,
registro: String,
localidad: String,
estado: Number,
tipo: String
})

module.exports = mongoose.model('proveedor',PacienteSchema)