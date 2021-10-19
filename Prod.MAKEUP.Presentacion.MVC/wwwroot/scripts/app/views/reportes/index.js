define(["jquery", "knockout", "ns", "ajaxService", "moment", "alertService"], function ($, ko, ns, ajaxService, moment, alertService) {
    "use strict";

    var Modelo = function () {
        var self = this;
        //VARIABLES
        self.Departamentos = ko.mapping.fromJS([]);
        self.Provincias = ko.mapping.fromJS([]);
        self.Distritos = ko.mapping.fromJS([]);
        self.TiposReportes = [
            {
                Nombre: "Reporte de Personas con estado Activo",
                FileName: "Personas_Estado_Activo",
                FLAG: "A",//PERSONAS ACTIVAS
                RDL: "PersonasEstadoActivo"
            },
            {
                Nombre: "Reporte de Personas con estado Inactivo",
                FileName: "Personas_Estado_Inactivo",
                FLAG: "I",//PERSONAS INACTIVAS
                RDL: "PersonasEstadoInactivo"
            },
            {
                Nombre: "Reporte Consolidado del Directorio de Personas",
                FileName: "Reporte_Consolidado",
                FLAG: "-1",
                RDL: "PersonasReporteConsolidado"
            },
            {
                Nombre: "Reporte de Personas por Ubicaciones Geográficas",
                FileName: "Reporte_Ubicacion_Geografica",
                FLAG: "-1",
                RDL: "PersonasPorUbigeo"
            },
            //{
            //    Nombre: "Reporte de Datos de Persona Modificados",
            //    FileName: "Personas_Estado_Activo",
            //    RDL: "PersonasEstadoActivo"
            //},
            {
                Nombre: "Reporte General del Directorio de Persona",
                FileName: "Reporte_General",
                FLAG: "-1",
                RDL: "PersonasReporteGeneral"
            }];

        self.Filtro = ko.mapping.fromJS({
            Reporte: "PersonasEstadoActivo",
            TipoPersona: "-1",
            FechaInicio: null,
            FechaFin: null,
            Departamento: null,
            Provincia: null,
            Distrito: null

        });

        //FUNCIONES
        self.getDepartamentos = function () {

            ajaxService.Get(ns.URL + '/Comun/getDepartamentos'
                , function (response) {

                    self.Departamentos(response);

                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }
        self.DepartamentoChange = function (data, event) {
            self.Provincias([]);

            var ubigeo = (event != null && event.currentTarget != undefined) ? $(event.currentTarget).val() : self.Filtro.Departamento();
            if (ubigeo != null && ubigeo !== "") {
                ajaxService.GetWithData(ns.URL + '/Comun/getProvincias',
                    {
                        filtro: { codigo: ubigeo }
                    },
                    function (response) {

                        self.Provincias(response);

                    },
                    function (d) {
                        alertService.displayErrorNotification(d);

                    });
            }
        }
        self.ProvinciaChange = function (data, event) {
            self.Distritos([]);
            var ubigeo = self.Filtro.Departamento()+((event != null && event.currentTarget != undefined) ? $(event.currentTarget).val() : self.Filtro.Provincia());//$(event.currentTarget).val();
            if (ubigeo != null && ubigeo !== "") {
                ajaxService.GetWithData(ns.URL + '/Comun/getDistritos',
                    {
                        filtro: { codigo: ubigeo }
                    },
                    function (response) {

                        self.Distritos(response);


                    },
                    function (d) {
                        alertService.displayErrorNotification(d);

                    });
            }

        }
        self.Init = function () {
            //self.getTiposPersona();
            self.getDepartamentos();
        }
        //
        self.DescargarPdf = function () {

            if (self.ValidarFiltros())
                self.Descargar("PDF");

        }
        self.DescargarExcel = function () {

            if (self.ValidarFiltros())
                self.Descargar("XLSX");


        }
        self.Descargar = function (formato) {

            var reporte = self.TiposReportes.find(item => item.RDL == self.Filtro.Reporte());
            var filter = {
                NombreReporte: reporte.Nombre,
                Rdl: reporte.RDL,
                Formato: formato,
                Parametros: {
                    ID_TIPO_PERSONA: self.Filtro.TipoPersona(),
                    FLAG: reporte.FLAG,
                    FECHA_INI: moment(self.Filtro.FechaInicio(), "DD/MM/YYYY").format("YYYY-MM-DD"),
                    FECHA_FIN: moment(self.Filtro.FechaFin(), "DD/MM/YYYY").format("YYYY-MM-DD"),
                    CODIGO_DEPARTAMENTO: self.Filtro.Departamento(),
                    CODIGO_PROVINCIA: self.Filtro.Provincia() == undefined ? "-1" : self.Filtro.Provincia(),
                    CODIGO_DISTRITO: self.Filtro.Distrito() == undefined ? "-1" : self.Filtro.Distrito()
                }

            }
            
            $().DownloadManager(ns.URL + '/Reportes/Personas', filter);
        }
        self.ValidarFiltros = function () {
            var valid = true;

            switch (self.Filtro.Reporte()) {
                case "PersonasEstadoActivo":
                case "PersonasEstadoInactivo":
                case "PersonasReporteGeneral":

                    //Fecha Inicio
                    if (self.Filtro.FechaInicio() == null ||self.Filtro.FechaInicio() == "") {
                        var valid = false;
                        alertService.displayWarningNotification("Debe seleccionar la <b>Fecha de creación de registro </b>");
                    }

                    //Fecha Fin
                    if (self.Filtro.FechaFin() == null ||self.Filtro.FechaFin() == "") {
                        var valid = false;
                        alertService.displayWarningNotification("Debe seleccionar la <b>Fecha Hasta </b>");
                    }

                    break;
                case "PersonasPorUbigeo":

                    //Fecha Inicio
                    if (self.Filtro.FechaInicio() == null ||self.Filtro.FechaInicio() == "") {
                        var valid = false;
                        alertService.displayWarningNotification("Debe seleccionar <b>Fecha de creación de registro </b>");
                    }

                    //Fecha Fin
                    if (self.Filtro.FechaFin() == null ||self.Filtro.FechaFin() == "") {
                        var valid = false;
                        alertService.displayWarningNotification("Debe seleccionar la <b>Fecha Hasta </b>");
                    }

                    //Fecha Fin
                    if (self.Filtro.Departamento() == null || self.Filtro.Departamento() == "") {
                        var valid = false;
                        alertService.displayWarningNotification("Debe seleccionar un <b> departamento </b>");
                    }

                    break;
                default:
                    valid = true;
                    break;
            }

            return valid;
        }
        self.Limpiar = function() {
            ko.mapping.fromJS({
                TipoPersona: "-1",
                FechaInicio: null,
                FechaFin: null,
                Departamento: null,
                Provincia: null,
                Distrito: null
            }, self.Filtro);
            $("#txtFechaInicio").val(null);
            $("#txtFechaFin").val(null);
        }
        //INICIO
        self.Init();
    };
    ko.applyBindingsCustom(new Modelo(), ns.CONTAINER);



}
);
