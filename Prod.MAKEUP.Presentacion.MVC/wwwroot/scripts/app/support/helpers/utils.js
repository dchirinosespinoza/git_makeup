define(["require", "jquery", "knockout", "moment", "bootbox", "aes", "scrolling-tabs", "datetimepicker", "alertService"],
    function (require, $, ko, moment, bootbox, aes, scrollingTabs, datetimepicker, alertService) {
    //"use strict";

    /*BEGIN => KO*/
    ko.bindingHandlers.dateFormat = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            var strDate = value === null ? "" : moment(value).format('DD/MM/YYYY h:mm:ss A');
            $(element).text(strDate);
        }
    };
    ko.bindingHandlers.dateFormatShort = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());
            var strDate = value === null ? "" : moment(value).format('DD/MM/YYYY');
            $(element).text(strDate);
        }
    };
    ko.ShowModal = function (identificador, callback) {
        $('#' + identificador).modal('show');
        callback();

        //window.setTimeout(function () {
        //    $('#' + identificador + ' :input,textarea').bind('cut copy paste', function (e) {
        //        e.preventDefault(); //disable cut,copy,paste
        //    });
        //}, 1500);

    }
    ko.HideModal = function (identificador, callback) {
        $('#' + identificador).modal('hide');
        callback();
    };
    ko.bindingHandlers.popover = {

        init: function (element) {
            var $element = $(element);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if ($element.data('bs.popover')) {
                    $element.popover('destroy');
                }
            });
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element = $(element),
                value = ko.unwrap(valueAccessor()),
                options = (!value.options && !value.template ? ko.toJS(value) : ko.toJS(value.options)) || {};

            var popoverData = $element.data('bs.popover');

            if (!popoverData) {
                $element.popover(options);

                $element.on('shown.bs.popover inserted.bs.popover', function () {
                    (options.container ? $(options.container) : $element.parent()).one('click', '[data-dismiss="popover"]', function () {
                        $element.popover('hide');
                    });
                });
            } else {
                ko.utils.extend(popoverData.options, options);
                if (popoverData.options.content) {
                    $element.popover('show');
                } else {
                    $element.popover('hide');
                }
            }
        }
    };
    ko.applyBindingsCustom = function (model, contaiderId) {
        var ele = document.getElementById(contaiderId);
        ko.cleanNode(ele);
        ko.applyBindings(model, ele);

        window.setTimeout(function () {
            $.unblockUI();

            //$('input,textarea').bind('cut copy paste', function (e) {
            //    e.preventDefault(); //disable cut,copy,paste
            //});
        }, 2000);

    };
    ko.components.loaders.unshift({
        loadTemplate: function (name, templateConfig, callback) {
            var fullUrl = templateConfig;
            if (fullUrl) {
                if (templateConfig.fromUrl) {
                    fullUrl = templateConfig.fromUrl;
                }
                $.get(fullUrl, function (data) {
                    ko.components.defaultLoader.loadTemplate(name, ko.utils.parseHtmlFragment(data), callback);
                });
            } else {
                callback(null);
            }

        },
        loadViewModel: function (name, modelConfig, callback) {
            var fullUrl = modelConfig;
            if (fullUrl) {
                if (modelConfig.fromUrl) {
                    fullUrl = modelConfig.fromUrl;
                }
                require([fullUrl], function (config) {
                    ko.components.defaultLoader.loadViewModel(name, config, callback);
                });
            } else {
                callback(null);
            }
        }
    });
    ko.RegisterComponent = function (name, filePathWithoutExtension) {
        if (ko.components.isRegistered(name) === false) {
            ko.components.register(name,
                {
                    template: { fromUrl: filePathWithoutExtension + ".html" },
                    viewModel: { fromUrl: filePathWithoutExtension + ".js" },
                    synchronous: true
                });
        }
    };
    ko.bindingHandlers.dateTimePicker = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $(element).datetimepicker();

            var options = {
                format: 'DD/MM/YYYY'
                , defaultDate: ''
                , locale: 'es'
            };

            if (allBindingsAccessor() !== undefined) {

                if (allBindingsAccessor().beforeOf !== undefined) {
                    options.maxDate = moment(allBindingsAccessor().beforeOf);
                }
                if (allBindingsAccessor().afterOf !== undefined) {
                    options.minDate = moment(allBindingsAccessor().afterOf);
                }
            }

            $(element).data("DateTimePicker").options(options);

            valueAccessor().value(moment(valueAccessor().value(), options.format).format('DD/MM/YYYY') == 'Invalid date' ? '' : moment(valueAccessor().value(), options.format).format('DD/MM/YYYY'));

            $(element).on("dp.hide", function (e) {
                if ($(element).closest('.modal-body').length)
                    $(element).closest('.modal-body')[0].style.cssText = "overflow-y:auto, max-height: calc(100vh - 210px)";
            });

            $(element).on("dp.show", function (e) {
                if ($(element).closest('.modal-body').length)
                    $(element).closest('.modal-body')[0].style.cssText = "overflow-y:unset !important;, max-height: none !important;";
            });

            ////ko.utils.registerEventHandler(element, "dp.change", function (event) {
            $(element).on("dp.change", function (e) {
                var value = valueAccessor().value;
                if (ko.isObservable(value)) {
                    value(moment(e.date).format('DD/MM/YYYY'));
                    if (valueAccessor().maxDate !== undefined) {
                        $("[name='" + valueAccessor().maxDate + "']").data("DateTimePicker").minDate(event.date);
                    }
                    if (valueAccessor().minDate !== undefined) {
                        $("[name='" + valueAccessor().minDate + "']").data("DateTimePicker").maxDate(event.date);
                    }
                }
            });

            //var defaultVal = $(element).val();
            //var value = valueAccessor().value;
            //if (defaultVal !== '') { value(moment(defaultVal, options.format)); }
            //else { value(''); }

            if (valueAccessor().maxDate !== undefined &&
                viewModel[valueAccessor().maxDate]() !== undefined &&
                viewModel[valueAccessor().maxDate]() !== '') {
                $(element).data("DateTimePicker").maxDate(viewModel[valueAccessor().maxDate]());
            }

            if (valueAccessor().minDate !== undefined &&
                viewModel[valueAccessor().minDate]() !== undefined &&
                viewModel[valueAccessor().minDate]() !== '') {
                $(element).data("DateTimePicker").minDate(viewModel[valueAccessor().minDate]());
            }
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var options = {
                format: 'DD/MM/YYYY'
                , defaultDate: ''
                , locale: 'es'
            };

            $(element.children[0]).keypress(function (e) {
                var r = /[0-9]/;
                var keyChar = String.fromCharCode(event.which || event.keyCode);
                if (r.test(keyChar) || keyChar == '/') {
                }
                else {
                    e.preventDefault();
                    return;
                }
                if (e.currentTarget.value.length > 9) {
                    e.preventDefault();
                    return;
                }
            });

            if (valueAccessor().value() != null) {
                if (valueAccessor().value().length > 10) {
                    valueAccessor().value(valueAccessor().value().substr(0, 10));
                }

                valueAccessor().value(moment(valueAccessor().value(), options.format).format('DD/MM/YYYY') == 'Invalid date' ? '' : moment(valueAccessor().value(), options.format).format('DD/MM/YYYY'));
            } else {
                valueAccessor().value(null);
            }


            //var thisFormat = 'L';

            //if (allBindingsAccessor() !== undefined) {
            //    if (allBindingsAccessor().datepickerOptions !== undefined) {
            //        thisFormat = allBindingsAccessor().datepickerOptions.format !== undefined ? allBindingsAccessor().datepickerOptions.format : thisFormat;
            //    }
            //}

            //var value = valueAccessor().value;
            //var unwrapped = ko.utils.unwrapObservable(value());

            //if (unwrapped === undefined || unwrapped === null) {
            //    element.value = new moment(new Date());
            //} else {
            //    if (unwrapped !== '') {
            //        element.value = unwrapped;//element.value = unwrapped.format(thisFormat);
            //    }
            //}
        }
    };
    ko.Confirm = function (options, fnYesCallbak, fnNoCallbak) {
        var title = (options.title === null || options.title === undefined) ? "Confirmación" : options.title;

        var dialog = bootbox.dialog({
            title: title,
            message: options.message,
            buttons: {
                cancel: {
                    label: "No",
                    callback: function () {
                        if ((fnNoCallbak != undefined) && (typeof fnNoCallbak == 'function')) {
                            fnNoCallbak();
                        }
                    }
                },
                ok: {
                    label: "Si",
                    callback: function () {
                        if ((fnYesCallbak != undefined) && (typeof fnYesCallbak == 'function')) {
                            fnYesCallbak();
                        }
                    }
                }
            }
        });
        dialog.css({
            'top': '50%',
            'margin-top': function () {
                return -(dialog.height() / 2);
            }
        });

    };
    ko.Alert = function (options, fnOkCallbak) {
        var title = (options.title === null || options.title === undefined) ? "Información" : options.title;

        var dialog = bootbox.dialog({
            title: title,
            message: options.message,
            buttons: {
                ok: {
                    label: "Aceptar",
                    callback: function () {
                        if ((fnOkCallbak != undefined) && (typeof fnOkCallbak == 'function')) {
                            fnOkCallbak();
                        }
                    }
                }
            }
        });
        dialog.css({
            'top': '50%',
            'margin-top': function () {
                return -(dialog.height() / 2);
            }
        });
    }
    ko.ObjToQS = function (obj, noToken) {
        obj = (obj === null || obj === undefined) ? {} : obj;
        noToken = (noToken === null || noToken === undefined) ? false : noToken;

        var $key = bootstrapper();

        if ($key !== null && $key.IsSecure && noToken == false) {
            var pp = JSON.stringify(obj);
            var ndata = $().EncodeData(pp, $key.Token);
            var route = "var=" + ndata;
            return route;

        } else {

            var k = Object.keys(obj);
            var s = "";
            for (var i = 0; i < k.length; i++) {
                s += k[i] + "=" + encodeURIComponent(obj[k[i]]);
                if (i !== k.length - 1) s += "&";
            }
            return s;
        }
    };
    ko.EndContextLoaded = function (contextName) {

        var ele = document.getElementById(contextName);
        if (ele != null) {
            ko.cleanNode(ele);
        }
        var context = requirejs.s.contexts[contextName];
        if (context != undefined) {

            for (var key in context.defined) {
                if (context.defined.hasOwnProperty(key)) {
                    eval("req" + contextName + ".undef(key);");
                }
            };
        }

    };
    ko.bindingHandlers.tooltip = {
        init: function (element) {
            var $element = $(element);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if ($element.data('bs.tooltip')) {
                    $element.tooltip('destroy');
                }
            });
        },

        update: function (element, valueAccessor) {
            var $element = $(element),
                value = ko.unwrap(valueAccessor()),
                options = ko.toJS(value);

            var tooltipData = $element.data('bs.tooltip');

            if (!tooltipData) {
                $element.tooltip(options);
            } else {
                ko.utils.extend(tooltipData.options, options);
            }
        }
    };
    /////////////////////////////////////////////////////////

    ko.checkSoloNumeros = function (evt) {
        evt = (evt) ? evt : window.event;
        var esValido = false;
        var keyCode = (evt.which) ? evt.which : evt.keyCode;
        if (keyCode > 31 && (keyCode < 48 || keyCode > 57)) {
            esValido = false;
        } else { esValido = true; }
        if (keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39) { esValido = true; }//backespace, surp, derecha, izquierda
        return esValido;
    }
    ko.checkSoloNumerosYPuntoDecimal = function (evt) {
        evt = (evt) ? evt : window.event;
        var esValido = false;
        var keyCode = (evt.which) ? evt.which : evt.keyCode;
        /* 
        48-57   > 0-9
        46      > .   (decimal)*/
        if ((keyCode > 47 && keyCode < 58) || keyCode === 46) {
            esValido = true;
        } else { esValido = false; }
        if (keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39) { esValido = true; }//backespace, surp, derecha, izquierda
        return esValido;
    }
    ko.checkSoloLetras = function (evt) {
        evt = (evt) ? evt : window.event;
        var keyCode = (evt.which) ? evt.which : evt.keyCode;
        if ((keyCode !== 32) && (keyCode < 65) || (keyCode > 90) && (keyCode < 97) || (keyCode > 122)) event.returnValue = false;
    }
    ko.checkSoloLetrasNumeros = function (evt) {
        evt = (evt) ? evt : window.event;
        var keyCode = (evt.which) ? evt.which : evt.keyCode;

        if ((keyCode !== 32) && (keyCode < 48) || (keyCode > 57)
            && (keyCode < 65) || (keyCode > 90)
            && (keyCode < 97) || (keyCode > 122))
            event.returnValue = false;
    }
    ko.checkSoloCaracteresValidosDescripciones = function (evt) {

        evt = (evt) ? evt : window.event;
        var keyCode = (evt.which) ? evt.which : evt.keyCode;
        /*
     *  48-57   > 0-9
        97-122  > a-z
        65-90   > A-Z
        32      > espacio
        39      > '
        46      > .
        44      > ,
        58      > :
        45      > -
        95      > _
        33      > !
        64      > @
        38      > &
        13      > Enter
        191     > ¿
        63      > ?
        161     > ¡
        33      > !
        241     > ñ
        209     > Ñ
        225     > á
        233     > é
        237     > í
        243     > ó
        250     > ú
        252     > ü
        193     > Á
        201     > É
        205     > Í
        211     > Ó
        218     > Ú
        220     > Ü
     * 
     */
        var specialChars = [32, 39, 46, 44, 58, 45, 95, 33, 64, 38, 13, 191, 63, 161, 33, 241, 209, 225, 233, 237, 243, 250, 252, 193, 201, 205, 211, 218, 220, 8, 46, 37, 39];
        if (
            (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 97 && keyCode <= 122) ||
            (keyCode >= 65 && keyCode <= 90) ||
            specialChars.indexOf(keyCode) !== -1)
            event.returnValue = true;
        else event.returnValue = false;
    }
    ko.checkSoloCaracteresValidosTelefono = function (evt) {
        evt = (evt) ? evt : window.event;
        var keyCode = (evt.which) ? evt.which : evt.keyCode;

        /*
     *  48-57   > 0-9
        32      > espacio
        46      > .
        45      > -
        40     > (
        41     > )
        47     > /
     * 
     */
        var specialChars = [32, 46, 45, 40, 41, 47, 8, 46, 37, 39];
        if (
            (keyCode >= 48 && keyCode <= 57) ||
            specialChars.indexOf(keyCode) !== -1)
            event.returnValue = true;
        else event.returnValue = false;
    }
    ko.toISOStringDate = function (stringDate) {
        if (stringDate == "" || stringDate == null)
            return null
        else {
            var array = stringDate.split('/');
            return (new Date(array[2] + "/" + array[1] + "/" + array[0])).toISOString();
        }
    }
    ko.checkSoloCaracteresValidosCodigos = function (evt) {
        evt = (evt) ? evt : window.event;
        var keyCode = (evt.which) ? evt.which : evt.keyCode;

        /*
     *  48-57   > 0-9
        97-122  > a-z
        65-90   > A-Z
        32      > espacio
        46      > .
        45      > -
        95      > _
        40     > (
        41     > )
        47     > /
        92     > \
     * 
     */
        var specialChars = [32, 46, 45, 95, 40, 41, 47, 92, 8, 46, 37, 39];
        if (
            (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 97 && keyCode <= 122) ||
            (keyCode >= 65 && keyCode <= 90) ||
            specialChars.indexOf(keyCode) !== -1)
            event.returnValue = true;
        else event.returnValue = false;
    }

    ////////////////////////////////////////////////////////
    /*BEGIN => JQUERY*/
    $.fn.CustomValidationEngine = function () {
        this.each(function () {
            var $elem = $(this);
            if ($elem.is("form")) {
                $elem.validationEngine('detach');
                $elem.validationEngine({ autoHidePrompt: true, autoPositionUpdate: true });
            }

        });
        return this;
    };
    $.fn.IsValidationEngine = function () {

        var form = $(this);
        if (!form[0]) return form;

        form.validationEngine('detach');
        form.validationEngine({ promptPosition: "bottom:-155", autoHidePrompt: true });

        var r = form.validationEngine('validate', { autoPositionUpdate: true });

        return r;
    };
    $.fn.ParseRemoteData = function (data, $token) {
        var objData;
        var dataModelText = data.DataModel;

        if ((dataModelText != undefined) && ($token != null)) {
            var jsonStringData = $().DecodeData(dataModelText, $token);

            if ($().isJSON(jsonStringData)) {
                objData = JSON.parse(jsonStringData);
            } else {
                objData = jsonStringData;
            }
        } else {

            objData = data;
        }

        return objData;
    }
    $.fn.EncodeData = function (text, pkey) {
        if (text === null) {
            return null;
        }
        if (text === undefined) {
            return undefined;
        }
        if (text.replace(/^\s+|\s+$/gm, '') === "") {
            return text;
        }
        var key = CryptoJS.enc.Utf8.parse(pkey);
        var result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key,
            {
                keySize: 128 / 8, iv: key,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        var encrypted = result.toString();

        return encodeURIComponent(encrypted);
    }
    $.fn.DecodeData = function (encryptedText, pkey) {

        if (encryptedText === null) {
            return null;
        }
        if (encryptedText === undefined) {
            return undefined;
        }

        if (encryptedText.replace(/^\s+|\s+$/gm, '') === "") {
            return encryptedText;
        }
        var key = CryptoJS.enc.Utf8.parse(pkey);

        encryptedText = decodeURIComponent(encryptedText);

        var result = CryptoJS.AES.decrypt(encryptedText, key,
            {
                keySize: 128 / 8, iv: key,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        var decrypted = result.toString(CryptoJS.enc.Utf8);
        return decrypted;
    }
    $.fn.isJSON = function (item) {
        item = typeof item !== "string"
            ? JSON.stringify(item)
            : item;

        try {
            item = JSON.parse(item);
        } catch (e) {
            return false;
        }

        if (typeof item === "object" && item !== null) {
            return true;
        }

        return false;
    }
    $.fn.Reverse = function (dataModel) {
        var separetors = ["xZxS%jqm", "nr%Ft1Jr", "60Vc%UNh", "6e9hv9%M", "K%NZThUV", "JT%WG5aU", "hn8q%xb4", "QO1%qim9", "EjuRBck%", "eX1%P2Gd"];
        var characters = { a: 0, B: 1, X: 2, D: 3, e: 4, '%': 5, g: 6, H: 7, i: 8, Z: 9 }
        var exacto = { separetor: '', pos: -1 };

        for (var j = 0, x = separetors.length; j < x; j++) {
            var sepa = separetors[j];
            exacto.pos = dataModel.lastIndexOf(sepa);
            if (exacto.pos > 1) {
                exacto.separetor = sepa;
                break;
            }
        }

        var reCadena = dataModel.substr(exacto.pos + exacto.separetor.length, 16);

        var stringArray = Array.from(reCadena);
        var values = [];
        for (var i = 0, l = stringArray.length; i < l; i++) {
            values.push(characters[stringArray[i]]);
        }
        var arrString = values.join("");
        return {
            Separetor: exacto.separetor,
            Key1: reCadena,
            Key2: arrString
        };
    };
    $.fn.ParseResponse = function (r) {
        var objData;
        var dataModelText = r.DataModel;
        if (dataModelText != undefined) {
            var keys = $().Reverse(dataModelText);
            var ndata = dataModelText.replace(keys.Separetor + keys.Key1, '');
            var jsonStringData = $().DecodeData(ndata, keys.Key2);

            if ($().isJSON(jsonStringData)) {
                objData = JSON.parse(jsonStringData);
            } else {
                objData = jsonStringData;
            }

        } else {
            objData = r;
        }
        return objData;
    };
    $.fn.ExistsToken = function () {
        if (window.$TokenKey === null) {
            return false;
        }
        return true;
    };

    /****************************/
    $.fn.Alfanumerico = function (options) {
        options = options || {};
        $(this).off("paste");
        $(this).off("keydown");
        $(this).off("keypress");
        $(this).off("keyup");
        $(this).off("input");
        return this.each(function () {

            $(this).on("paste", function (e) {

                var value = "";
                if (e.originalEvent.clipboardData != undefined) {
                    value = e.originalEvent.clipboardData.getData('text');
                } else {
                    value = window.clipboardData.getData("Text");
                }
                var testing = new RegExp("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.,_ " + (options.charPermitidos != null && options.charPermitidos != undefined ? options.charPermitidos : '') + "\-]*$", 'g');
                var valido = testing.test(value);


                if (!valido)
                    return false;
            });

            //keydown
            var keydownEnable;
            $(this).on("keydown", function (e) {
                keydownEnable = false;
                var key = e.keyCode || e.charCode || e.which;
                if (key === 8 || key === 9 || key === 39 || key === 46) {//backspace,tab,fin,ini,izq,der,sup
                    keydownEnable = true;
                }

            });
            //keypress
            $(this).on("keypress", function (e) {
                
                if (keydownEnable)
                    return true;

                var key = e.keyCode || e.which;

                var tecla = String.fromCharCode(key).toLowerCase();
                var value = e.target.value.substr(0, e.currentTarget.selectionStart) + tecla + e.target.value.substr(e.currentTarget.selectionStart);


                var valido = validarSoloEspaciosDobles(value);
                if (!valido) {
                    return false;
                }

                var testing = new RegExp("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.,_ " + (options.charPermitidos != null && options.charPermitidos != undefined ? options.charPermitidos : '') + "\-]*$", 'g');
                valido = testing.test(value);

                if (!valido)
                    return false;
            });
            //keyup
            $(this).bind("keyup", function (e) {

                if (options.toUpperCase != undefined && options.toUpperCase)
                    this.value = this.value.toUpperCase();
                else if (options.toLowerCase != undefined && options.toLowerCase)
                    this.value = this.value.toLowerCase();
                else {
                    this.value = this.value;
                }

            });
            //input
            $(this).bind("input", function (e) {                
                if (options.toUpperCase != undefined && options.toUpperCase)
                    this.value = this.value.toUpperCase();
                else if (options.toLowerCase != undefined && options.toLowerCase)
                    this.value = this.value.toLowerCase();
                else {
                    this.value = this.value;
                }

                var maxLength = $(this).attr("maxlength");// || $(this).rules()["maxlength"];
                
                if (maxLength != undefined) {
                    this.value = this.value.substring(0, parseInt(maxLength));
                }


            });
        });
    };

    $.fn.SoloLetras = function (options) {
        options = options || {};
        $(this).off("paste");
        $(this).off("keydown");
        $(this).off("keypress");
        $(this).off("keyup");
        $(this).off("input");
        return this.each(function () {

            $(this).on("paste", function (e) {

                var value = "";
                if (e.originalEvent.clipboardData != undefined) {
                    value = e.originalEvent.clipboardData.getData('text');
                } else {
                    value = window.clipboardData.getData("Text");
                }


                var testing = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ " + (options.charPermitidos != null && options.charPermitidos != undefined ? options.charPermitidos : '') + "]*$", 'g');
                var valido = testing.test(value);

                if (!valido)
                    return false;
            });

            //keydown
            var keydownEnable;
            $(this).on("keydown", function (e) {
                keydownEnable = false;
                var key = e.keyCode || e.charCode || e.which;
                if (key === 8 || key === 9 || key === 39 || key === 46) {//backspace,tab,fin,ini,izq,der,sup
                    keydownEnable = true;
                }

            });
            //keypress
            $(this).on("keypress", function (e) {

                if (keydownEnable)
                    return true;

                var key = e.keyCode || e.which;

                var tecla = String.fromCharCode(key).toLowerCase();
                var value = e.target.value.substr(0, e.currentTarget.selectionStart) + tecla + e.target.value.substr(e.currentTarget.selectionStart);

                var valido = validarSoloEspaciosDobles(value);
                if (!valido) {
                    return false;
                }

                var testing = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ " + (options.charPermitidos != null && options.charPermitidos != undefined ? options.charPermitidos : '') + "]*$", 'g');
                valido = testing.test(value);

                if (!valido)
                    return false;
            });
            //keyup
            $(this).bind("keyup", function (e) {
                if (options.toUpperCase != undefined && options.toUpperCase)
                    this.value = this.value.toUpperCase();
                else if (options.toLowerCase != undefined && options.toLowerCase)
                    this.value = this.value.toLowerCase();
                else {
                    this.value = this.value;
                }
            });
            //input
            $(this).bind("input", function (e) {
                var maxLength = $(this).attr("maxlength");// || $(this).rules()["maxlength"];
                if (maxLength != undefined) {
                    this.value = this.value.substring(0, parseInt(maxLength));
                }

                if (options.toUpperCase != undefined && options.toUpperCase)
                    this.value = this.value.toUpperCase();
                else if (options.toLowerCase != undefined && options.toLowerCase)
                    this.value = this.value.toLowerCase();
                else {
                    this.value = this.value;
                }
            });

        });
    };

    $.fn.NumeroEntero = function (option) {
        option = option || {};
        $(this).off("paste");
        $(this).off("keydown");
        $(this).off("keypress");
        $(this).off("keyup");
        $(this).off("input");
        return this.each(function () {

            $(this).on("paste", function (e) {
                var value = "";
                if (e.originalEvent.clipboardData != undefined) {
                    value = e.originalEvent.clipboardData.getData('text');
                } else {
                    value = window.clipboardData.getData("Text");
                }

                return /^[0-9]*$/g.test(value);
            });

            //keydown
            var keydownEnable;
            $(this).on("keydown", function (e) {
                keydownEnable = false;
                var key = e.keyCode || e.charCode || e.which;
                if (key === 8 || key === 9 || key === 39) {//backspace,tab,fin,ini,izq,der,sup
                    keydownEnable = true;
                }

            });
            //keypress
            $(this).on("keypress", function (e) {

                if (option.keyPressEnter != undefined && typeof (option.keyPressEnter) == "function") {
                    var keyEnter = e.keyCode || e.which;
                    if (keyEnter == 13) {
                        option.keyPressEnter();
                        return true;
                    }
                }

                if (keydownEnable)
                    return true;

                var key = e.keyCode || e.which;
                var tecla = String.fromCharCode(key).toLowerCase();
                var value = e.target.value + "" + tecla;

                return /^[0-9]*$/g.test(value);
            });

        });
    };

    $.fn.NumeroDecimal = function () {
        $(this).off("paste");
        $(this).off("keydown");
        $(this).off("keypress");
        $(this).off("keyup");
        $(this).off("input");
        return this.each(function () {
            //Copy Page
            $(this).on("paste", function (e) {
                var value = "";
                if (e.originalEvent.clipboardData != undefined) {
                    value = e.originalEvent.clipboardData.getData('text');
                } else {
                    value = window.clipboardData.getData("Text");
                }

                return /^[0-9.]*$/g.test(value);
            });

            //keydown
            var keydownEnable;
            $(this).on("keydown", function (e) {
                keydownEnable = false;
                var key = e.keyCode || e.charCode || e.which;
                if (key === 8 || key === 9 || key === 39) {//backspace,tab,fin,ini,izq,der,sup
                    keydownEnable = true;
                }

            });
            //keypress
            $(this).on("keypress", function (e) {

                if (keydownEnable)
                    return true;

                var key = e.keyCode || e.which;

                var tecla = String.fromCharCode(key).toLowerCase();
                var value = e.target.value + "" + tecla;

                var puntos = value.split('.');
                if (puntos.length > 2) {
                    return false;
                }

                return /^[0-9.]*$/g.test(value);
            });

        });
    };

    /****************************/
    //*************FILE DOWNLOAD MANAGER***************//
    $.fn.DownloadManager=function(url, params) {
        
        $.blockUI("Descargando archivo");

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 2) {
                if (xhr.getResponseHeader("Content-Type") != null) {//No deberia retornar null, deberia retornar un tipo de error en JSON
                    if (xhr.getResponseHeader("Content-Type").indexOf("application/json") >= 0) {
                        xhr.responseType = "json";
                    }
                }

            }
        };
        xhr.onload = function () {
            
            if (xhr.status === 200) {

                if (xhr.responseType == "json") {
                    $.unblockUI();
                    alertService.displayErrorNotification("Ocurrió un error al descargar el archivo");
                } else {
                    var filename = "";
                    var disposition = xhr.getResponseHeader('Content-Disposition');
                    if (disposition && disposition.indexOf('attachment') !== -1) {
                        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                        var matches = filenameRegex.exec(disposition);
                        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                    }

                    var a = document.createElement('a');
                    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
                    a.download = filename; // Set the file name.
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    delete a;
                    $.unblockUI();
                    
                }


            } else {
                $.unblockUI();
                alertService.displayErrorNotification("Ocurrió un error al descargar el archivo");
            }

        };
        xhr.onerror = function () {

            $.unblockUI();
            alertService.displayErrorNotification("Ocurrió un error al descargar el archivo");

        };

        //*******parameters*******//
        
        if ($().ExistsToken()) {
            setTimeout(function () {
                var tk = window.$TokenKey;
                if (tk != null) {
                    if ((tk.IsSecure) && (tk.Token != null)) {
                        var pp = JSON.stringify(params);
                        params = $().EncodeData(pp, tk.Token);
                    }
                }

                //params = JSON.stringify(params);
                xhr.open('POST', url, true);
                xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                xhr.send(params);

            }, (window.$TokenKey == null ? 1000 : 0));
        } else {
            params = JSON.stringify(params);
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr.send(params);
        }
        

        //******************///

    }
    ////////////////////////////////////////////////////////
    function validarSoloEspaciosDobles(value) {
        return !/\s+\s+/g.test(value);
    }
    function bootstrapper() {
        return window.$TokenKey;
    }
    

    
});
$.fn.ValSession = function () {
    $.ajax({
        url: '/Auth/Boot',
        type: 'GET', data: {}, global: false, cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",

        success: function (d) {
            var r = $().ParseResponse(d);

            if (r.IsAuthenticated !== true) {
                var hasonfocus = document.body.hasAttribute("onfocus");
                if (hasonfocus === true) {
                    $(document.body).removeAttr("onfocus");
                }
                alert("Su sesión ha expirado por favor vuelva a ingresar al sistema");
                window.location.href = _routeLogout;
            } else {
                if (_routeLogout === null) {
                    _routeLogout = r.RouteLogout;
                }
            }
        },
        error: function (d) {
            console.log(d);
        }
    });
};

