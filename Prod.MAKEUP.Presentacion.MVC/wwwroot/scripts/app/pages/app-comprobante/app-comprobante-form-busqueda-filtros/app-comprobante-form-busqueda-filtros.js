define(["jquery", 'knockout', "ns", 'ajaxService', 'alertService', "domReady"], function ($, ko, ns, ajaxService, alertService, domReady) {
    $(document).ready(function () {
        $("#txtNroComprobanteFiltro").NumeroEntero();
        $("#txtNroComprobanteFiltro").attr("maxlength", 10);
        $("#txtDetalleFiltro").Alfanumerico();
        $("#txtNroSIAFFiltro").NumeroEntero();
        $("#txtNroSIAFFiltro").attr("maxlength", 10);
        $("#txtNroOCFiltro").NumeroEntero();
        $("#txtNroOCFiltro").attr("maxlength", 10);
        $("#txtNroOSFiltro").NumeroEntero();
        $("#txtNroOSFiltro").attr("maxlength", 10);
        //$("#txtNroDOFiltro").NumeroEntero();
        $("#txtNroDOFiltro").attr("maxlength", 20);
        $("#txtNroCPFiltro").NumeroEntero();
        $("#txtNroCPFiltro").attr("maxlength", 10);
        $("#txtRazonSocialFiltro").attr("maxlength", 100);
    });
    function viewModel(params) {

        var self = this;

        //VARIABLES
        self.ns = ns;
        self.modelParent = params.modelParent;
        
        //FUNCIONES
        self.Reset = function () {
            ko.mapping.fromJS({
                FechaInicio: null,
                FechaFin: null,
                NroComprobante: null,
                NroSIAF: null,
                NroOS: null,
                NroOC: null,
                NroDO: null,
                NroCP: null,
                Estado: null,
                RazonSocial: null
                //PageSize: self.Grid.pageSize()
            }, self.modelParent.Filtro);
            self.modelParent.Buscar();

            ko.mapping.fromJS({
                idComprobantePago: null
            }, self.modelParent.FiltroDet);
        };
        self.Init = function () {

            self.Reset();
        }

        //INICIO
        self.Init();
    }
    return {
        viewModel: viewModel,
        /*
        ,template: ``
        */
    };
});
