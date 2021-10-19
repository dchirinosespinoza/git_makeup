define(['jquery', 'knockout', "ns", 'ajaxService', 'alertService', "enumerado", 'domReady', 'grillaService'], function ($, ko, ns, ajaxService, alertService, enumerado, domReady, grillaService) {
    $(document).ready(function () {

        $('#modalDescargaAdjuntos').on('show.bs.modal', function (e) {
                        
            var self = ko.dataFor(this);    
            
        });

        $('#modalDescargaAdjuntos').on('shown.bs.modal', function (e) {

            var self = ko.dataFor(this);

            if (self.modelParent.ModoRegistro() === "C") {                
                self.titulo("Descarga de Archivos");                
            } else {
                self.titulo("Descarga de Archivos");
            }
            self.MostrarDescargaAdjuntos();
        });

    });

    function viewModel(params) {

        var self = this;

        //VARIABLES
        self.ns = ns;
        self.enumerado = enumerado;//solo para poder utilizar en la vista
        self.modelParent = params.modelParent;
        self.ComprobanteDefault = function () {
            var comprobante = {
                id: 0,
                NroSIAF: null,
                Fecha: null,
                NroOS: null,
                NroOC: null,
                NroCP: null,
                RazonSocial: null,
                Monto: null,
                idTipoPago: null,
                CodArchivo: null,
                CodComprobanteFirmado: null,
                ExpedienteSitradoc: null,
                TipoHoja: null
            }
            return comprobante;
        }
        self.Comprobante = ko.mapping.fromJS(self.ComprobanteDefault());

        self.ComprobanteDetalleDefault = function () {
            var comprobantedetalle = {
                idComprobantePago: 0,
                idDetalleComprobantePago: 0,
                idConceptoPago: 0,
                desConceptoPago: null,
                monto: 0
            }
            return comprobantedetalle;
        }
        self.ComprobanteDetalle = ko.mapping.fromJS(self.ComprobanteDetalleDefault());

        self.GridDetalle = new grillaService(ns.URL + '/Comprobante/getArchivoAdjunto', 10, 1);

        //self.ArchivoAdjunto = ko.observableArray([
        //    { idDoc: "5f88c483a92c9457b408f0d4", nombre: "MEMO 00000711-2020-PRODUCEOt_COMPA(1).pdf", checkSi: false, checkVer: true },
        //    { idDoc: "5f876db39e154153dc88cafd", nombre: "frmAnex01.pdf", checkSi: false, checkVer: true }
        //]);

        self.titulo = ko.observable("");
        self.ModoRegistro = ko.dataFor(self.modelParent.ModoRegistro());

        var ListaArchivos = ko.observableArray();
        
        //FUNCIONES
        self.fnCheck = function (item) {
            item.checkSi = !item.checkSi;
            if (item.checkSi) {
                ListaArchivos.push(item.idDoc);
            }
            else {
                ListaArchivos.remove(item.idDoc);
            }
            
            return true;
        }

        self.MostrarDescargaAdjuntos = function () {
            ko.mapping.fromJS(self.ComprobanteDefault(), self.Comprobante);

            self.Comprobante.id(self.modelParent.ComprobanteSelected().id_comprobante_pago);
            self.Comprobante.Fecha(self.modelParent.ComprobanteSelected().fecha_registro_str);
            self.Comprobante.NroSIAF(self.modelParent.ComprobanteSelected().numero_siaf);
            self.Comprobante.NroOS(self.modelParent.ComprobanteSelected().numero_orden_servicio);
            self.Comprobante.NroOC(self.modelParent.ComprobanteSelected().numero_orden_compra);
            self.Comprobante.NroCP(self.modelParent.ComprobanteSelected().numero_comprobante_pago);
            self.Comprobante.RazonSocial(self.modelParent.ComprobanteSelected().razon_social);
            self.Comprobante.Monto(self.modelParent.ComprobanteSelected().monto);
            self.Comprobante.idTipoPago(self.modelParent.ComprobanteSelected().id_tipo_pago);
            self.Comprobante.CodArchivo(self.modelParent.ComprobanteSelected().cod_archivo);
            self.Comprobante.CodComprobanteFirmado(self.modelParent.ComprobanteSelected().cod_comprobante_firmado);
            self.Comprobante.TipoHoja(self.modelParent.ComprobanteSelected().tipo_hoja_tramite);
            self.Comprobante.ExpedienteSitradoc(self.modelParent.ComprobanteSelected().expediente_sitradoc);
            self.file3.fnSetIdArchivo(self.Comprobante.CodArchivo(), true);
            self.file4.fnSetIdArchivo(self.Comprobante.CodComprobanteFirmado(), true);

            self.modelParent.FiltroAdjunto.idExpSitradoc = self.modelParent.ComprobanteSelected().expediente_sitradoc;
            self.modelParent.FiltroAdjunto.tipoHoja = self.modelParent.ComprobanteSelected().tipo_hoja_tramite;
            
            self.GridDetalle.GetData(ko.mapping.toJS(self.modelParent.FiltroAdjunto));
            
            if (self.modelParent.ModoRegistro() === "C") {
                $("#div_agregar_concepto2").css("visibility", "hidden");
            }
            else {
               $("#div_agregar_concepto2").css("visibility", "visible");
            }

            $("#modalComprobanteDescargaAdjuntos").modal("show");
        }

        self.DescargarAdjuntos = function () {
            //alert("excel");

            var archivos = [];
            var checkBoxes = document.getElementById("chkArchivo").getElementsByTagName("input");
            for (var i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].type == "checkbox") {
                    if (checkBoxes[i].checked) {
                        archivos.push(checkBoxes[i].value);
                    }
                }
            }

            var filter = {
                //NombreReporte: "Busqueda_Comprobantes",
                //Rdl: opc == 1 ? "ComprobantesBusquedaGeneral" : "ComprobantesFlujo",
                //Formato: "XLSX",
                //Parametros: {
                //    ID_COMPROBANTE_PAGO: self.modelParent.Filtro.NroComprobante() === null ? -1 : self.modelParent.Filtro.NroComprobante(),
                //    FECHA_INICIO: self.modelParent.Filtro.FechaInicio() === "" ? "01/01/1900" : self.modelParent.Filtro.FechaInicio(),
                //    FECHA_FIN: self.modelParent.Filtro.FechaFin() === "" ? "01/01/1900" : self.modelParent.Filtro.FechaFin(),
                //    NRO_SIAF: self.modelParent.Filtro.NroSIAF() === null ? -1 : self.modelParent.Filtro.NroSIAF(),
                //    NRO_OS: self.modelParent.Filtro.NroOS() === null ? -1 : self.modelParent.Filtro.NroOS(),
                //    NRO_OC: self.modelParent.Filtro.NroOC() === null ? -1 : self.modelParent.Filtro.NroOC(),
                //    NRO_DO: self.modelParent.Filtro.NroDO() === null ? -1 : self.modelParent.Filtro.NroDO(),
                //    NRO_CP: self.modelParent.Filtro.NroCP() === null ? -1 : self.modelParent.Filtro.NroCP(),
                //    ESTADO: self.modelParent.Filtro.Estado() === null ? -1 : self.modelParent.Filtro.Estado(),
                //    RAZON_SOCIAL: self.modelParent.Filtro.RazonSocial() === null ? -1 : self.modelParent.Filtro.RazonSocial()
                //}
                ArchivosAdjuntos: archivos
            };

            $().DownloadManager(ns.URL + '/Comprobante/DescargarAdjuntos', filter);
        };

        //self.DescargarAdjuntos2 = function () {

        //    var valid = self.ValidarArchivos();

        //    if (valid) {

                
        //        //var checkBoxes = document.getElementById("chkArchivo").getElementsByTagName("input");
        //        //for (var i = 0; i < checkBoxes.length; i++) {
        //        //    if (checkBoxes[i].type == "checkbox") {
        //        //        if (checkBoxes[i].checked) {
        //        //            ListaArchivos.push();
        //        //        }
        //        //    }
        //        //}

        //        var comprobanteDet = ko.mapping.toJS(self.modelParent.FiltroDet);

        //        var url = "/Comprobante/DescargarAdjuntos";

        //        ko.Confirm({ message: "<b>Está seguro de realizar la desacarga?</b>" },
        //            function () {
        //                ajaxService.Post(ns.URL + url, comprobanteDet
        //                    , function (response) {
        //                        if (response.Success) {
        //                            alertService.displaySuccessNotification("Se han guardado los datos satisfactoriamente.");
        //                            $("#modalComprobanteDescargaAdjuntos").modal("hide");
        //                            self.modelParent.Buscar();
        //                        } else {
        //                            alertService.displayWarningNotification(response.Messages);
        //                        }
        //                    },
        //                    function (d) {
        //                        alertService.displayErrorNotification(d);

        //                    });
        //            });
        //    }
        //};

        //self.ValidarArchivos = function () {
        //    var message = [];
        //    var total = 0;

            

        //    if (message.length > 0) {
        //        alertService.displayWarningNotification({ Messages: message });
        //        return false;
        //    }

        //    return true;
        //}
        
        //EVENTOS
        
    }
    return {
        viewModel: viewModel,
        /*
        ,template: ``
        */
    };
});
