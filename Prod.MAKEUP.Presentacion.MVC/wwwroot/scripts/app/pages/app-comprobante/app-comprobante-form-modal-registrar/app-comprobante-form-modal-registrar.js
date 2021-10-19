define(['jquery', 'knockout', "ns", 'ajaxService', 'alertService', "enumerado", 'domReady', 'fileupload'],
    function ($, ko, ns, ajaxService, alertService, enumerado, domReady, fileupload) {
    $(document).ready(function () {

        $('#modalRegistrarComprobante').on('show.bs.modal', function (e) {
            
            $("#txtNroComprobante").NumeroEntero();
            $("#txtNroComprobante").attr("maxlength", 10);
            $("#txtNroSIAF").NumeroEntero();
            $("#txtNroSIAF").attr("maxlength", 10);
            $("#txtNroOS").NumeroEntero();
            $("#txtNroOS").attr("maxlength", 10);
            $("#txtNroOC").NumeroEntero();
            $("#txtNroOC").attr("maxlength", 10);
            $("#txtMontoRegistrar").commaTextbox();
            $("#txtMontoRegistrar").attr("maxlength", 15);
            //$("#txtNroDO").NumeroEntero();
            $("#txtNroDO").attr("maxlength", 20);
            $("#txtNroCP").NumeroEntero();
            $("#txtNroCP").attr("maxlength", 10);
            $("#txtExpSITRADOC").attr("maxlength", 50);
            //$("#txtComprobante,#txtRazonSocial,#txtApellidos,#txtNombre").Alfanumerico();

            var self = ko.dataFor(this);
            
        });

        $('#modalRegistrarComprobante').on('shown.bs.modal', function (e) {

            var self = ko.dataFor(this);

            if (self.modelParent.ModoRegistro() === "M") {
                $("#txtFecha").attr("disabled", true);                
                self.MostrarEditar();                
                if (self.file2.codigo() == null) {
                    self.file2.DisplaySettings.puedeCargarArchivo(true);
                    self.file2.DisplaySettings.puedeEliminarArchivo(true);
                    self.file2.DisplaySettings.puedeVerHistorialArchivo(true);
                }
                else {
                    self.file2.DisplaySettings.puedeCargarArchivo(false);
                    self.file2.DisplaySettings.puedeEliminarArchivo(false);
                    self.file2.DisplaySettings.puedeVerHistorialArchivo(false);
                }
            }
            if (self.modelParent.ModoRegistro() === "I") {
                $("#txtFecha").attr("disabled", false);
                self.file2.DisplaySettings.puedeCargarArchivo(false);
                self.file2.DisplaySettings.puedeEliminarArchivo(false);
                self.file2.DisplaySettings.puedeVerHistorialArchivo(false);
                self.file.fnSetIdArchivo(null, true);
                self.file2.fnSetIdArchivo(null, true);
            }            
        });

    });

    function Task(tsk) {
        this.task = ko.observable(tsk);
        this.id = ko.observable(-1);
        this.name = ko.observable('');
        var self = this;
        this.onSelect = function (n, v) {
            self.name(n);
            self.id(v);
        };
    }

    function viewModel(params) {

        var self = this;

        //VARIABLES
        self.ns = ns;
        self.enumerado = enumerado;//solo para poder utilizar en la vista
        self.modelParent = params.modelParent;
        self.ComprobanteDefault = function () {
            var comprobante = {
                id: 0,
                NroSIAF: null,
                Fecha: new Date(),
                NroOS: null,
                NroOC: null,
                NroDO: null,
                NroCP: null,
                RazonSocial: null,
                Monto: null,
                MontoAnterior: null,
                CodArchivo: null,
                CodComprobanteFirmado: null,
                NombreComprobanteFirmado: null,
                TamanioArchivo: 0,
                IdTipoPago: null,
                ExpedienteSitradoc: null,
                file: null,
                file2: null,
                TipoHoja: null
            }
            return comprobante;
        }
        self.Comprobante = ko.mapping.fromJS(self.ComprobanteDefault());

        self.prueba = ko.observable('');
        self.prueba = new Task('w');
        self.Usuario = ko.observable("");
        
        //FUNCIONES

        self.getUsuario = function () {
            ajaxService.Get(ns.URL + '/Comun/getUsuario'
                , function (response) {
                    self.Usuario(response);

                    if (self.Usuario() == "Archivo") {
                        $("#txtNroSIAF").attr("disabled", true);
                        $("#txtNroOS").attr("disabled", true);
                        $("#txtNroOC").attr("disabled", true);
                        $("#txtNroDO").attr("disabled", true);
                        $("#txtRazonSocial").attr("disabled", true);
                        $("#txtMontoRegistrar").attr("disabled", true);
                        $("#txtExpSitradoc").attr("disabled", true);
                        $("#txtTipoPago").attr("disabled", true);
                        $("#selHojaTramite").attr("disabled", true);
                    }
                },
                function (d) {
                    alertService.displayErrorNotification(d);
                });
        }
        self.getUsuario();

        self.modelParent.MostrarRegistrar = function () {
            ko.mapping.fromJS(self.ComprobanteDefault(), self.Comprobante);
            self.modelParent.ModoRegistro("I");
            $("#modalRegistrarComprobante").modal("show");
        }
        self.MostrarEditar = function () {

            self.Comprobante.id(self.modelParent.ComprobanteSelected().id_comprobante_pago);
            self.Comprobante.Fecha(self.modelParent.ComprobanteSelected().fecha_registro_str);
            self.Comprobante.NroSIAF(self.modelParent.ComprobanteSelected().numero_siaf);
            self.Comprobante.NroOS(self.modelParent.ComprobanteSelected().numero_orden_servicio);
            self.Comprobante.NroOC(self.modelParent.ComprobanteSelected().numero_orden_compra);
            self.Comprobante.NroDO(self.modelParent.ComprobanteSelected().documento_otro);
            self.Comprobante.NroCP(self.modelParent.ComprobanteSelected().numero_comprobante_pago);
            self.Comprobante.RazonSocial(self.modelParent.ComprobanteSelected().razon_social);
            self.Comprobante.Monto(self.modelParent.ComprobanteSelected().monto);
            self.Comprobante.MontoAnterior(self.modelParent.ComprobanteSelected().monto);
            self.Comprobante.IdTipoPago(self.modelParent.ComprobanteSelected().id_tipo_pago);
            self.Comprobante.CodArchivo(self.modelParent.ComprobanteSelected().cod_archivo);
            self.Comprobante.CodComprobanteFirmado(self.modelParent.ComprobanteSelected().cod_comprobante_firmado);            
            self.Comprobante.TipoHoja(self.modelParent.ComprobanteSelected().tipo_hoja_tramite);
            self.Comprobante.ExpedienteSitradoc(self.modelParent.ComprobanteSelected().expediente_sitradoc);
            self.file.fnSetIdArchivo(self.Comprobante.CodArchivo(), true);
            self.file2.fnSetIdArchivo(self.Comprobante.CodComprobanteFirmado(), true);            
        }

        self.fnCargaArchivoExito = function (o, name, index) {
            //debugger;
            $(".tooltip").tooltip("hide");
            if (o.operation == "UploadFile") {
                if (o.Data != null) {
                    if (index == 1) {
                        self.Comprobante.CodArchivo(o.Data.id);
                        //self.Comprobante.TamanioArchivo($.fn.bytesToMB(o.Data.pesoEnBytes));                        
                    }                    
                }
                else {
                    alertService.displayNotification(o);
                }
                //recalcularSizeFiles(true);
            }
            else if (o.operation == "DeleteFile") {
                if (o.Success) {
                    if (index == 1) {
                        self.Comprobante.CodArchivo(null);
                        //self.Comprobante.TamanioArchivo(0);
                        alertService.displayWarningNotification("Debe grabar los cambios al eliminar el archivo.");
                    }                    
                }
                //recalcularSizeFiles(false);
            }
        };

        self.fnCargaArchivoComprobanteExito = function (o, name, index) {
            //debugger;
            $(".tooltip").tooltip("hide");
            if (o.operation == "UploadFile") {
                if (o.Data != null) {
                    if (index == 1) {
                        self.Comprobante.CodComprobanteFirmado(o.Data.id);
                        //self.Comprobante.TamanioArchivo($.fn.bytesToMB(o.Data.pesoEnBytes));
                    }
                }
                else {
                    alertService.displayNotification(o);
                }
                //recalcularSizeFiles(true);
            }
            else if (o.operation == "DeleteFile") {
                if (o.Success) {
                    if (index == 1) {
                        self.Comprobante.CodComprobanteFirmado(null);
                        //self.Comprobante.TamanioArchivo(0);
                        alertService.displayWarningNotification("Debe grabar los cambios al eliminar el archivo.");
                    }
                }
                //recalcularSizeFiles(false);
            }
        };

        //function recalcularSizeFiles(mostrarAlertas) {
        //    //debugger;
        //    if (self.Comprobante.CodArchivo == null) {
        //        self.Comprobante.flagFilesUploadOk(false);
        //    }
        //    else {
        //        self.Comprobante.flagFilesUploadOk(true);
        //        var newTamanio = parseFloat(self.Comprobante.TamanioArchivo()).toFixed(6);
        //        if (newTamanio <= 0) {
        //            self.Comprobante.classTamanioEnMb('alert alert-danger row');
        //            self.Comprobante.flagFilesUploadOk(false);
        //            if (mostrarAlertas) {
        //                alertService.displayErrorNotification('Es necesario adjuntar al menos un documento.');
        //            }
        //        } else if (8 >= newTamanio && newTamanio >= 0) {
        //            self.Comprobante.classTamanioEnMb('alert alert-info row');
        //        } else if (newTamanio > 8 && newTamanio <= 11) {
        //            self.Comprobante.classTamanioEnMb('alert alert-warning row');
        //        } else if (newTamanio > 11) {
        //            self.Comprobante.classTamanioEnMb('alert alert-danger row');
        //            self.Comprobante.flagFilesUploadOk(false);
        //            if (mostrarAlertas) {
        //                alertService.displayErrorNotification('El peso total de los archivos adjuntos supera el máximo permitido (11 MB).');
        //            }
        //        }
        //        self.Comprobante.FileTamanioEnMb(newTamanio);
        //    }
        //}

        self.fnCargaArchivoError = function (o, name, index) {
            //debugger;
        };

        //EVENTOS
        
        self.setMaxLength = function (ctrl, tipo) {
            $(ctrl).removeAttr("maxlength");

            //DNI
            if (tipo == enumerado.TIPO_DOCUMENTO.DNI) {
                $(ctrl).attr("maxlength", 8);

            }//RUC
            else if (tipo == enumerado.TIPO_DOCUMENTO.RUC) {
                $(ctrl).attr("maxlength", 11);
            } else {
                $(ctrl).attr("maxlength", 50);
            }
        };
                
        self.Guardar = function () {

            var valid = self.ValidarRegistro(); //$("#frmComprobante").IsValidationEngine();//.validationEngine('validate');

            if (valid) {

            var comprobante = ko.mapping.toJS(self.Comprobante);
            comprobante.Opc = '1';

                var url = "/Comprobante/Registrar";
            if (comprobante.id != null && comprobante.id != 0) {
                    url = "/Comprobante/Actualizar";
                    comprobante.NombreComprobanteFirmado = self.file2.nombreArchivo();
                }
                //console.log(self.prueba())
                ko.Confirm({ message: "<b>Está seguro de guardar los datos.?</b>" },
                    function () {
                        ajaxService.Post(ns.URL + url, comprobante
                            , function (response) {
                                if (response.Success) {
                                    alertService.displaySuccessNotification("Se han guardado los datos satisfactoriamente.");
                                    $("#modalRegistrarComprobante").modal("hide");
                                    self.modelParent.Buscar();
                                } else {
                                    alertService.displayWarningNotification(response.Messages);
                                }
                            },
                            function (d) {
                                alertService.displayErrorNotification(d);

                            });
                    });

            }
        }
        self.ValidaBuscarNroDocumento = function (d, e) {
            e.stopPropagation();
            e.bubbles = false;
            return self.ValidaNroDocumento(self.Persona.id_tipo_identificacion(), false, e.keyCode);
        };
        self.ValidaBuscarNroDocumentoRepLegal = function (d, e) {
            e.stopPropagation();
            e.bubbles = false;
            return self.ValidaNroDocumento(self.Persona.id_tipo_identificacion(), true, e.keyCode);
        };
        self.ValidaNroDocumento = function (tipo, esRepLegal, key) {
            var numbers = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
            var lettersMin = 65,
                lettersMax = 122,
                charsEspecials = [44, 45, 201, 205, 211, 218, 241];

            if (tipo == enumerado.TIPO_DOCUMENTO.DNI || tipo == enumerado.TIPO_DOCUMENTO.LE || tipo == enumerado.TIPO_DOCUMENTO.CARNET_DE_EXTRANJERIA || tipo == enumerado.TIPO_DOCUMENTO.BREVETE || tipo == enumerado.TIPO_DOCUMENTO.FOTOCHECK || tipo == enumerado.TIPO_DOCUMENTO.OTROS || tipo == enumerado.TIPO_DOCUMENTO.LIBRETA_MILITAR || tipo == enumerado.TIPO_DOCUMENTO.RUC || tipo == enumerado.TIPO_DOCUMENTO.PASAPORTE) {
                if (!(numbers.indexOf(key) > -1))
                    return false;

                if (esRepLegal)
                    self.Persona.representante_legal("");
                else {
                    self.Persona.nombres("");
                    self.Persona.apellidos("");
                    self.Persona.razon_social("");
                }
            }
            else {
                if ((key >= lettersMin && key <= lettersMax) || charsEspecials.indexOf(key) > -1)
                    return true;
                else
                    return false;
            }

            return true;
        };
        self.ValidarRegistro = function () {
            var message = [];
            /*//SECTOR
            if (self.Persona.id_sector() == null) {
                message.push("<b>Sector:</b> Debe seleccionar un sector");
            }

            //TIPO PERSONA
            if (self.Persona.id_tipo_persona() == null) {
                message.push("<b>Tipo de persona:</b> Debe seleccionar un tipo de persona");
            }

            //TIPO PERSONA
            if (self.Persona.id_tipo_identificacion() == null) {
                message.push("<b>Tipo de identificación:</b> Debe seleccionar un tipo de identificación");
            } else {

                //NUMERO DE DOCUMENTO
                if (self.Persona.nro_documento() != null && self.Persona.nro_documento().trim() !== "") {
                    //DNI
                    var hasNroOk = true;

                    if (self.Persona.id_tipo_identificacion() == enumerado.TIPO_DOCUMENTO.DNI) {
                        if (self.Persona.nro_documento().length != 8) {
                            hasNroOk = false;
                            message.push("<b>Nro. de documento:</b> El DNI debe tener 8 dígitos.");
                        }
                        var testDni = new RegExp("^[0-9]{8}$", 'g');
                        if (!testDni.test(self.Persona.nro_documento())) {
                            hasNroOk = false;
                            message.push("<b>Nro. de documento:</b> El DNI no es correcto.");
                        }
                        if (hasNroOk && (self.Persona.nombres() == "" || self.Persona.apellidos() == ""))
                            message.push("<b>Nombres y Apellidos:</b> Debe buscar el documento ingresado.");
                    }//RUC
                    else if (self.Persona.id_tipo_identificacion() == enumerado.TIPO_DOCUMENTO.RUC) {
                        if (self.Persona.nro_documento().length != 11) {
                            hasNroOk = false;
                            message.push("<b>Nro. de documento:</b> El RUC debe tener 11 dígitos.");
                        }
                        //var testRuc = new RegExp("^(10|20)[0-9]{9}$", 'g');
                        var testRuc = new RegExp("^[0-9]{11}$", 'g');
                        if (!testRuc.test(self.Persona.nro_documento())) {
                            hasNroOk = false;
                            message.push("<b>Nro. de documento:</b> El RUC no es correcto.");
                        }
                        if (hasNroOk && self.Persona.razon_social() == "")
                            message.push("<b>Razón Social:</b> Debe buscar el RUC ingresado.");
                    }
                } else {
                    message.push("<b>Nro. de documento:</b> Debe ingresar en número de documento.");
                }

            }

            //DISTRITO
            if (self.Persona.codigo_distrito() == null || self.Persona.codigo_distrito() === "") {
                message.push("<b>Distrito:</b> Debe seleccionar un Departamento/Provincia/Distrito");
            }

            //DIRECCION
            if (self.Persona.direccion() == null || self.Persona.direccion().trim() === "") {
                message.push("<b>Dirección:</b> Debe ingresar una dirección");
            }

            //CELULAR
            if (self.Persona.celular() != null && self.Persona.celular().trim() !== "") {
                var testCelular = new RegExp("^9[0-9]{8}$", 'g');
                if (!testCelular.test(self.Persona.celular().trim())) {
                    message.push("<b>Celular:</b> El número de celular es incorrecto, debe empezar con 9 y tener 9 dígitos.");
                }

            }

            //CORREO
            if (self.Persona.email() != null && self.Persona.email().trim() !== "") {
                var testEmail = new RegExp("^[a-zA-Z0-9.!#$%&amp;'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", 'g');
                if (!testEmail.test(self.Persona.email().trim())) {
                    message.push("<b>E-mail:</b> El email no cumple con el formato correcto xxx@xxx.xxx.xx ejem: micorreo@dominio.com, micorreo@dominio.com.pe, etc");
                }
            }
            else self.Persona.email("");

            if (self.Persona.representante_legal() != null && self.Persona.representante_legal().trim() == "") {
                if (self.Persona.id_tipo_identificacion_rep_leg() == enumerado.TIPO_DOCUMENTO.DNI)
                    message.push("<b>Representante Legal:</b> Debe buscar el DNI ingresado.");

                if (self.Persona.id_tipo_identificacion_rep_leg() == enumerado.TIPO_DOCUMENTO.RUC)
                    message.push("<b>Representante Legal:</b> Debe buscar el RUC ingresado.");
            }*/

            //Nro.SIAF
            if (self.Comprobante.NroSIAF() == null || self.Comprobante.NroSIAF().trim() == "") {
                message.push("<b>Nro.SIAF:</b> Debe Ingresar el número SIAF");
            }
            //Fecha Registro
            if (self.Comprobante.Fecha() == null) {
                message.push("<b>Fecha Registro:</b> Debe Ingresar la fecha de giro");
            }
            //Nro.OS, Nro.OC, Nro.DO
            var valida = 0;
            if (self.Comprobante.NroOS() != null && self.Comprobante.NroOS().trim() != "") {
                valida++;
            }
            if (self.Comprobante.NroOC() != null && self.Comprobante.NroOC().trim() != "") {
                valida++;
            }
            if (self.Comprobante.NroDO() != null && self.Comprobante.NroDO().trim() != "") {
                valida++;
            }

            if (valida == 0) {
                message.push("<b>Nro.OS y Nro.OC:</b> Debe Ingresar número de orden de servicio, orden de compra ó Doc. Otros");
            }

            if (valida > 1) {
                message.push("<b>Nro.OS y Nro.OC:</b> Debe Ingresar solo orden de servicio, orden de compra ó Doc. Otros");
            }
            //Razón Social
            if (self.Comprobante.RazonSocial() == null || self.Comprobante.RazonSocial().trim() == "") {
                message.push("<b>Razón Social:</b> Debe Ingresar la razón social");
            }
            //Monto 
            var testMonto = new RegExp("^[0-9.]+$", 'g');

            if (self.Comprobante.Monto() != self.Comprobante.MontoAnterior()) {
                self.Comprobante.Monto($("#justNumbers")[0].textContent)
            }
            if (!testMonto.test(self.Comprobante.Monto())) {
                hasNroOk = false;
                message.push("<b>Monto:</b> El monto no es correcto.");
            }
            //Tipo de Pago
            if (self.Comprobante.IdTipoPago() == null) {
                message.push("<b>Tpo de Pago:</b> Debe seleccinar un tipo de pago");
            }

            //Expediente Sitradoc
            //if (self.Comprobante.CodComprobanteFirmado() != null) {
            //    if ((self.Comprobante.ExpedienteSitradoc() == null || self.Comprobante.ExpedienteSitradoc().trim() == ""))
            //        message.push("<b>Exp. SITRADOC:</b> Debe Ingresar el número de expediente SITRADOC");
            //}
            //Comprobante firmado
            if (self.Comprobante.CodComprobanteFirmado() != null && (self.Comprobante.ExpedienteSitradoc() == null || self.Comprobante.ExpedienteSitradoc().trim() == ""))
            {                
                message.push("<b>Comprobante Firmado:</b> Debe Ingresar el número de expediente SITRADOC");
            }
            
            if (message.length > 0) {
                alertService.displayWarningNotification({ Messages: message });
                return false;
            }

            return true;
        }
    }

    var users = [{
        label: 'Arun',
        value: 'Arun',
        id: 1
    }, {
        label: 'Prateek',
        value: 'Prateek',
        id: 2
    }, {
        label: 'Shikha',
        value: 'Shikha',
        id: 3
    }];

    ko.bindingHandlers.autoComplete = {
        init: function (el, valueAccessor, allBindingsAccessor, ctxt) {
            var foo = valueAccessor();
            $(el).autocomplete({
                source: users,
                select: function (e, ui) {
                    foo(ui.item.label, ui.item.id);
                }
            });
        }
    };

    //var model = new ViewModel(users);    
    //ko.applyBindings(model);

    return {
        viewModel: viewModel,
        /*
        ,template: ``
        */
        
    };
});
