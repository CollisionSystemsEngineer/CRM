const { render } = require('ejs');
const express = require('express');
const router = express.Router();
let User = require("../model/user")

let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let NombreAtributos = [{title:"Doctores"},{title:"Pacientes"},{title:"Proveedores"}];

let AtributosDoctores = [{atributo:"Nombre"}, 
                         {atributo:"Email"},
                         {atributo:"Cédula"}, 
                         {atributo:"Especialidad"}, 
                         {atributo:"Cantidad pacientes"}, 
                         {atributo:"Facturas mensuales"},
                         {atributo:"Tipo"}];

let Doctores = [{Nombre:"Juanito",
                Email:"juanito@outlook.com",
                Cedula:"0894619",
                Especialidad: "Cardiologo",
                Pacientes: 20,
                Facturas: "documentos/facturas/factura1.doc",
                Tipo: "Doctor"},
                {Nombre:"Anita",
                Email:"anita@outlook.com",
                Cedula:"0894618",
                Especialidad: "Pediatra",
                Pacientes: 30,
                Facturas: "documentos/facturas/factura2.doc",
                Tipo: "Doctor"}];

let AtributosPacientes = [{atributo:"Nombre"}, 
                         {atributo:"Apellido"},
                         {atributo:"Email"}, 
                         {atributo:"Sexo"}, 
                         {atributo:"Edad"}, 
                         {atributo:"Foto"},
                         {atributo:"Tipo"}];

let Pacientes = [{Nombre:"Juanito",
                Apellido: "Godinez",
                Email:"juanito@outlook.com",
                Sexo:"Masculino",
                Edad: 20,
                Foto: "images/usuario/usuario1.jpg",
                Tipo: "Paciente"},
                {Nombre:"Alfonso",
                Apellido: "Cletus",
                Email:"cletus@outlook.com",
                Sexo:"Masculino",
                Edad: 22,
                Foto: "images/usuario/usuario1.jpg",
                Tipo: "Paciente"}];

let AtributosProveedores = [{atributo:"Nombre"}, 
                {atributo:"Email"},
                {atributo:"Cédula"}, 
                {atributo:"Especialidad"}, 
                {atributo:"Cantidad pacientes"}, 
                {atributo:"Facturas mensuales"},
                {atributo:"Tipo"}];

let Proveedores = [{Nombre:"Juanito",
       Email:"juanito@outlook.com",
       Cedula:"0894619",
       Especialidad: "Cardiologo",
       Pacientes: 20,
       Facturas: "documentos/facturas/factura1.doc",
        Tipo: "Proveedor"},
       {Nombre:"Anita",
       Email:"anita@outlook.com",
       Cedula:"0894618",
       Especialidad: "Pediatra",
       Pacientes: 30,
       Facturas: "documentos/facturas/factura2.doc",
        Tipo: "Proveedor"}];

router.get("/admin", function(req,res){
    res.render("admin",{NombreAtributos, AtributosDoctores, Doctores, AtributosPacientes, Pacientes, AtributosProveedores, Proveedores})
})

router.get("/index", function(req,res){
    res.render("index",{NombreAtributos, AtributosDoctores, Doctores})
})

router.get("/login", function(req,res){

    res.render("index")
})

router.get("/signup", function(req,res){

    res.render("index")
})

router.get("/registroDoctor", function(req,res){

    res.render("registroDoctor")
})

router.post("/signup", async function(req, res){

    //Objeto con string de correo + contraseña
    let user = new User(req.body)
    //Consulta a BD
    let exists = await User.findOne({email:user.email})
    //Si no hay usuarios con el mismo correo, se crea usuario
    if(!exists){

        //Métrica de seguridad del Hash (10). Seguridad y Complejidad
        user.password = bcrypt.hashSync(user.password,10)
        console.log(user.password)
        await user.save()
        res.redirect("/login")
    }else{
        res.redirect("/login")
    }
})

router.post("/login", async function(req, res){

    let email = req.body.email
    let plainpassword = req.body.password

    let user = await User.findOne({email:email})

    if(!user){
        res.redirect("/signup")
    }else{
        //El usuario existe, validar contraseña
        let valid = await bcrypt.compareSync(plainpassword,user.password)
        //Generar TOKEN y mandar a HOME
        if(valid){
            //Recibe información a guardar(USERID) + Texto de Firma de TOKEN para que sea único
            // + Tiempo de expiración
            let token = jwt.sign({id: user.email}, process.env.SECRETO,{
                expiresIn:"10min"
            })
            console.log(token)
            //Guarda temporalmente el TOKEN en un espacio seguro del navegador
            res.cookie("token",token,{httpOnly:true})
            res.redirect("/admin")
        }else{
            res.redirect("/login")
        } 
    }

     
})

module.exports = router;