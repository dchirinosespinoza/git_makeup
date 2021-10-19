define(['knockout', "ns", "utils"], function (ko, ns) {
    "use strict";

    //var urlBase = requirejs.s.contexts._.config.baseUrl + ns.PAGES;
    var urlBase = ns.PAGES;

    var register = function (name, folder) {
        folder = (folder === null || folder === undefined) ? '' : folder;
        var fileWithOutExtension = urlBase + folder + name + '/' + name;
        ko.RegisterComponent(name, fileWithOutExtension);
    };

    //TODO:COMPROBANTE
    var registrarComprobanteComponents = function (name) { register(name, 'app-comprobante/'); };
    //registrarComprobanteComponents('app-comprobante-form-busqueda');
    registrarComprobanteComponents('app-comprobante-form-busqueda-filtros');
    registrarComprobanteComponents('app-comprobante-form-busqueda-grid');
    registrarComprobanteComponents('app-comprobante-form-modal-registrar');
    registrarComprobanteComponents('app-comprobante-form-modal-flujo');
    registrarComprobanteComponents('app-comprobante-form-modal-descargaradjuntos');
    registrarComprobanteComponents('app-comprobante-form-modal-concepto');

    //TODO:PRESTAMO
    var registrarPrestamoComponents = function (name) { register(name, 'app-prestamo/'); };
    registrarPrestamoComponents('app-prestamo-form-busqueda-filtros');
    registrarPrestamoComponents('app-prestamo-form-busqueda-grid');
    registrarPrestamoComponents('app-prestamo-form-modal-registrar');
    
    //TODO:REPORTES

    //var registrarContainer = function (name) { register(name, 'app-container/'); };          
    //registrarContainer('app-container-reportes');
    
    ////TODO:

    //var registrarModal = function (name) { register(name, 'app-modal/'); };   
    //registrarModal('app-modal-detalle-registro');
    ////TODO:

    //var registrarControlsForm = function (name) { register(name, 'app-form/'); };
    //registrarControlsForm('app-form-persona');
    ////TODO:

    //var registrarControlsGrid = function (name) { register(name, 'app-grid/'); };     
    //registrarControlsGrid('app-grid-registros');   
    //registrarControlsGrid('app-grid-persona');   
    //registrarControlsGrid('app-grid-tupas-resumen');   
    
    

});