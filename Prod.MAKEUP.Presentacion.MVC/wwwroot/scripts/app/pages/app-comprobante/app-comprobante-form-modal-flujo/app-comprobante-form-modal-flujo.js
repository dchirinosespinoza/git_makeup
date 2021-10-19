define(['jquery', 'knockout', "ns", 'ajaxService', 'alertService', "enumerado", 'domReady', 'grillaService'], function ($, ko, ns, ajaxService, alertService, enumerado, domReady, grillaService) {
    $(document).ready(function () {

        $('#modalComprobanteFlujo').on('show.bs.modal', function (e) {
                        
            var self = ko.dataFor(this);    
            
        });

        $('#modalComprobanteFlujo').on('shown.bs.modal', function (e) {

            var self = ko.dataFor(this);

            if (self.modelParent.ModoRegistro() === "C") {                
                self.titulo("Flujo Comprobante");                
            } else {
                self.titulo("Flujo Comprobante");
            }
            self.MostrarFlujo();
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

        self.GridDetalle = new grillaService(ns.URL + '/Comprobante/getFlujoComprobantes', 10, 1);

        self.titulo = ko.observable("");
        self.ModoRegistro = ko.dataFor(self.modelParent.ModoRegistro());
        
        //FUNCIONES
        self.MostrarFlujo = function () {
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

            self.modelParent.FiltroDet.idComprobantePago = self.modelParent.ComprobanteSelected().id_comprobante_pago;
            
            self.GridDetalle.GetData(ko.mapping.toJS(self.modelParent.FiltroDet));
            //self.modelParent.FiltroDet.monto(0);
            //self.modelParent.FiltroDet.idConceptoPago(null);
            //self.modelParent.FiltroDet.desConceptoPago = "";
            //self.GridDetalle = new grillaService(ns.URL + '/Comprobante/getDetalleComprobantes', 10, 1);

            if (self.modelParent.ModoRegistro() === "C") {
                $("#div_agregar_concepto2").css("visibility", "hidden");
            }
            else {
               $("#div_agregar_concepto2").css("visibility", "visible");
            }

            $("#modalComprobanteFlujo").modal("show");
        }
        
        //EVENTOS
        
    }
    return {
        viewModel: viewModel,
        /*
        ,template: ``
        */
    };
});
