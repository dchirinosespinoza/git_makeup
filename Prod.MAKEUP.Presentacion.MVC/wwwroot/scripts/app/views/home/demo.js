define(["jquery", "knockout", "ns", "model", "ajaxService", "pepefexService", "enumerado"], function ($, ko, ns, model, ajaxService, pepefexService, enumerado) {
    "use strict";
    console.log(ns);
    console.log(model);
    console.log(enumerado.TIPOS);

    var Modelo = function () {
        var self = this;

        self.model =
            {
                CodigoArchivo: ko.observable('archivoXXX')
            };

        self.idArchivo = ko.observable(null);

        self.GetData = function () {
            var rrr = pepefexService.Parse("Holaaaaaaaaaaaaaaaaaa");
            //ajaxService.Get(ns.URL + '/Home/GetData',function(r)
            //{

            //    console.log(r);
            //}
            //);
            console.log(rrr);

        };

        self.fnCargaArchivoExito = function (o) {
            if (o.Data !== null) {
                self.idArchivo(o.Data.id);
                console.log(o);
            }
        };

    };

    ko.applyBindingsCustom(new Modelo(), ns.CONTAINER);

}
);
