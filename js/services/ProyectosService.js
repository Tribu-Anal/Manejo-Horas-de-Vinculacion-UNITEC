var app = angular.module('VinculacionApp');

app.service('proyectos', function($http) {
   var direccion = 'http://vinculacionbackend.apphb.com/api/Proyects';
   
   this.getProyectos = function(numCuenta, callback) {
       //Mas adelante se utilizara el numero de cuenta para obtener los proyectos de un alumno/docente en especifico.
      //$http.get(direccion + '/' + numCuenta).then(callback);
       $http.get(direccion + "/1").then(callback);
   }
})