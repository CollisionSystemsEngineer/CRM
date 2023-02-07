let jwt = require("jsonwebtoken")

//Se ejecuta antes de que la ruta regrese información al usuario
//Antes de llegar a HOME hacer LOGIN
//next = termina middleware
function verifyToken(req,res,next){

    //Busca y almacena la petición TOKEN o vacío
    let token = req.cookies.token || ''

    //Si no hay TOKEN, mandar a LOGIN PAGE
    if(!token){
        return res.redirect("/")
    }else{

        //Validar TOKEN
        //datos = Información que trae el TOKEN de inicialización en ROUTER
        jwt.verify(token,process.env.SECRETO,function(err,datos){
            if(err){
                console.log(err)
                return res.redirect("/")
            }else{
                //Guarda el usuario para hacer la posterior búsqueda de tareas por usuario específico
                req.userId = datos.id
                next()
            }
        })
    }
}

module.exports = verifyToken