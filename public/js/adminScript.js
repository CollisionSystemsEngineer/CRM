const router = require("../../routes/routeindex");



  $("#list-doctores").on('click', function (e) {
    
    doctores = router.get("/doctores")
  });

  $("#list-pacientes").on('click', function (e) {
    
    pacientes = router.get("/pacientes")
  });

  $("#list-proveedores").on('click', function (e) {
    proveedores = router.get("/proveedores")
  });

  $("agregar-registro").on('click', function (e) {
    console.log("Agregar registro")
    e.preventDefault()
    if (NombreAtributos[0] === "doctores") {
     router.post("/newdoctor")
    } else if (NombreAtributos[0] === "pacientes") {
      router.post("/newpaciente")
    
    } else if (NombreAtributos[0] === "provedores") {
      router.post("/newproveedor")
    }

  });