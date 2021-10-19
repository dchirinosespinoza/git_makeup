define(["jquery"], function ($) {
    "use strict";

    function ajaxOn(options, successCallback, errorCallback) {
        
        var ct = options.contentType;
        if (ct == null) {
            ct = "application/x-www-form-urlencoded; charset=UTF-8";
        }

        $.ajax({
            url: options.url,
            type: options.method,
            data: options.data,
            contentType: ct,
            cache: false,
            success: function (d) {
                successCallback($().ParseResponse(d));
            },
            error: function (d) {
                if ((errorCallback !== undefined) && (typeof errorCallback === 'function')) {
                    errorCallback(
                        {
                            status: d.status,
                            statusText: d.statusText,
                            responseJSON: d.responseJSON,
                            responseText: d.responseText
                        }
                    );

                } else {
                    var errorTitle = "Error in (" + options.url + ")";
                    var fullError = JSON.stringify(d);
                    console.log(errorTitle);
                    console.log(fullError);
                    //window.location.reload();

                }

            }
        });
    };

    function ajaxService() {
        var self = this;
    }

    ajaxService.prototype.Get = function (url, successCallback, errorCallback, noToken) {

        noToken = (noToken === null || noToken === undefined) ? false : noToken;

        if ($().ExistsToken() && noToken === false) {
            setTimeout(function () {
                ajaxOn(
                    {
                        url: url,
                        method: 'GET',
                        data: {},
                        contentType: "application/json; charset=utf-8"
                    }, successCallback, errorCallback);
            }, (window.$TokenKey == null ? 1000 : 0));
        } else {
            ajaxOn(
                {
                    url: url,
                    method: 'GET',
                    data: {},
                    contentType: null
                }, successCallback, errorCallback);
        }


    };
    ajaxService.prototype.Post = function (url, data, successCallback, errorCallback, noToken) {
        
        data = (data === null || data === undefined) ? {} : data;
        noToken = (noToken === null || noToken === undefined) ? false : noToken;

        if ($().ExistsToken() && noToken === false) {
            setTimeout(function () {
                var tk = window.$TokenKey;
                if (tk != null) {
                    if ((tk.IsSecure) && (tk.Token != null)) {
                        var pp = JSON.stringify(data);
                        data = $().EncodeData(pp, tk.Token);
                    }
                }
                ajaxOn(
                    {
                        url: url,
                        method: 'POST',
                        data: data,
                        contentType: "application/json; charset=utf-8"
                    }, successCallback, errorCallback);

            }, (window.$TokenKey == null ? 1000 : 0));
        } else {
            ajaxOn(
                {
                    url: url,
                    method: 'POST',
                    data: data,
                    contentType: null
                }, successCallback, errorCallback);
        }
    };
    ajaxService.prototype.GetWithData = function (url, data, successCallback, errorCallback, noToken) {
        
        data = (data === null || data === undefined) ? {} : data;
        noToken = (noToken === null || noToken === undefined) ? false : noToken;

        if ($().ExistsToken() && noToken === false) {
            setTimeout(function () {
                var tk = window.$TokenKey;
                if (tk != null) {
                    if ((tk.IsSecure) && (tk.Token != null)) {
                        var pp = JSON.stringify(data);
                        var ndata = $().EncodeData(pp, tk.Token);

                        url = url + "?var=" + ndata;
                        data = {};
                    }
                }
                ajaxOn(
                    {
                        url: url,
                        method: 'GET',
                        data: data,
                        contentType: "application/json; charset=utf-8"
                    },
                    successCallback, errorCallback);
            }, (window.$TokenKey == null ? 1000 : 0));
        } else {
            ajaxOn(
                {
                    url: url,
                    method: 'GET',
                    data: data,
                    contentType: null
                },
                successCallback, errorCallback);
        }
    };
    ajaxService.prototype.CachedScript = function (url, options) {
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return $.ajax(options);
    };

    ajaxService.prototype.PostFile = function (url, data, successCallback, errorCallback) {
        data = (data === null || data === undefined) ? {} : data;

        $.ajax({
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            url: url,
            type: 'POST',
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            success: function (d) {
                successCallback($().ParseResponse(d));
            },
            error: function (d) {
                if ((errorCallback !== undefined) && (typeof errorCallback === 'function')) {
                    errorCallback(
                        {
                            status: d.status,
                            statusText: d.statusText,
                            responseJSON: d.responseJSON,
                            responseText: d.responseText
                        }
                    );
                } else {
                    var errorTitle = "Error in (" + options.url + ")";
                    var fullError = JSON.stringify(d);
                    console.log(errorTitle);
                    console.log(fullError);
                    //window.location.reload();
                }
            }
        });
    };

    ajaxService.prototype.GetBoot = function (url, successCallback, errorCallback) {
        ajaxOn(
            {
                url: url,
                method: 'GET',
                data: {},
            }, function (d) {
                successCallback($().ParseResponse(d));
            }, errorCallback);
    };
    
    var service = new ajaxService();
    return service;
});