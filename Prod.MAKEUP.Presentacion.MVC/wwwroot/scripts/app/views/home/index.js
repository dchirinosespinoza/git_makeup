define(["jquery", "knockout", "ns", 'alertService', 'ajaxService'], function ($, ko, ns, alertService, ajaxService) {
    "use strict";

    var Modelo = function () {
        var self = this;
        

        self.login = function () {
            alert("paso");
            return (false);            
        }
    };
    
    self.Usuario = ko.observable("");
    
    ko.applyBindingsCustom(new Modelo(), ns.CONTAINER);      
    
}
);
