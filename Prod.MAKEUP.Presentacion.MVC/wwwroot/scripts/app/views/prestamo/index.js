define(["jquery", "knockout", "ns", "ajaxService"], function ($, ko, ns, ajaxService) {
    "use strict";

    var Modelo = function () {

        //VARIABLES
        var self = this;
        self.TiposPersona = ko.mapping.fromJS([]);
        self.Estados = ko.mapping.fromJS([]);
        self.Usuarios = ko.mapping.fromJS([]);
        self.Dependencias = ko.mapping.fromJS([]);
        self.ModoRegistro = ko.observable("I");//I:INSERTAR;A:ACTUALIZAR
        self.PrestamoSelected = ko.observable();
        self.Filtro = ko.mapping.fromJS({
            FechaInicio: null,
            FechaFin: null,
            NroComprobante: null,
            Usuario: null,
            EstadoPrestamo: null,
            idEstadoPrestamo: null,
            CodigoDependencia: null
            //PageSize: self.Grid.pageSize()
        });
        self.IdPrestamoSeleccionado = ko.observable("");

        //FUNCIONES
        self.getTiposPersona = function () {

            ajaxService.Get(ns.URL + '/Comun/getTiposPersona'
                , function (response) {

                    self.TiposPersona(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }

        self.getEstados = function () {

            ajaxService.Get(ns.URL + '/Comun/getEstados'
                , function (response) {

                    self.Estados(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }

        self.getUsuarios = function () {

            ajaxService.Get(ns.URL + '/Comun/getUsuarios'
                , function (response) {

                    self.Usuarios(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }

        self.getDependencias = function () {

            ajaxService.Get(ns.URL + '/Comun/getDependencias'
                , function (response) {

                    self.Dependencias(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }
                
        self.Init = function () {
            //self.getTiposPersona();            
            self.getEstados();
            //self.getUsuarios();
            self.getDependencias();
        }

        //EVENTOS
        self.Buscar = function () { }//function que se sobrescribe en [app-prestamo-form-busqueda-grid]
        self.MostrarRegistrar = function () { }//function que se sobrescribe en [app-prestamo-form-modal-registrar]
        //INICIO
        self.Init();

    }

    ko.applyBindingsCustom(new Modelo(), ns.CONTAINER);
}
);