$.fn.bytesToMB = function bytesToSize(bytes) {
    return parseFloat((bytes / 1048576).toFixed(6));
};

$.fn.commaTextbox = function () {
    var applyFormatting = function (that) {
        // Capture cursor position so we can restore it later
        var caretPosition = that.selectionStart
        //$('#selectionStart').text(selStart); // Temporary

        // Get the value from the textbox
        var origVal = $(that).val();
        //var originalSize = origVal.length;
        //$('#origVal').text(origVal); // Temporary
        //$('#originalSize').text(originalSize); // Temporary

        // Get rid of commas and any other bad input
        var justNumbers = origVal.replace(/[^1234567890\.]/g, "");

        // Store the non-formatted number as a data attribute
        $(that).attr('data-raw-value', justNumbers);
        $('#justNumbers').text(justNumbers); // Temporary

        // If there are no numbers entered, blank out the box
        if (justNumbers.length == 0) {
            $(that).val('');
            return;
        }

        // Get rid of the decimal place and capture separately
        var decimalRegex = /(\d{0,})(\.(\d{1,})?)?/g
        var decimalPartMatches = decimalRegex.exec(justNumbers);
        var decimalPart = "";
        if (decimalPartMatches[2]) {
            decimalPart = decimalPartMatches[2];
        }
        //$('#decimalPart').text(decimalPart); // Temporary
        var withoutDecimal = decimalPartMatches[1];
        //$('#withoutDecimal').text(withoutDecimal); // Temporary

        // Assemble the final formatted value and put it in
        var final = '';
        //final += '$' // Now including this via CSS magic to avoid mucking with the form value
        final += withoutDecimal.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        final += decimalPart;
        $(that).val(final);
        //$('#final').text(final); // Temporary

        // Figure out new caret position and restore it
        var origSelOffset = origVal.length - justNumbers.length;
        var selPosInNumber = caretPosition - origSelOffset;
        var newSelOffset = final.length - justNumbers.length;
        var newSelPos = selPosInNumber + newSelOffset;
        that.setSelectionRange(newSelPos, newSelPos);

        // TODO: Remove temporary debugging out
        //$('#caretPosition').text(caretPosition);
        //$('#origSelOffset').text(origSelOffset);
        //$('#selPosInNumber').text(selPosInNumber);
        //$('#newSelOffset').text(newSelOffset);
        //$('#newSelPos').text(newSelPos);
    };

    // Format the current values
    this.each(function () {
        applyFormatting(this);
    });

    // Reapply formatting upon new input
    // Uses event namespacing so it can cleanly be removed later
    $(this).on('input.commaTextbox', function (event) {
        applyFormatting(this);
    });

    // Add some markup in order to position a currency symbol within the input
    // without affecting the value submitted to the server
    //this.addClass('commaTextbox');
    //this.wrap("<div class='commaTextbox-container'></div>");
    //this.parent().prepend("<div class='commaTextbox-currency'>$</div>");

    return this; // Allow for chaining of jQuery calls
};
