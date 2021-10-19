define(["jquery", "ajaxService"], function ($, ajaxService) {
    "use strict";

    //rutaBase = root de la app que aloja el archivoController
    function fileService(rutaBase, paramsExtra) {
        var self = this;
        self.rutaBase = rutaBase;
        self.idArchivo = ko.observable('');
        self.paramsExtra = paramsExtra;
        self.paramsRequest = $.extend({}, { id: self.idArchivo() }, self.paramsExtra);
        self.Result = ko.mapping.fromJS({});
        self.Data = ko.mapping.fromJS([]);

        /*Funciones de negocio*/
        self.GetFileSettings = function (fnCallback) {          
            ajaxService.Post(this.rutaBase + '/archivo/settings', null,
                function (result) {
                    fnCallback(result);
                }, noToken = true);
        }

        self.GetFileInfo = function (parametrosExtra, fnCallbackSuccess, fnCallbackError) {
            if (parametrosExtra != undefined && parametrosExtra != null)
                self.paramsRequest = $.extend({}, self.paramsExtra, parametrosExtra);
            ajaxService.Post(this.rutaBase + '/archivo/fileInfo', this.paramsRequest,
                function (result) {
                    fnCallbackSuccess(result);
                },
                function (errorData) {
                    if ((fnCallbackError != undefined) && (typeof fnCallbackError == 'function')) {
                        fnCallbackError(errorData);
                    } else {
                        var errorStruct = {
                            Success: false,
                            Data: null,
                            Value: null,
                            Messages: ["Error: " + errorData.status + " - " + errorData.statusText]
                        };
                        ko.mapping.fromJS(errorStruct, self.Result);
                    }
                }, true);
        }

        self.UploadFile = function (formData, successCallback, errorCallback) {

            ajaxService.PostFile(this.rutaBase + '/archivo/upload', formData,
                function (d) {
                    successCallback(d);
                },
                function (d) {
                    if ((errorCallback != undefined) && (typeof errorCallback == 'function')) {
                        errorCallback(d);
                    }
                    /*var errorTitle = "Error in UploadFile";
                    var fullError = JSON.stringify(d);
                    console.log(errorTitle);
                    console.log(fullError);*/
                });
        }

        self.DownloadFile = function (parametrosExtra) {
            if (parametrosExtra != undefined && parametrosExtra != null) {
                self.paramsRequest = $.extend({}, self.paramsExtra, parametrosExtra);
            }

            var a = document.createElement('A');
            var req = {
                id: parametrosExtra.id,
                version: parametrosExtra.version,
                BuscarBorrador: (parametrosExtra.BuscarBorrador === true)
            };
            a.href = this.rutaBase + '/archivo/download?' + ko.ObjToQS(req, true);
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        self.DeleteFile = function (parametrosExtra, fnCallbackSuccess, fnCallbackError) {
            if (parametrosExtra != undefined && parametrosExtra != null)
                self.paramsRequest = $.extend({}, self.paramsExtra, parametrosExtra);

            ajaxService.Post(this.rutaBase + '/archivo/delete', this.paramsRequest,
                function (result) {
                    fnCallbackSuccess(result);
                },
                function (errorData) {
                    if ((fnCallbackError != undefined) && (typeof fnCallbackError == 'function')) {
                        fnCallbackError(errorData);
                    } else {
                        var errorStruct = {
                            Success: false,
                            Data: null,
                            Value: null,
                            Messages: ["Error: " + errorData.status + " - " + errorData.statusText]
                        };
                        ko.mapping.fromJS(errorStruct, self.Result);
                    }
                }, true);
        }

        self.DeleteDraft = function (parametrosExtra, fnCallbackSuccess) {
            if (parametrosExtra != undefined && parametrosExtra != null)
                self.paramsRequest = $.extend({}, self.paramsExtra, parametrosExtra);

            ajaxService.Post(this.rutaBase + '/archivo/deleteDraft', this.paramsRequest,
                function (result) {
                    fnCallbackSuccess(result);
                },
                function (errorData) {
                    var errorStruct = {
                        Success: false,
                        Data: null,
                        Value: null,
                        Messages: ["Error: " + errorData.status + " - " + errorData.statusText]
                    };
                    ko.mapping.fromJS(errorStruct, self.Result);

                }, true);
        }

        self.GetFileHistory = function (parametrosExtra, fnCallbackSuccess, fnCallbackError) {
            if (parametrosExtra != undefined && parametrosExtra != null)
                self.paramsRequest = $.extend({}, self.paramsExtra, parametrosExtra);

            ajaxService.Post(this.rutaBase + '/archivo/getFileHistory', this.paramsRequest,
                function (result) {
                    fnCallbackSuccess(result);
                },
                function (errorData) {
                    if ((fnCallbackError != undefined) && (typeof fnCallbackError == 'function')) {
                        fnCallbackError(errorData);
                    } else {
                        var errorStruct = {
                            Success: false,
                            Data: null,
                            Value: null,
                            Messages: ["Error: " + errorData.status + " - " + errorData.statusText]
                        };
                        ko.mapping.fromJS(errorStruct, self.Result);
                    }
                }, true);
        }
    }

    return fileService;
});