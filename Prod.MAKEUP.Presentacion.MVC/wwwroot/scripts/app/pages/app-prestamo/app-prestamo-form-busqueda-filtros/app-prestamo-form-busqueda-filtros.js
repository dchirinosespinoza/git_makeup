define(["jquery", 'knockout', "ns", 'ajaxService', 'alertService', "domReady"], function ($, ko, ns, ajaxService, alertService, domReady) {
    $(document).ready(function () {
        $("#txtDetalleFiltro").Alfanumerico();

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
                Usuario: null,
                EstadoPrestamo: null,
                idEstadoPrestamo: null,
                CodigoDependencia: null,
                NroCP: null
                //PageSize: self.Grid.pageSize()
            }, self.modelParent.Filtro);
            self.modelParent.Buscar();            
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
