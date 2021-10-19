define(["jquery", "knockout", "ns"], function ($, ko, ns) {
    "use strict";

    var Modelo = function () {
        var self = this;
        
        self.data =
            {
                correo: ko.observable('correo@dominio.com'),
                clave: ko.observable('')                
            };

        self.Alerta = function () {
            ko.Alert({ message: 'Este es un mensaje de alerta' });
        };

        self.Confirma = function () {
            ko.Confirm({ message: 'Este es un mensaje de confirmacion?' }, function () {
                console.log('ya confirmé');
            }
            );
        };

        self.Enviar = function () {
            var valid = $("#formRegistro").IsValidationEngine();
            
            if (valid) {
                console.log('ok');
                
            }

        };
    }

    ko.applyBindingsCustom(new Modelo(), ns.CONTAINER);
}
);
