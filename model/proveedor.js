let mongoose = require("mongoose")
let Schema = mongoose.Schema

let ProveedorSchema = Schema({

empresa: String,
rfc: String,
registro: String,
localidad: String,
estado: Number,
tipo: String,
usuario: String
})

module.exports = mongoose.model('proveedor',ProveedorSchema)