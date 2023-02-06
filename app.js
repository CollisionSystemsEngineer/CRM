let express = require("express")

let app = express()


app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(express.static("css/adminStyle" + '/public'));

let NombreAtributos = [{title:"Doctores"},{title:"Pacientes"},{title:"Proveedores"}];

let AtributosDoctores = [{atributo:"Nombre"}, 
                         {atributo:"Email"},
                         {atributo:"Cédula"}, 
                         {atributo:"Especialidad"}, 
                         {atributo:"Cantidad pacientes"}, 
                         {atributo:"Facturas mensuales"}];

let Doctores = [{Nombre:"Juanito",
                Email:"juanito@outlook.com",
                Cedula:"0894619",
                Especialidad: "Cardiologo",
                Pacientes: 20,
                Facturas: "/documents/facturas/factura1.doc"},
                {Nombre:"Anita",
                Email:"anita@outlook.com",
                Cedula:"0894618",
                Especialidad: "Pediatra",
                Pacientes: 30,
                Facturas: "/documents/facturas/factura2.doc"}];

app.get("/admin", function(req,res){
    res.render("admin",{NombreAtributos, AtributosDoctores, Doctores})
})

app.get("/index", function(req,res){
    res.render("index",{NombreAtributos, AtributosDoctores, Doctores})
})


app.listen(3000, ()=>{
    console.log("Servidor encendido en puerto 3000")
})

