/******************************
 NO Minificar este archivo
 ******************************/
var reqMain = require.config({
    context: 'context',
    baseUrl: '/scripts/app/',
    urlArgs: '',
    waitSeconds: 0,

    paths: {
        "jquery": "support/lib/jquery/dist/jquery",
        "jquery-validation": "support/lib/jQuery-Validation-Engine/js/jquery.validationEngine",
        "jquery-validation-es": "support/lib/jQuery-Validation-Engine/js/languages/jquery.validationEngine-es",
        "validationEngineRules": "support/helpers/validationEngineRules",
        "blockUI": "support/lib/blockui/jquery.blockUI",

        "jquery-ui":"support/lib/jquery-ui/ui/jquery-ui",
        "knockout": "support/lib/knockout/dist/knockout",
        "knockout-mapping": "support/lib/knockout-mapping/knockout.mapping",
        "knockstrap": "support/lib/knockstrap/build/knockstrap.min",

        "bootstrap": "support/lib/bootstrap/dist/js/bootstrap",
        "Swal": "support/lib/sweetalert2/dist/sweetalert2.all.min",
        "fileupload": "support/lib/knockout-file-bindings/knockout-file-bindings",
        "pnotify": "support/lib/pnotify/dist/pnotify.min",
        "moment": "support/lib/moment/moment",
        "momentEs": "support/lib/moment/locale/es",
        "domReady": "support/lib/domReady/domReady",

        //Helpers
        "utils": "support/helpers/utils",
        "aes": "support/helpers/aes",
        "ajaxService": "support/helpers/ajaxService",
        "alertService": "support/helpers/alertService",       
        "grillaService": "support/helpers/grillaService",
        "fileService": "support/helpers/fileService",
        "datetimepicker": "support/lib/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker",
        "bootbox": "support/lib/bootbox.js/bootbox",
        "holder": "support/lib/holderjs/holder",
        "scrolling-tabs": "support/lib/jquery-bootstrap-scrolling-tabs/dist/jquery.scrolling-tabs",
        //Services
        "enumerado": "support/helpers/enumerado",
        
    },
    shim: {
        "jquery-validation": { deps: ["jquery"] },
        "jquery-validation-es": { deps: ["jquery", "jquery-validation"] },
        "validationEngineRules": { deps: ["jquery", "jquery-validation", "jquery-validation-es"] },
        "blockUI": { deps: ["jquery"] },

        "bootstrap": { deps: ["jquery"] },
        "pnotify": { deps: ["jquery"] },
        "momentEs": { deps: ["moment"] },

        //************Helpers**************
        //--begin
        "utils": { deps: ["jquery", "knockout", "moment", "aes"] },
        "ajaxService": { deps: ["jquery", "utils"] },
        "alertService": { deps: ["jquery"] },
        "fileupload": { deps: ["jquery", "knockout", "bootstrap"] },
        "grillaService": { deps: ["jquery", "ajaxService", "alertService"] },
        "fileService": { deps: ["jquery"] },
        "knockout-mapping": { deps: ["knockout"] },
        "knockstrap": { deps: ["knockout", "jquery", "bootstrap"] },
        "datetimepicker": { deps: ["jquery", "knockout", "moment", "momentEs"] },
        "bootbox": { deps: ["jquery"] },
        "holder": { deps: ["jquery", "bootstrap"] },
        "scrolling-tabs": { deps: ["jquery", "bootstrap"] },
        //--end
        //**********Services***************
        //--begin
        "pepefexService": { deps: ["jquery"] }
        //--end
    },
    deps: ["knockout", "knockout-mapping", "bootstrap", "knockstrap", "blockUI"],
    callback: function (ko, mapping) {
        $.blockUI.defaults.message = '<img src="http://127.0.0.1:30500/images/loading.gif">';

        $.blockUI.defaults.baseZ = 2000;
        $.blockUI.defaults.css.border = 'none';
        $.blockUI.defaults.css.padding = '5px';
        $.blockUI.defaults.css.backgroundColor = '#000';
        $.blockUI.defaults.css.cursor = 'default';
        $.blockUI.defaults.css['-webkit-border-radius'] = '10px';
        $.blockUI.defaults.css['-moz-border-radius'] = '10px';
        $.blockUI.defaults.css.opacity = .5;
        $.blockUI.defaults.css.color = '#fff';
        $.blockUI.defaults.overlayCSS.backgroundColor = '#000';
        $.blockUI.defaults.overlayCSS.opacity = 0.8;
        $.blockUI.defaults.overlayCSS.cursor = 'default';

        $.blockUI();

        ko.mapping = mapping;
    }

});
requirejs.onError = function (err) {
    console.log(err.requireModules);
    var isClosed = $(".blockOverlay");
    if (isClosed.length === 1) {
        $.unblockUI();
    }
    throw err;
};
function reqMainBoot() {
    var ctxName = 'reqMain'.replace('req', '');
    var ele = document.getElementById(ctxName);
    if (ele !== null) {
        ko.cleanNode(ele);
    }
    var context = requirejs.s.contexts[ctxName];

    if (context !== undefined) {

        for (var key in context.defined) {
            if (context.defined.hasOwnProperty(key)) {
                reqMain.undef(key);
            }
        };
    }
};
var AjaxGlobalHandler = {
    Initiate: function (options) {
        $.ajaxSetup(
            {
                cache: false,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );

        $(document).ajaxStart(function () {
            $.blockUI();
        }).ajaxSend(function (e, xhr, opts) {
        }).ajaxError(function (e, xhr, opts) {
            $.unblockUI();
        }).ajaxSuccess(function (e, xhr, opts) {
        }).ajaxComplete(function (e, xhr, opts) {
        }).ajaxStop(function () {
            $.unblockUI();
        });
    }
};