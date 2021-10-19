define(["jquery", "pnotify"], function ($, PNotify) {
    "use strict";

    function alertService(anchorClass) {

        var self = this;

        self.parseMessage = function (message) {
            if (typeof message == "string")
                return message;
            var msg = '';
            var arr = message.Messages;
            if (arr != null || arr != undefined) {
                msg += "<ul>";
                arr.forEach((m) => {
                    msg += "<li>" + m + "</li>";
                });
                msg += "</ul>";
            } else {
                msg = message;
            }

            return msg;
        };
        self.displaySuccessNotification = function (message, large) {
            message = self.parseMessage(message);

            //limpiar todos los mensajes del mismo tipo pre-existentes
            new PNotify({
                title: 'Éxito!',
                text: message,
                type: 'success',
                shadow: true,
                delay: 2500,
                addclass: large ? 'custom-notif' : '',
                buttons: {
                    closer: true
                }
            });
        }

        self.displayWarningNotification = function (message, large) {
            //limpiar todos los mensajes del mismo tipo pre-existentes
            message = self.parseMessage(message);

            new PNotify({
                title: 'Advertencia!',
                text: message,
                type: 'warning',
                shadow: true,
                delay: 2500,
                addclass: large ? 'custom-notif' : '',
                buttons: {
                    closer: true
                }
            });
        }

        self.displayErrorNotification = function (message, large) {

            message = self.parseMessage(message);
            new PNotify({
                title: 'Error!',
                text: message,
                type: 'error',
                shadow: true,
                delay: 2500,
                addclass: large ? 'custom-notif' : '',
                buttons: {
                    closer: true
                }
            });
        }

        self.displayNotification = function (data) {
            
            var mensaje = '';
            var success = false;

            var rJSON = data.responseJSON;

            if (rJSON != undefined) {
                mensaje = rJSON.Messages.join("<br>");
                success = rJSON.Success;

            } else {
                mensaje = data.Messages.join("<br>");
                success = data.Success;
            }

            if (success) {
                self.displaySuccessNotification(mensaje);//momentaneamente
            } else {
                self.displayWarningNotification(mensaje);//momentaneamente
            }
        }

        self.displayNotificationLarge = function (data) {
            var mensaje = data.Messages.length > 0 ? data.Messages.join("<br>") : data.Message;
            if (data.Success) {
                self.displaySuccessNotification(mensaje);//momentaneamente
            } else {
                self.displayErrorNotification(mensaje, true);//momentaneamente
            }
        }
    }

    var service = new alertService();
    return service;

});
