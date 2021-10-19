define(['knockout', 'ajaxService'], function (ko, ajaxService) {
	function comboViewModel(params) {
		var self = this;
		
        self.viewContainer = params.viewContainer;  

		self.data =
            {
                correo: ko.observable('correo@dominio.com'),
                clave: ko.observable('')                
            };

        self.nombre = ko.observable('Hola mundo desde MVC Net Core');
        
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
	return {
		viewModel: comboViewModel,
        /*
        ,template: ``
        */
	};

});
