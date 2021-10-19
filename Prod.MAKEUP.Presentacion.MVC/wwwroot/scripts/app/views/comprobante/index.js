define(["jquery", "knockout", "ns", "ajaxService"], function ($, ko, ns, ajaxService) {
    "use strict";

    var Modelo = function () {

        //VARIABLES
        var self = this;
        /*self.Sectores = ko.mapping.fromJS([]);*/
        self.TiposPersona = ko.mapping.fromJS([]);
        self.Conceptos = ko.mapping.fromJS([]);
        self.TipoPago = ko.mapping.fromJS([]);
        /*self.TiposDocumento = ko.mapping.fromJS([]);
        self.Departamentos = ko.mapping.fromJS([]);*/
        self.ModoRegistro = ko.observable("I");//I:INSERTAR;A:ACTUALIZAR
        self.ComprobanteSelected = ko.observable();
        self.Filtro = ko.mapping.fromJS({
            FechaInicio: null,
            FechaFin: null,
            NroComprobante: null,
            NroSIAF: null,
            NroOS: null,
            NroOC: null,
            NroDO: null,
            Estado: null
            //PageSize: self.Grid.pageSize()
        });
        self.FiltroDet = ko.mapping.fromJS({
            idComprobantePago: null,
            idConceptoPago: null,
            monto: null
            //PageSize: self.Grid.pageSize()
        });
        self.FiltroAdjunto = ko.mapping.fromJS({
            tipoHoja: null,
            idExpSitradoc: null
            //PageSize: self.Grid.pageSize()
        });
        self.IdComprobanteSeleccionado = ko.observable("");
        self.NombreRazonSocial = ko.mapping.fromJS([]);

        var strPerfil = null;

        //FUNCIONES
        /*self.getSectores = function () {

            ajaxService.Get(ns.URL + '/Comun/getSectores'
                , function (response) {

                    self.Sectores(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }*/
        self.getTiposPersona = function () {

            ajaxService.Get(ns.URL + '/Comun/getTiposPersona'
                , function (response) {

                    self.TiposPersona(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }
        /*self.getTiposDocumento = function () {

            ajaxService.Get(ns.URL + '/Comun/getTiposDocumento'
                , function (response) {

                    self.TiposDocumento(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }
        self.getDepartamentos = function () {

            ajaxService.Get(ns.URL + '/Comun/getDepartamentos'
                , function (response) {

                    self.Departamentos(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }*/

        self.getConceptos = function () {

            ajaxService.Get(ns.URL + '/Comun/getConceptos'
                , function (response) {

                    self.Conceptos(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }

        self.getTipoPago = function () {

            ajaxService.Get(ns.URL + '/Comun/getTipoPago'
                , function (response) {

                    self.TipoPago(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }

        self.getNombreRazonSocial = function () {

            ajaxService.Get(ns.URL + '/Comun/getNombreRazonSocial'
                , function (response) {

                    self.NombreRazonSocial(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }
                
        self.Init = function () {
            /*self.getSectores();*/
            //self.getTiposPersona();
            /*self.getTiposDocumento();
            self.getDepartamentos();   */
            self.getConceptos();
            //self.getNombreRazonSocial();
            self.getTipoPago();                       
        }

        //EVENTOS
        self.Buscar = function () { }//function que se sobrescribe en [app-Comprobante-form-busqueda-grid]
        self.MostrarRegistrar = function () { }//function que se sobrescribe en [app-Comprobante-form-modal-registrar]
        self.MostrarRegistrarConcepto = function () { }//function que se sobrescribe en [app-Comprobante-form-modal-concepto]
        //INICIO
        self.Init();

    }

    self.Usuario = ko.observable("");

    self.getUsuario = function () {

        ajaxService.Get(ns.URL + '/Comun/getUsuario'
            , function (response) {
                self.Usuario(response);
                if (self.Usuario() == "Usuario Tesoreria" || self.Usuario() == "Usuario OC" || self.Usuario() == "Usuario OGA" || self.Usuario() == "Girador" || self.Usuario() == "Usuario Caja") {
                    $("#li_prestamo").hide();
                    //if (self.Usuario() != "Usuario OGA" && self.Usuario() != "Usuario OC") {
                    //    $("#btnEnviarArchivoOT").hide();
                    //}                    
                }
                else {
                    //$("#btnEnviarArchivoOT").hide();
                }
            },
            function (d) {
                alertService.displayErrorNotification(d);
            });
    }

    self.getUsuario();

    ko.applyBindingsCustom(new Modelo(), ns.CONTAINER);
}
);
