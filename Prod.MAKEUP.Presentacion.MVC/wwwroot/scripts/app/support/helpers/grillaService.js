define(["jquery", "knockout", "ajaxService", "alertService"], function ($, ko, ajaxService, alertService) {
    "use strict";

    function grillaService(rutaBusqueda, pageSize, page, paramsExtra, funcion, ajaxStop, autoLoad, fnPostLoadPage) {
        var self = this;
        self.rutaBusqueda = rutaBusqueda;
        self.pageSize = ko.observable(pageSize);
        self.page = ko.observable(page);
        self.paramsExtra = paramsExtra;
        self.paramsRequest = $.extend({}, { Page: self.page(), PageSize: self.pageSize() }, self.paramsExtra);
        self.Result = ko.mapping.fromJS({});
        self.Data = ko.mapping.fromJS([]);
        self.TotalPages = ko.observable(0);
        self.TotalRows = ko.observable(0);
        self.TotalRowsView = ko.observable(0);
        self.AjaxStop = ajaxStop ? ko.observable(ajaxStop) : ko.observable(false);
        self.paginatorDe = ko.observable(0);
        self.paginatorHasta = ko.observable(0);

        //funcion Post carga de una pagina
        self.fnPostLoadPage = fnPostLoadPage;

        self.GetData = function (parametrosExtra, fnPostLoad) {
            if (parametrosExtra != undefined && parametrosExtra != null)
                self.paramsRequest = $.extend({}, self.paramsRequest, parametrosExtra);

            if (self.AjaxStop()) {
                self.AjaxStop = ko.observable(!ajaxStop);
                return;
            }

            self.paramsRequest.PageSize = (self.pageSize() != self.paramsRequest.PageSize ? self.pageSize() : self.paramsRequest.PageSize);

            ajaxService.GetWithData(this.rutaBusqueda, this.paramsRequest, function (result) {
                ko.mapping.fromJS(result.Data, self.Data);
                ko.mapping.fromJS(result, self.Result);

                self.TotalRows(result.TotalRows);
                var totalPages = Math.ceil(result.TotalRows / self.pageSize());
                self.TotalPages(totalPages);
                self.CountRows();

                if (fnPostLoad != undefined && fnPostLoad != null) {
                    fnPostLoad(result);
                }
                if (self.fnPostLoadPage != undefined && self.fnPostLoadPage != null) {
                    self.fnPostLoadPage(result);
                }
            }, function (err) {
                alertService.displayErrorNotification(err.statusText);
            });
        };

        self.NextPage = function () {
            if ((self.page() + 1) <= self.TotalPages()) {
                self.page(self.page() + 1);
                self.paramsRequest.Page = (self.page());
                self.paramsRequest.PageSize = (self.pageSize() != self.paramsRequest.PageSize ? self.pageSize() : self.paramsRequest.PageSize);

                ajaxService.GetWithData(self.rutaBusqueda, self.paramsRequest, function (result) {
                    ko.mapping.fromJS(result.Data, self.Data);
                    self.CountRows();
                    if (self.fnPostLoadPage != undefined && self.fnPostLoadPage != null) {
                        self.fnPostLoadPage(result);
                    }
                });
            }
        };
        self.BeforePage = function () {
            if ((self.page() - 1) >= 1) {
                self.page(self.page() - 1);
                self.paramsRequest.Page = (self.page());
                self.paramsRequest.PageSize = (self.pageSize() != self.paramsRequest.PageSize ? self.pageSize() : self.paramsRequest.PageSize);

                ajaxService.GetWithData(self.rutaBusqueda, self.paramsRequest, function (result) {
                    ko.mapping.fromJS(result.Data, self.Data);
                    self.CountRows();
                    if (self.fnPostLoadPage != undefined && self.fnPostLoadPage != null) {
                        self.fnPostLoadPage(result);
                    }
                });
            }
        };
        self.FirstPage = function () {
            self.page(1);
            self.paramsRequest.Page = (1);
            ajaxService.GetWithData(self.rutaBusqueda, self.paramsRequest, function (result) {
                ko.mapping.fromJS(result.Data, self.Data);
                self.CountRows();
                if (self.fnPostLoadPage != undefined && self.fnPostLoadPage != null) {
                    self.fnPostLoadPage(result);
                }
            });
        };
        self.LastPage = function () {
            self.page(self.TotalPages());
            self.paramsRequest.Page = (self.TotalPages());
            ajaxService.GetWithData(self.rutaBusqueda, self.paramsRequest, function (result) {
                ko.mapping.fromJS(result.Data, self.Data);
                self.CountRows();
                if (self.fnPostLoadPage != undefined && self.fnPostLoadPage != null) {
                    self.fnPostLoadPage(result);
                }
            });
        };

        self.CountRows = function () {
            var count = self.page() * self.pageSize();
            if (count <= self.TotalRows()) {
                self.TotalRowsView(count);
            } else {
                self.TotalRowsView(self.TotalRows());
            }

            //preparando valores para paginado
            if (self.Data() === null) { return; }
            self.paginatorHasta(((self.pageSize() * self.page()) > self.TotalRowsView()) ? self.TotalRowsView() : (self.pageSize() * self.page()));
            if (self.Data().length < self.pageSize()) {
                self.paginatorDe((self.TotalRowsView() <= self.pageSize()) ? 1 : (self.paginatorHasta() - (self.Data().length - 1)));
            } else {
                self.paginatorDe((self.TotalRowsView() <= self.pageSize()) ? 1 : (self.paginatorHasta() - (self.pageSize() - 1)));
            }
        }

        self.fnLimpiar = function () {
            self.page(1);
            self.TotalPages(0);
            self.TotalRows(0);
            self.TotalRowsView(0);
            self.paramsRequest.Page = (1);
            self.Result = ko.mapping.fromJS({});
            if (self.Data())
                self.Data.removeAll();
            self.paginatorDe(0);
            self.paginatorHasta(0);
        }

        if (autoLoad || autoLoad == undefined) {
            self.GetData(paramsExtra, funcion); // obtenemos data
        }
    }

    return grillaService;
});