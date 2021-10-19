define(['jquery', 'knockout', "ns", 'ajaxService', 'alertService', "enumerado", 'domReady'], function ($, ko, ns, ajaxService, alertService, enumerado, domReady) {
    $(document).ready(function () {

        $('#modalRegistrarPrestamo').on('show.bs.modal', function (e) {


            $("#txtNroComprobante1").NumeroEntero();
            $("#txtNroComprobante1").attr("maxlength", 10);
            $("#txtNroOC").attr("maxlength", 10);
            $("#txtDiasPrestamo").NumeroEntero();
            $("#txtDiasPrestamo").attr("maxlength", 3);
            $("#txtAnio").NumeroEntero();
            $("#txtAnio").attr("maxlength", 4);
            //$("#txtComprobante,#txtRazonSocial,#txtApellidos,#txtNombre").Alfanumerico();

            var self = ko.dataFor(this);
            
        });

        $('#modalRegistrarPrestamo').on('shown.bs.modal', function (e) {

            var self = ko.dataFor(this);

            if (self.modelParent.ModoRegistro() === "C") {
                $("#txtNroComprobante1").attr("disabled", true);
                $("#txtAnio").attr("disabled", true);
                $("#txtFechaPrestamo").attr("disabled", true);
                $("#txtFechaDevolucion").attr("disabled", true);
                $("#txtDiasPrestamo").attr("disabled", true);
                $("#txtDocumentoPrestamo").attr("disabled", true);
                //$("#txtUsuario").attr("disabled", true);
                $("#txtEstados").attr("disabled", true);
                $("#txtDependencias").attr("disabled", true);
                $("#btnGuardar").css("visibility", "hidden");
                $("#myModalLabel").attr("text", "Consultar Préstamo");
                self.titulo("Consultar Préstamo");
            }
            else {
                $("#txtNroComprobante1").attr("disabled", true);
                $("#txtAnio").attr("disabled", true);
                $("#txtFechaPrestamo").attr("disabled", false);
                $("#txtFechaDevolucion").attr("disabled", false);
                $("#txtDiasPrestamo").attr("disabled", false);
                $("#txtDocumentoPrestamo").attr("disabled", false);
                //$("#txtUsuario").attr("disabled", false);
                $("#txtEstados").attr("disabled", false);
                $("#txtDependencias").attr("disabled", false);
                $("#btnGuardar").css("visibility", "visible");

                if (self.modelParent.ModoRegistro() === "M") {
                    $("#txtFechaPrestamo").attr("disabled", true);
                    $("#txtDiasPrestamo").attr("disabled", true);
                    $("#txtDependencias").attr("disabled", true);
                    $("#txtDocumentoPrestamo").attr("disabled", true);
                }
            }

            if (self.modelParent.ModoRegistro() === "M" || self.modelParent.ModoRegistro() === "C") {
                self.MostrarEditar();
                if (self.modelParent.ModoRegistro() === "M") {
                    self.titulo("Modificar Préstamo");
                }
                else {
                    self.titulo("Consultar Préstamo");
                }
            } else {
                $("#txtNroComprobante1").attr("disabled", false);
                $("#txtAnio").attr("disabled", false);
                self.titulo("Registrar Préstamo");
            }            

        });

    });

    function viewModel(params) {

        var self = this;

        //VARIABLES
        self.ns = ns;
        self.enumerado = enumerado;//solo para poder utilizar en la vista
        self.modelParent = params.modelParent;
        self.PrestamoDefault = function () {
            var prestamo = {
                id: 0,
                idComprobantePago: null,
                Usuario: null,
                //UsuarioPrestamo: null,
                //UsuarioPrestamoCodigo: null,
                FechaPrestamo: null,
                FechaDevolucion: null,
                EstadoPrestamo: null,
                idEstadoPrestamo: null,
                CodigoDependencia: null,
                Dependencia: null,
                DiasPrestamo: null,
                DocumentoPrestamo: null,
                NroCP: null,
                Anio: null
            }
            return prestamo;
        }
        self.Prestamo = ko.mapping.fromJS(self.PrestamoDefault());

        self.titulo = ko.observable("");

        //FUNCIONES
        self.modelParent.MostrarRegistrar = function () {
            ko.mapping.fromJS(self.PrestamoDefault(), self.Prestamo);
            self.modelParent.ModoRegistro("I");
            $("#modalRegistrarPrestamo").modal("show");
        }
        self.MostrarEditar = function () {

            self.Prestamo.id(self.modelParent.PrestamoSelected().id_prestamo_comprobante_pago);
            self.Prestamo.idComprobantePago(self.modelParent.PrestamoSelected().id_comprobante_pago);
            self.Prestamo.NroCP(self.modelParent.PrestamoSelected().numero_comprobante_pago);
            //self.Prestamo.UsuarioPrestamo(self.modelParent.PrestamoSelected().usuario_prestamo);
            //self.Prestamo.UsuarioPrestamoCodigo(self.modelParent.PrestamoSelected().usuario_prestamo_codigo);
            self.Prestamo.FechaPrestamo(self.modelParent.PrestamoSelected().fecha_prestamo_str);            
            self.Prestamo.FechaDevolucion(self.modelParent.PrestamoSelected().fecha_devolucion_str);
            self.Prestamo.idEstadoPrestamo(self.modelParent.PrestamoSelected().id_estado_prestamo);
            self.Prestamo.DiasPrestamo(self.modelParent.PrestamoSelected().dias_prestamo);
            self.Prestamo.DocumentoPrestamo(self.modelParent.PrestamoSelected().documento_prestamo);
            self.Prestamo.CodigoDependencia(self.modelParent.PrestamoSelected().codigo_dependencia);
            self.Prestamo.Dependencia(self.modelParent.PrestamoSelected().Dependencia);
            self.Prestamo.Anio(self.modelParent.PrestamoSelected().anio);
        }

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

            var prestamo = ko.mapping.toJS(self.Prestamo);
            prestamo.Opc = '1';

            var url = "/Prestamo/Registrar";
            if (prestamo.id != null && prestamo.id != 0) {
                url = "/Prestamo/Actualizar";
                }

                ko.Confirm({ message: "<b>Está seguro de guardar los datos.?</b>" },
                    function () {
                        ajaxService.Post(ns.URL + url, prestamo
                            , function (response) {
                                if (response.Success) {
                                    alertService.displaySuccessNotification("Se han guardado los datos satisfactoriamente.");
                                    $("#modalRegistrarPrestamo").modal("hide");
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
            //SECTOR
            //if (self.Persona.id_sector() == null) {
            //    message.push("<b>Sector:</b> Debe seleccionar un sector");
            //}

            //TIPO PERSONA
            //if (self.Persona.id_tipo_persona() == null) {
            //    message.push("<b>Tipo de persona:</b> Debe seleccionar un tipo de persona");
            //}

            //TIPO PERSONA
            //if (self.Persona.id_tipo_identificacion() == null) {
            //    message.push("<b>Tipo de identificación:</b> Debe seleccionar un tipo de identificación");
            //} else {

            //    //NUMERO DE DOCUMENTO
            //    debugger;
            //    if (self.Persona.nro_documento() != null && self.Persona.nro_documento().trim() !== "") {
            //        //DNI
            //        var hasNroOk = true;

            //        if (self.Persona.id_tipo_identificacion() == enumerado.TIPO_DOCUMENTO.DNI) {
            //            if (self.Persona.nro_documento().length != 8) {
            //                hasNroOk = false;
            //                message.push("<b>Nro. de documento:</b> El DNI debe tener 8 dígitos.");
            //            }
            //            var testDni = new RegExp("^[0-9]{8}$", 'g');
            //            if (!testDni.test(self.Persona.nro_documento())) {
            //                hasNroOk = false;
            //                message.push("<b>Nro. de documento:</b> El DNI no es correcto.");
            //            }
            //            if (hasNroOk && (self.Persona.nombres() == "" || self.Persona.apellidos() == ""))
            //                message.push("<b>Nombres y Apellidos:</b> Debe buscar el documento ingresado.");
            //        }//RUC
            //        else if (self.Persona.id_tipo_identificacion() == enumerado.TIPO_DOCUMENTO.RUC) {
            //            if (self.Persona.nro_documento().length != 11) {
            //                hasNroOk = false;
            //                message.push("<b>Nro. de documento:</b> El RUC debe tener 11 dígitos.");
            //            }
            //            //var testRuc = new RegExp("^(10|20)[0-9]{9}$", 'g');
            //            var testRuc = new RegExp("^[0-9]{11}$", 'g');
            //            if (!testRuc.test(self.Persona.nro_documento())) {
            //                hasNroOk = false;
            //                message.push("<b>Nro. de documento:</b> El RUC no es correcto.");
            //            }
            //            if (hasNroOk && self.Persona.razon_social() == "")
            //                message.push("<b>Razón Social:</b> Debe buscar el RUC ingresado.");
            //        }
            //    } else {
            //        message.push("<b>Nro. de documento:</b> Debe ingresar en número de documento.");
            //    }

            //}

            //DISTRITO
            //if (self.Persona.codigo_distrito() == null || self.Persona.codigo_distrito() === "") {
            //    message.push("<b>Distrito:</b> Debe seleccionar un Departamento/Provincia/Distrito");
            //}

            //DIRECCION
            //if (self.Persona.direccion() == null || self.Persona.direccion().trim() === "") {
            //    message.push("<b>Dirección:</b> Debe ingresar una dirección");
            //}

            //CELULAR
            //if (self.Persona.celular() != null && self.Persona.celular().trim() !== "") {
            //    var testCelular = new RegExp("^9[0-9]{8}$", 'g');
            //    if (!testCelular.test(self.Persona.celular().trim())) {
            //        message.push("<b>Celular:</b> El número de celular es incorrecto, debe empezar con 9 y tener 9 dígitos.");
            //    }

            //}

            //CORREO
            //if (self.Persona.email() != null && self.Persona.email().trim() !== "") {
            //    debugger;
            //    var testEmail = new RegExp("^[a-zA-Z0-9.!#$%&amp;'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", 'g');
            //    if (!testEmail.test(self.Persona.email().trim())) {
            //        message.push("<b>E-mail:</b> El email no cumple con el formato correcto xxx@xxx.xxx.xx ejem: micorreo@dominio.com, micorreo@dominio.com.pe, etc");
            //    }
            //}
            //else self.Persona.email("");

            //if (self.Persona.representante_legal() != null && self.Persona.representante_legal().trim() == "") {
            //    if (self.Persona.id_tipo_identificacion_rep_leg() == enumerado.TIPO_DOCUMENTO.DNI)
            //        message.push("<b>Representante Legal:</b> Debe buscar el DNI ingresado.");

            //    if (self.Persona.id_tipo_identificacion_rep_leg() == enumerado.TIPO_DOCUMENTO.RUC)
            //        message.push("<b>Representante Legal:</b> Debe buscar el RUC ingresado.");
            //}

            //if (message.length > 0) {
            //    alertService.displayWarningNotification({ Messages: message });
            //    return false;
            //}

            var testMonto = new RegExp("^[0-9.]+$", 'g');

            //if (self.Prestamo.idComprobantePago() == null || self.Prestamo.idComprobantePago() == 0) {
            //    message.push("<b>Nro. Comprobante:</b> El número de comprobante no existe.");
            //}

            if (self.Prestamo.NroCP() == null || self.Prestamo.NroCP() == 0) {
                message.push("<b>Nro. Comprobante:</b> El número de comprobante no existe.");
            }

            if (self.Prestamo.FechaPrestamo() == null) {
                message.push("<b>Fecha Préstamo:</b> Debe seleccionar una fecha de préstamo.");
            }

            if (!testMonto.test(self.Prestamo.DiasPrestamo()) || self.Prestamo.DiasPrestamo() == 0) {
                hasNroOk = false;
                message.push("<b>Días Préstamo:</b> El número de días no es correcto.");
            }

            /*
            if (self.Prestamo.UsuarioPrestamoCodigo() == null) {
                message.push("<b>Usuario Préstamo:</b> Debe seleccionar un usuario para el préstamo.");
            }
            */
            if (self.Prestamo.idEstadoPrestamo() == null) {
                message.push("<b>Estado Préstamo:</b> Debe seleccionar un estado del préstamo.");
            }

            if (self.Prestamo.CodigoDependencia() == null) {
                message.push("<b>Oficina:</b> Debe seleccionar una oficina.");
            }

            if (self.Prestamo.DocumentoPrestamo() == null || self.Prestamo.DocumentoPrestamo() == "") {
                message.push("<b>Documento de Préstamo:</b> Debe ingresar el documento de préstamo");
            }                      

            if ((self.Prestamo.FechaDevolucion == null || self.Prestamo.FechaDevolucion() == "") && self.Prestamo.idEstadoPrestamo() == 2) {
                message.push("<b>Fecha Devolución:</b> Debe seleccionar una fecha de devolución.");                
            }

            if ((self.Prestamo.FechaDevolucion != null && self.Prestamo.FechaDevolucion() != "") && self.Prestamo.idEstadoPrestamo() != 2) {
                message.push("<b>Estado:</b> Si ingreso fecha de devolución, debe seleccionar el estado como DEVUELTO.");                
            }

            if (message.length > 0) {
                alertService.displayWarningNotification({ Messages: message });
                return false;
            }

            return true;
        }
    }
    return {
        viewModel: viewModel,
        /*
        ,template: ``
        */
    };
});
