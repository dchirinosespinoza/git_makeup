define(["jquery", "knockout", "ns", "ajaxService"], function ($, ko, ns, ajaxService) {
    "use strict";

    var Modelo = function () {

        //VARIABLES
        var self = this;
                                
        self.Init = function () {
                                   
        }

        //EVENTOS

        //INICIO
        self.Init();

    }
    
    ko.applyBindingsCustom(new Modelo(), ns.CONTAINER);
}
);
