define(["knockout", "ns", "utils"], function (ko, ns) {
    "use strict";

    //var urlBase = requirejs.s.contexts._.config.baseUrl + ns.COMPONENTS;
    var urlBase = ns.COMPONENTS;

    var register = function (name, folder) {
        folder = (folder === null || folder === undefined) ? '' : folder;
        var fileWithOutExtension = urlBase + folder + name + '/' + name;
        ko.RegisterComponent(name, fileWithOutExtension);
    };
    var registerComponent = function (name) { register(name); };
    //Components
    registerComponent("app-paginator");
    registerComponent("app-combo");  
    registerComponent("app-file-inline");
    registerComponent("app-pepefex");   
});