var app = angular.module('VinculacionApp');

app.controller('RegistroCtrl', ['registro', function(registro) {
    var controlador = this;
    
    controlador.correo;
    controlador.password;
    //controlador.confirm_password;
    controlador.numCuenta;
    controlador.nombre;
    controlador.campus;
    controlador.idCarrera;
    controlador.carrera;
    
    controlador.registrarAlumno = function() {
        registro.registroAlumno(JSON.stringify({
            IdNumber: controlador.numCuenta,
            Name: controlador.nombre,
            Password: controlador.password,
            Campus: controlador.campus,
            Email: controlador.correo,
            Major: {
                MajorId : controlador.idCarrera,
                Name: controlador.carrera
            }
    })).success(function(response) {
            console.log(response);
            console.log("Alumno registrado");
        })
        console.log("Registrado");
    };
    
    //Credits to Alex Cross - StackOverflow
    controlador.validar = function($event) { 
        var regex = new RegExp("[a-z]|[0-9]|[A-Z]");
    
        var key = String.fromCharCode(!$event.charCode ? $event.which : $event.charCode);
   
        if (!regex.test(key)) {
        $event.preventDefault();
        return false;
        }  
    };
}]);