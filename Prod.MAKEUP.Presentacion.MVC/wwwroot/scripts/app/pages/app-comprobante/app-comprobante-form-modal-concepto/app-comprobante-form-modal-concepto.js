define(['jquery', 'knockout', "ns", 'ajaxService', 'alertService', "enumerado", 'domReady', 'grillaService'], function ($, ko, ns, ajaxService, alertService, enumerado, domReady, grillaService) {
    $(document).ready(function () {

        $('#modalRegistrarComprobanteConcepto').on('show.bs.modal', function (e) {

            $("#txtNroComprobante").NumeroEntero();
            $("#txtNroComprobante").attr("maxlength", 10);
            $("#txtNroSIAF").NumeroEntero();
            $("#txtNroSIAF").attr("maxlength", 10);
            $("#txtNroOC").NumeroEntero();
            $("#txtNroOC").attr("maxlength", 10);
            $("#txtNroOS").NumeroEntero();
            $("#txtNroOS").attr("maxlength", 10);
            $("#txtMontoConcepto").commaTextbox();
            $("#txtMontoConcepto").attr("maxlength", 15);
            $("#txtValor").commaTextbox();
            $("#txtValor").attr("maxlength", 15);
            $("#txtExpSitradoc").attr("maxlength", 50);
            //$("#txtComprobante,#txtRazonSocial,#txtApellidos,#txtNombre").Alfanumerico();

            var self = ko.dataFor(this);    
            
        });

        $('#modalRegistrarComprobanteConcepto').on('shown.bs.modal', function (e) {

            var self = ko.dataFor(this);

            if (self.modelParent.ModoRegistro() === "M" || self.modelParent.ModoRegistro() === "C") {
                self.MostrarRegistrarConcepto();
                if (self.modelParent.ModoRegistro() === "M") {
                    self.titulo("Agregar Concepto");
                }
                else {
                    self.titulo("Consultar Comprobante");
                }
            } else {
                self.titulo("Agregar Concepto");
            }

        });

    });

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
                Fecha: null,
                NroOS: null,
                NroOC: null,
                NroCP: null,
                RazonSocial: null,
                Monto: null,
                idTipoPago: null,
                CodArchivo: null,
                CodComprobanteFirmado: null,
                ExpedienteSitradoc: null,
                TipoHoja: null
            }
            return comprobante;
        }
        self.Comprobante = ko.mapping.fromJS(self.ComprobanteDefault());

        self.ComprobanteDetalleDefault = function () {
            var comprobantedetalle = {
                idComprobantePago: 0,
                idDetalleComprobantePago: 0,
                idConceptoPago: 0,
                desConceptoPago: null,
                monto: 0
            }
            return comprobantedetalle;
        }
        self.ComprobanteDetalle = ko.mapping.fromJS(self.ComprobanteDetalleDefault());

        self.GridDetalle = new grillaService(ns.URL + '/Comprobante/getDetalleComprobantes', 10, 1);

        self.titulo = ko.observable("");
        self.ModoRegistro = ko.dataFor(self.modelParent.ModoRegistro());
        
        //FUNCIONES
        self.MostrarRegistrarConcepto = function () {
            ko.mapping.fromJS(self.ComprobanteDefault(), self.Comprobante);

            self.Comprobante.id(self.modelParent.ComprobanteSelected().id_comprobante_pago);
            self.Comprobante.Fecha(self.modelParent.ComprobanteSelected().fecha_registro_str);
            self.Comprobante.NroSIAF(self.modelParent.ComprobanteSelected().numero_siaf);
            self.Comprobante.NroOS(self.modelParent.ComprobanteSelected().numero_orden_servicio);
            self.Comprobante.NroOC(self.modelParent.ComprobanteSelected().numero_orden_compra);
            self.Comprobante.NroCP(self.modelParent.ComprobanteSelected().numero_comprobante_pago);
            self.Comprobante.RazonSocial(self.modelParent.ComprobanteSelected().razon_social);
            self.Comprobante.Monto(self.modelParent.ComprobanteSelected().monto);
            self.Comprobante.idTipoPago(self.modelParent.ComprobanteSelected().id_tipo_pago);
            self.Comprobante.CodArchivo(self.modelParent.ComprobanteSelected().cod_archivo);
            self.Comprobante.CodComprobanteFirmado(self.modelParent.ComprobanteSelected().cod_comprobante_firmado);
            self.Comprobante.TipoHoja(self.modelParent.ComprobanteSelected().tipo_hoja_tramite);
            self.Comprobante.ExpedienteSitradoc(self.modelParent.ComprobanteSelected().expediente_sitradoc);
            self.file.fnSetIdArchivo(self.Comprobante.CodArchivo(), true);
            self.file2.fnSetIdArchivo(self.Comprobante.CodComprobanteFirmado(), true);

            //self.modelParent.ModoRegistro("M");

            self.modelParent.FiltroDet.idComprobantePago = self.modelParent.ComprobanteSelected().id_comprobante_pago;
            
            self.GridDetalle.GetData(ko.mapping.toJS(self.modelParent.FiltroDet));
            self.modelParent.FiltroDet.monto(0);
            self.modelParent.FiltroDet.idConceptoPago(null);
            self.modelParent.FiltroDet.desConceptoPago = "";
            //self.GridDetalle = new grillaService(ns.URL + '/Comprobante/getDetalleComprobantes', 10, 1);

            if (self.modelParent.ModoRegistro() === "C") {
                /*$("#conceptos").css("visibility", "hidden");
                $("#txtValor").css("visibility", "hidden");
                $("#btnConcepto").css("visibility", "hidden");*/
                $("#div_agregar_concepto").css("visibility", "hidden");
            }
            else {
               /* $("#conceptos").css("visibility", "visible");
                $("#txtValor").css("visibility", "visible");
                $("#btnConcepto").css("visibility", "visible");*/
                $("#div_agregar_concepto").css("visibility", "visible");
            }

            $("#modalRegistrarComprobanteConcepto").modal("show");
        }
        self.MostrarEditar = function () {

            self.Comprobante.id(self.modelParent.ComprobanteSelected().id_comprobante_pago);
            self.Comprobante.Fecha(self.modelParent.ComprobanteSelected().fecha_registro_str);
            self.Comprobante.NroSIAF(self.modelParent.ComprobanteSelected().numero_siaf);
            self.Comprobante.NroOS(self.modelParent.ComprobanteSelected().numero_orden_servicio);
            self.Comprobante.NroOC(self.modelParent.ComprobanteSelected().numero_orden_compra);
            self.Comprobante.NroCP(self.modelParent.ComprobanteSelected().numero_comprobante_pago);
            self.Comprobante.RazonSocial(self.modelParent.ComprobanteSelected().razon_social);
            self.Comprobante.Monto(self.modelParent.ComprobanteSelected().monto);
            self.Comprobante.idTipoPago(self.modelParent.ComprobanteSelected().id_tipo_pago);
            self.Comprobante.TipoHoja(self.modelParent.ComprobanteSelected().tipo_hoja_tramite);
            self.Comprobante.ExpedienteSitradoc(self.modelParent.ComprobanteSelected().expediente_sitradoc);
        }

        self.Eliminar = function (item) {           

            self.ComprobanteDetalle.idComprobantePago(item.id_comprobante_pago());
            self.ComprobanteDetalle.idDetalleComprobantePago(item.id_detalle_comprobante_pago());
            self.ComprobanteDetalle.idConceptoPago(item.id_concepto_pago());
            self.ComprobanteDetalle.desConceptoPago(item.des_concepto_pago());
            self.ComprobanteDetalle.monto(item.monto());

            var comprobanteDetElim = {
                idComprobantePago: 0,
                idDetalleComprobantePago: 0,
                idConceptoPago: 0,
                desConceptoPago: null,
                monto: 0
            }        

            comprobanteDetElim.idDetalleComprobantePago = self.ComprobanteDetalle.idDetalleComprobantePago();

            var url = "/Comprobante/EliminarDetalle";

            ko.Confirm({ message: "<b>Está seguro de eliminar el concepto?</b>" },
                function () {
                    ajaxService.Post(ns.URL + url, comprobanteDetElim
                        , function (response) {
                            if (response.Success) {
                                alertService.displaySuccessNotification("Se ha eliminado concepto satisfactoriamente.");
                                $("#modalRegistrarComprobanteConcepto").modal("hide");
                                self.modelParent.Buscar();
                            } else {
                                alertService.displayWarningNotification(response.Messages);
                            }
                        },
                        function (d) {
                            alertService.displayErrorNotification(d);

                        });
                });
        };

        self.AgregarDetalleConcepto = function () {

            var valid = self.ValidarConcepto();

            if (valid) {

                var comprobanteDet = ko.mapping.toJS(self.modelParent.FiltroDet);

                var url = "/Comprobante/RegistrarDetalle";

                ko.Confirm({ message: "<b>Está seguro de agregar el concepto?</b>" },
                    function () {
                        ajaxService.Post(ns.URL + url, comprobanteDet
                            , function (response) {
                                if (response.Success) {
                                    alertService.displaySuccessNotification("Se han guardado los datos satisfactoriamente.");
                                    $("#modalRegistrarComprobanteConcepto").modal("hide");
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
                }

                ko.Confirm({ message: "<b>Está seguro de guardar los datos.?</b>" },
                    function () {
                        ajaxService.Post(ns.URL + url, comprobante
                            , function (response) {
                                if (response.Success) {
                                    alertService.displaySuccessNotification("Se han guardado los datos satisfactoriamente.");
                                    $("#modalRegistrarComprobanteConcepto").modal("hide");
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

        self.ValidarConcepto = function () {
            var message = [];
            var total = 0;

            if (self.modelParent.FiltroDet.idConceptoPago() == null) {
                message.push("<b>Concepto:</b> Debe seleccionar un concepto.");
            }

            var testMonto = new RegExp("^[0-9.]+$", 'g');
            self.modelParent.FiltroDet.monto($("#justNumbers")[0].textContent)
            if (!testMonto.test(self.modelParent.FiltroDet.monto()) || self.modelParent.FiltroDet.monto() == 0) {
                hasNroOk = false;
                message.push("<b>Valor:</b> El valor no es correcto.");
            }
            else {
                $("#template_item_table tbody tr").each(function () {
                    var value = $(this).find(" td:nth-child(3)").html();
                    total = total + parseFloat(value);
                });

                if (isNaN(total)) total = 0;

                if (self.modelParent.ComprobanteSelected().monto < total + parseFloat(self.modelParent.FiltroDet.monto())) {
                    message.push("<b>Monto:</b> El total de conceptos no puede ser mayor al importe del comprobante.");
                }

            }

            if (message.length > 0) {
                alertService.displayWarningNotification({ Messages: message });
                return false;
            }                       
            
            return true;
        }

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
                debugger;
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
                debugger;
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

            //Valor 
            var testMonto = new RegExp("^[0-9.]+$", 'g');
            self.Comprobante.Monto($("#justNumbers")[0].textContent)
            if (!testMonto.test(self.Comprobante.Monto())) {
                hasNroOk = false;
                message.push("<b>Valor:</b> El valor no es correcto.");
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
