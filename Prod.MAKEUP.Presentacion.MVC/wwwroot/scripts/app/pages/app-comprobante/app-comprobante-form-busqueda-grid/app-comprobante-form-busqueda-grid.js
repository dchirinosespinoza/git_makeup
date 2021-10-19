define(['knockout', "ns", 'alertService', 'grillaService', 'ajaxService'], function (ko, ns, alertService, grillaService, ajaxService) {
    function viewModel(params) {

        var self = this;

        //VARIABLES
        self.ns = ns;
        self.modelParent = params.modelParent;
        self.pageSizeLength = [{ Value: 10, Text: "10" }, { Value: 25, Text: "25" }, { Value: 50, Text: "50" }, { Value: 100, Text: "100" }];
        self.Grid = new grillaService(ns.URL + '/Comprobante/getComprobantes', 10, 1);
        self.opt = ko.observable(null);

        self.ComprobanteDefault = function () {
            var comprobante = {
                id: 0,
                NroSIAF: null,
                Fecha: null,
                NroOS: null,
                NroOC: null,
                RazonSocial: null,
                Monto: null,
                Opc: null,
                TipoPago: null,
                CodArchivo: null,
                NroDO: null,
                Estado: null,
                NroCP: null,
                RazonSocial: null,
                CodComprobanteFirmado: null,
                ExpedienteSitradoc: null,
                TipoHoja: null
            }
            return comprobante;
        }
        self.Comprobante = ko.mapping.fromJS(self.ComprobanteDefault());

        self.IdComprobanteSeleccionado = ko.observable("");
        self.Usuario = ko.observable("");

        self.getUsuario = function () {

            ajaxService.Get(ns.URL + '/Comun/getUsuario'
                , function (response) {
                    self.Usuario(response);

                    //console.log(self.Grid.Data());
                    //$("#btnAgregarConcepto").hide();
                    //$("#btnAnularComprobante").hide();

                    if (self.Usuario() == "Administrador" || self.Usuario() == "Usuario Tesoreria" || self.Usuario() == "Archivo" || self.Usuario() == "Girador") {
                        $("#btnEnviarArchivoOT").hide();
                    }
                    if (self.Usuario() == "Usuario Tesoreria" || self.Usuario() == "Usuario OGA" || self.Usuario() == "Usuario OC" || self.Usuario() == "Usuario Caja" || self.Usuario() == "Archivo") {
                        $("#btnEnviarArchivoOC").hide();
                        $("#btnEnviarArchivoOGA").hide();
                        $("#btnMostrarRegistrar").hide();
                    }
                    if (self.Usuario() == "Usuario Tesoreria" || self.Usuario() == "Usuario OGA" || self.Usuario() == "Usuario OC" || self.Usuario() == "Archivo") {
                        $("#btnEnviarArchivoARCH").hide();
                    }
                    if (self.Usuario() == "Usuario Tesoreria" || self.Usuario() == "Usuario OGA" || self.Usuario() == "Usuario OC" || self.Usuario() == "Usuario Caja" || self.Usuario() == "Archivo") {
                        $("#btnEnviarArchivoCAJA").hide();
                    }
                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }
                
        self.getUsuario();        

        //FUNCIONES
        self.modelParent.Buscar = function () {             
            self.Grid.GetData(ko.mapping.toJS(self.modelParent.Filtro));
            /*
            self.Grid.GetData({
                request: ko.mapping.toJS(self.modelParent.Filtro)
            });
            */
        };

        self.Grid.pageSize.subscribe(function () {

            self.Grid.GetData();
        });

        self.Editar = function (item) {
            self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));
            self.modelParent.ModoRegistro("M");
            $("#modalRegistrarComprobante").modal("show");
        };
        self.Consultar = function (item) {                 
            //alert("agregar concepto:" + self.modelParent.IdComprobanteSeleccionado);
            self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));
            self.modelParent.ModoRegistro("C");
            $("#modalRegistrarComprobanteConcepto").modal("show");
        };

        self.Flujo = function (item) {
            //alert("agregar concepto:" + self.modelParent.IdComprobanteSeleccionado);
            self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));
            self.modelParent.ModoRegistro("C");
            $("#modalComprobanteFlujo").modal("show");
        };

        self.DescargaAdjuntos = function (item) {
            self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));
            self.modelParent.ModoRegistro("C");
            $("#modalDescargaAdjuntos").modal("show");
        };

        self.Radio = function (item, event) {
            self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));
            self.modelParent.IdComprobanteSeleccionado = item.id_comprobante_pago();
            self.IdComprobanteSeleccionado(item.id_comprobante_pago());
            if (event.target.value === self.opt()) {
                self.opt(null);
                event.target.checked = false;
            }
            return true;
        };

        self.Exportar = function (opc) {  
            //alert("excel");
            var filter = {
                NombreReporte: "Busqueda_Comprobantes",
                Rdl: opc == 1 ? "ComprobantesBusquedaGeneral" : "ComprobantesFlujo",
                Formato: "XLSX",
                Parametros: {
                    ID_COMPROBANTE_PAGO: self.modelParent.Filtro.NroComprobante() === null ? -1 : self.modelParent.Filtro.NroComprobante(),
                    FECHA_INICIO: self.modelParent.Filtro.FechaInicio() === "" ? "01/01/1900" : self.modelParent.Filtro.FechaInicio(),
                    FECHA_FIN: self.modelParent.Filtro.FechaFin() === "" ? "01/01/1900" : self.modelParent.Filtro.FechaFin(),
                    NRO_SIAF: self.modelParent.Filtro.NroSIAF() === null ? -1 : self.modelParent.Filtro.NroSIAF(),
                    NRO_OS: self.modelParent.Filtro.NroOS() === null ? -1 : self.modelParent.Filtro.NroOS(),
                    NRO_OC: self.modelParent.Filtro.NroOC() === null ? -1 : self.modelParent.Filtro.NroOC(),
                    NRO_DO: self.modelParent.Filtro.NroDO() === null ? -1 : self.modelParent.Filtro.NroDO(),
                    NRO_CP: self.modelParent.Filtro.NroCP() === null ? -1 : self.modelParent.Filtro.NroCP(),
                    ESTADO: self.modelParent.Filtro.Estado() === null ? -1 : self.modelParent.Filtro.Estado(),
                    RAZON_SOCIAL: self.modelParent.Filtro.RazonSocial() === null ? -1 : self.modelParent.Filtro.RazonSocial()
                }

            };

            $().DownloadManager(ns.URL + '/Comprobante/Exportar', filter); 
        };

        self.ExportarGeneral = function () {
            self.Exportar(1);
        }
        self.ExportarFlujo = function () {
            self.Exportar(2);
        }

        self.AgregarConcepto = function (item) {
            //alert("agregar concepto:" + self.modelParent.IdComprobanteSeleccionado);
            //if (self.IdComprobanteSeleccionado() == "") {
            //    alert("Debe Seleccionar un registro")
            //} else {
            //    self.modelParent.ModoRegistro("M");
            //    $("#modalRegistrarComprobanteConcepto").modal("show");
            //}
            self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));
            self.IdComprobanteSeleccionado(self.modelParent.ComprobanteSelected().id_comprobante_pago);
            self.modelParent.ModoRegistro("M");
            $("#modalRegistrarComprobanteConcepto").modal("show");            
        };

        self.AnularComprobante = function (item) {
                self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));

                self.Comprobante.id(self.modelParent.ComprobanteSelected().id_comprobante_pago);
                self.Comprobante.Fecha(self.modelParent.ComprobanteSelected().fecha_registro_str);
                self.Comprobante.NroSIAF(self.modelParent.ComprobanteSelected().numero_siaf);
                self.Comprobante.NroOS(self.modelParent.ComprobanteSelected().numero_orden_servicio);
                self.Comprobante.NroOC(self.modelParent.ComprobanteSelected().numero_orden_compra);
                self.Comprobante.NroDO(self.modelParent.ComprobanteSelected().documento_otro);
                self.Comprobante.NroCP(self.modelParent.ComprobanteSelected().numero_comprobante_pago);
                self.Comprobante.RazonSocial(self.modelParent.ComprobanteSelected().razon_social);
                self.Comprobante.TipoPago(self.modelParent.ComprobanteSelected().id_tipo_pago);
                self.Comprobante.CodArchivo(self.modelParent.ComprobanteSelected().cod_archivo);
                self.Comprobante.CodComprobanteFirmado(self.modelParent.ComprobanteSelected().cod_comprobante_firmado);
                self.Comprobante.TipoHoja(self.modelParent.ComprobanteSelected().tipo_hoja_tramite);
                self.Comprobante.ExpedienteSitradoc(self.modelParent.ComprobanteSelected().expediente_sitradoc);
                self.Comprobante.Opc = '2';

                var comprobante = ko.mapping.toJS(self.Comprobante);

                var url = "/Comprobante/Actualizar";

                ko.Confirm({ message: "<b>Está seguro de anular el comprobante?</b>" },
                    function () {
                        ajaxService.Post(ns.URL + url, comprobante
                            , function (response) {
                                if (response.Success) {
                                    alertService.displaySuccessNotification("Se anulo el comprobante satisfactoriamente.");
                                    self.modelParent.Buscar();
                                } else {
                                    alertService.displayWarningNotification(response.Messages);
                                }
                            },
                            function (d) {
                                alertService.displayErrorNotification(d);

                            });
                    });
            
        };

        self.RecepcionComprobante = function (item) {
            self.modelParent.ComprobanteSelected(ko.mapping.toJS(item));

            self.Comprobante.id(self.modelParent.ComprobanteSelected().id_comprobante_pago);
            self.Comprobante.Fecha(self.modelParent.ComprobanteSelected().fecha_registro_str);
            self.Comprobante.NroSIAF(self.modelParent.ComprobanteSelected().numero_siaf);
            self.Comprobante.NroOS(self.modelParent.ComprobanteSelected().numero_orden_servicio);
            self.Comprobante.NroOC(self.modelParent.ComprobanteSelected().numero_orden_compra);
            self.Comprobante.NroDO(self.modelParent.ComprobanteSelected().documento_otro);
            self.Comprobante.NroCP(self.modelParent.ComprobanteSelected().numero_comprobante_pago);
            self.Comprobante.RazonSocial(self.modelParent.ComprobanteSelected().razon_social);
            self.Comprobante.TipoPago(self.modelParent.ComprobanteSelected().id_tipo_pago);
            self.Comprobante.CodArchivo(self.modelParent.ComprobanteSelected().cod_archivo);
            self.Comprobante.CodComprobanteFirmado(self.modelParent.ComprobanteSelected().cod_comprobante_firmado);
            self.Comprobante.TipoHoja(self.modelParent.ComprobanteSelected().tipo_hoja_tramite);
            self.Comprobante.ExpedienteSitradoc(self.modelParent.ComprobanteSelected().expediente_sitradoc);
            self.Comprobante.Opc = '8';

            var comprobante = ko.mapping.toJS(self.Comprobante);

            var url = "/Comprobante/Actualizar";

            ko.Confirm({ message: "<b>Se registrara la fecha de recepción del comprobante, confirmar?</b>" },
                function () {
                    ajaxService.Post(ns.URL + url, comprobante
                        , function (response) {
                            if (response.Success) {
                                alertService.displaySuccessNotification("Fecha de recepción registrada satisfactoriamente.");
                                self.modelParent.Buscar();
                            } else {
                                alertService.displayWarningNotification(response.Messages);
                            }
                        },
                        function (d) {
                            alertService.displayErrorNotification(d);

                        });
                });

        };

        self.EnviarArchivo = function (opc) {
            if (self.IdComprobanteSeleccionado() == "") {
                alert("Debe Seleccionar un registro")
            } else {
                var Estado = self.modelParent.ComprobanteSelected().estado;
                if (Estado == "1" || (Estado == "2" && opc != "3") || ((Estado == "3" || Estado == "4" || Estado == "5") && opc == "7") || (Estado == "5" && opc == "3" && self.Usuario() == "Usuario Caja")) {
                    self.Comprobante.id(self.modelParent.ComprobanteSelected().id_comprobante_pago);
                    self.Comprobante.Fecha(self.modelParent.ComprobanteSelected().fecha_registro_str);
                    self.Comprobante.NroSIAF(self.modelParent.ComprobanteSelected().numero_siaf);
                    self.Comprobante.NroOS(self.modelParent.ComprobanteSelected().numero_orden_servicio);
                    self.Comprobante.NroOC(self.modelParent.ComprobanteSelected().numero_orden_compra);
                    self.Comprobante.NroDO(self.modelParent.ComprobanteSelected().documento_otro);
                    self.Comprobante.NroCP(self.modelParent.ComprobanteSelected().numero_comprobante_pago);
                    self.Comprobante.RazonSocial(self.modelParent.ComprobanteSelected().razon_social);
                    self.Comprobante.Monto(self.modelParent.ComprobanteSelected().monto);
                    self.Comprobante.TipoPago(self.modelParent.ComprobanteSelected().id_tipo_pago);
                    self.Comprobante.CodArchivo(self.modelParent.ComprobanteSelected().cod_archivo);
                    self.Comprobante.CodComprobanteFirmado(self.modelParent.ComprobanteSelected().cod_comprobante_firmado);
                    self.Comprobante.TipoHoja(self.modelParent.ComprobanteSelected().tipo_hoja_tramite);
                    self.Comprobante.ExpedienteSitradoc(self.modelParent.ComprobanteSelected().expediente_sitradoc);
                    self.Comprobante.Opc = opc;

                    var comprobante = ko.mapping.toJS(self.Comprobante);

                    var url = "/Comprobante/Actualizar";

                    ko.Confirm({ message: "<b>Está seguro de enviar el comprobante?</b>" },
                        function () {
                            ajaxService.Post(ns.URL + url, comprobante
                                , function (response) {
                                    if (response.Success) {
                                        alertService.displaySuccessNotification("El comprobante se envió satisfactoriamente.");
                                        self.modelParent.Buscar();
                                    } else {
                                        alertService.displayWarningNotification(response.Messages);
                                    }
                                },
                                function (d) {
                                    alertService.displayErrorNotification(d);
                                });
                        });
                } else {
                    alert("El comprabante ya ha sido enviado o se encuentra anulado")                    
                }
            }
        };

    };

    self.EnviarArchivoOC = function () {
        if (typeof self.EnviarArchivo === 'function') { self.EnviarArchivo(4); }
        else { this.EnviarArchivo(4); }
    }
    self.EnviarArchivoOGA = function () {
        this.EnviarArchivo(5);
    }
    self.EnviarArchivoCAJA = function () {
        this.EnviarArchivo(6);
    }
    self.EnviarArchivoARCH = function () {
        this.EnviarArchivo(3);
    }
    self.EnviarArchivoOT = function () {
        if (typeof self.EnviarArchivo === 'function') { self.EnviarArchivo(7); }
        else { this.EnviarArchivo(7); }
    }

    return {
        viewModel: viewModel,
        /*
        ,template: ``
        */
    };

    
});
