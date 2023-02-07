const router = require("../../routes/routeindex");

$('.list-group-item').on('click', function (e) {

  $(this).addClass('active');
    $(this).siblings().removeClass('active');  
  });

  $("#list-doctores").on('click', function (e) {
    
    router.get("/doctores")
  });

  $("#list-pacientes").on('click', function (e) {
    
    router.get("/pacientes")
  });

  $("#list-proveedores").on('click', function (e) {
    
    router.get("/proveedores")
  });

  $("#agregar-registro").on('click', function (e) {
    e.preventDefault()
    if (NombreAtributos[0] === "doctores") {
     router.post("/newdoctor")
    } else if (NombreAtributos[0] === "pacientes") {
      router.post("/newpaciente")
    
    } else if (NombreAtributos[0] === "provedores") {
      router.post("/newproveedor")
    }

  });
  