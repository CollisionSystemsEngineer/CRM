const { render } = require('ejs');
const express = require('express');
const router = express.Router();
let User = require("../model/user")

let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

router.get('/', function(req,res){
    res.json({});
});

router.get("/login", function(req,res){

    res.render("index")
})

router.get("/signup", function(req,res){

    res.render("index")
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
            res.redirect("/")
        }else{
            res.redirect("/login")
        } 
    }

     
})

module.exports = router;