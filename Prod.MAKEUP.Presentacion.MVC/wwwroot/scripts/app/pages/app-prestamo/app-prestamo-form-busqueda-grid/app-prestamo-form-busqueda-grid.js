define(['knockout', "ns", 'alertService', 'grillaService', 'ajaxService'], function (ko, ns, alertService, grillaService, ajaxService) {
    function viewModel(params) {

        var self = this;

        //VARIABLES
        self.ns = ns;
        self.modelParent = params.modelParent;
        self.pageSizeLength = [{ Value: 10, Text: "10" }, { Value: 25, Text: "25" }, { Value: 50, Text: "50" }, { Value: 100, Text: "100" }];
        self.Grid = new grillaService(ns.URL + '/Prestamo/getPrestamos', 10, 1);
        //console.log(console.log(self.Grid));
        self.opt = ko.observable(null);

        self.PrestamoDefault = function () {
            var prestamo = {
                id: 0,
                idComprobantePago: 0,
                FechaPrestamo: null,
                FechaDevolucion: null,
                UsuarioPrestamo: null,
                UsuarioPrestamoCodigo: 0,
                idEstadoPrestamo: 0,
                DiasPrestamo: 0,
                CodigoDependencia: 0,
                Opc: null,
                NroCP: null,
                Anio: null,
                DocumentoPrestamo: null
            }
            return prestamo;
        }
        self.Prestamo = ko.mapping.fromJS(self.PrestamoDefault());

        self.IdComprobanteSeleccionado = ko.observable("");

        //FUNCIONES
        self.modelParent.Buscar = function () {       
            self.Grid.GetData(ko.mapping.toJS(self.modelParent.Filtro));
            /*
            self.Grid.GetData({
                request: ko.mapping.toJS(self.modelParent.Filtro)
            });
            */
        };
        self.Editar = function (item) {
            self.modelParent.PrestamoSelected(ko.mapping.toJS(item));
            self.modelParent.ModoRegistro("M");
            $("#modalRegistrarPrestamo").modal("show");
        };

        self.Consultar = function (item) {
            self.modelParent.PrestamoSelected(ko.mapping.toJS(item));
            self.modelParent.ModoRegistro("C");
            $("#modalRegistrarPrestamo").modal("show");
        };
        
        self.Radio = function (item, event) {
            self.modelParent.PrestamoSelected(ko.mapping.toJS(item));
            self.modelParent.IdComprobanteSeleccionado = item.id_comprobante_pago();
            self.IdComprobanteSeleccionado(item.id_comprobante_pago());
            if (event.target.value === self.opt()) {
                self.opt(null);
                event.target.checked = false;
            }
            return true;
        };

        self.Exportar = function () {  
            //alert("excel");
            var filter = {
                NombreReporte: "Busqueda_Prestamos",
                Rdl: "PrestamosBusquedaGeneral",
                Formato: "XLSX",
                Parametros: {
                    ID_PRESTAMO_COMPROBANTE_PAGO: -1,
                    ID_COMPROBANTE_PAGO: self.modelParent.Filtro.NroComprobante() === null ? -1 : self.modelParent.Filtro.NroComprobante(),
                    FECHA_INICIO: self.modelParent.Filtro.FechaInicio() === "" ? "01/01/1900" : self.modelParent.Filtro.FechaInicio(),
                    FECHA_FIN: self.modelParent.Filtro.FechaFin() === "" ? "01/01/1900" : self.modelParent.Filtro.FechaFin(),
                    USUARIO_PRESTAMO: self.modelParent.Filtro.Usuario() === null ? -1 : self.modelParent.Filtro.Usuario(),
                    NRO_CP: self.modelParent.Filtro.NroCP() === null ? -1 : self.modelParent.Filtro.NroCP(),
                    ID_ESTADO_PRESTAMO: self.modelParent.Filtro.idEstadoPrestamo() === null ? -1 : self.modelParent.Filtro.idEstadoPrestamo()
                }

            };

            $().DownloadManager(ns.URL + '/Prestamo/Exportar', filter);
        };
                
        self.AnularPrestamo = function () {
            if (self.IdComprobanteSeleccionado() == "") {
                alert("Debe Seleccionar un registro")
            } else {
                self.Prestamo.id(self.modelParent.PrestamoSelected().id_prestamo_comprobante_pago);
                self.Prestamo.idComprobantePago(self.modelParent.PrestamoSelected().id_comprobante_pago);
                self.Prestamo.FechaPrestamo(self.modelParent.PrestamoSelected().fecha_prestamo_str);
                self.Prestamo.FechaDevolucion(self.modelParent.PrestamoSelected().fecha_devolucion_str);
                self.Prestamo.UsuarioPrestamo(self.modelParent.PrestamoSelected().usuario_prestamo);
                self.Prestamo.UsuarioPrestamoCodigo(self.modelParent.PrestamoSelected().usuario_prestamo_codigo);
                self.Prestamo.idEstadoPrestamo(self.modelParent.PrestamoSelected().id_estado_prestamo);
                self.Prestamo.DiasPrestamo(self.modelParent.PrestamoSelected().dias_prestamo);
                self.Prestamo.CodigoDependencia(self.modelParent.PrestamoSelected().codigo_dependencia);
                self.Prestamo.NroCP(self.modelParent.PrestamoSelected().numero_comprobante_pago);
                self.Prestamo.Anio(self.modelParent.PrestamoSelected().anio);
                self.Prestamo.Opc = '2';

                var prestamo = ko.mapping.toJS(self.Prestamo);

                var url = "/Prestamo/Actualizar";

                ko.Confirm({ message: "<b>Está seguro de anular el prestamo?</b>" },
                    function () {
                        ajaxService.Post(ns.URL + url, prestamo
                            , function (response) {
                                if (response.Success) {
                                    alertService.displaySuccessNotification("Se anulo el prestamo satisfactoriamente.");
                                    self.modelParent.Buscar();
                                } else {
                                    alertService.displayWarningNotification(response.Messages);
                                }
                            },
                            function (d) {
                                alertService.displayErrorNotification(d);

                            });
                    });
            }
        };        

    }
    return {
        viewModel: viewModel,
        /*
        ,template: ``
        */
    };
});
