define(["jquery", "knockout", "fileService", "ns", "alertService", "moment"], function ($, ko, fileService, ns, alertService, moment) {
    function FileInlineModel(params) {
        var self = this;
        self.debugMode = false; //Flag que muestra el contenido del viewModel en pantalla
        self.upLoadFormName = ""; //Nombre que asumirá el tag <form> de subida de archivos
        self.viewHistoryTriggerId = ""; //Nombre del control que activará el popover de lista de versiones de archivo
        self.viewHistoryContainerId = ""; //Nombre del contenedor que mostrará la lista de versiones de archivo
        self.esObligatorio = false; //Indica que el control actual se comportará como obligatorio en el formulario donde se encuentre
        self.usarBorradores = false; //Indica si las subidas de archivos se almacenarán como borradores. Requiere la llamada a "commitDraft" para generar nuevas versiones
        self.codigoValidacion = ko.observable(self.esObligatorio ? 1 : -1);//-1: Estado Inicial, 1: Es Obligatorio y no lo ha seleccionado, 2: Lo ha seleccionado y no lo ha subido, 0: Esta Ok
        self.codigo = ko.observable(""); //IdArchivo al que referencia el presente control
        self.ParamsExtra = params.ParamsExtra; //Conjunto de parámetros para ser leídos por el parent del presente control
        self.Metadata = ko.unwrap(params.Metadata); //Bloque de metadatos del archivo. Espera estructura de datos idéntica a la clase "ArchivoRequestMetadata"
        self.Tags = ko.unwrap(params.Tags); //etiquetas concatenadas (separador: ','). Se almacena en campo "etiqueta" de archivo
        self.nombreArchivo = ko.observable(''); //Nombre del archivo seleccionado/cargado en el control (aparece en la caja de texto mediante el campo 'self.displayText')
        self.inputFileValue = ko.observable(''); //Campo para controlar la seleccion/deseleccion de archivos
        self.displayText = ko.observable(""); //Texto que se mostrará en la caja de texto
        self.defaultDisplayText = ko.unwrap(params.defaultDisplayText); // reemplazo de [Seleccione archivo]
        self.FileSettings = ko.mapping.fromJS({}); //Estructura de parámetros de configuración de archivos. Usa la estructura de la clase "FileSettings"
        self.DisplaySettings = ko.mapping.fromJS({}); //Estructura de flags para mostrar/ocultar (y habilitar/deshabilitar) controles en base a lógica de presentación
        self.HistoryDataSource = ko.observable(null); //Listado de versiones de archivo (fuente de datos) (pagesize = 2 por decision de negocio)
        self.HistoryStatus = ko.observable(null); //Mensaje informativo relacionado al campo "self.HistoryDataSource"

        //Asignando el presente control al parent
        if (params.viewContainer && params.ControlName)
            params.viewContainer[ko.unwrap(params.ControlName)] = self;

        //Funciones utilitarias de presentacion
        self.fnObtenerClaseTamañoControl = function (prefijo, params) {
            if (params == null ||
                params == undefined ||
                params.tamañoControles == null ||
                params.tamañoControles == undefined) return '';

            if (params.tamañoControles === "sm") return prefijo + "-sm";
            else if (params.tamañoControles === "lg") return prefijo + "-lg";
            else return "";

        }
        //Sufijo random para evitar colision de nombres cuando el presente control se renderiza como parte de una lista
        self.fnGenerateRandomSuffix = function () {
            var randomSuffix = ko.unwrap(params.ControlName)
                + "_"
                + Math.floor(Math.random() * 16777215).toString(16);
            return randomSuffix;
        }

        //Asimilación de parámetros
        if (params != undefined) {
            self.codigo(ko.unwrap(params.idArchivo));
            self.debugMode = params.debugMode;

            self.upLoadFormName = "frmUpload_" + self.fnGenerateRandomSuffix();
            self.viewHistoryContainerId = "divViewHistory_" + self.fnGenerateRandomSuffix();
            self.viewHistoryTriggerId = "btnViewHistory_" + self.fnGenerateRandomSuffix();

            self.esObligatorio = ko.unwrap(params.esObligatorio);
            self.usarBorradores = ko.unwrap(params.usarBorradores);

            //FileSettings
            //Manejo de tipos de archivo permitidos como array
            params.tiposPermitidos = ko.unwrap(params.tiposPermitidos);
            if (Array.isArray(params.tiposPermitidos)) {
                params.tiposPermitidos = params.tiposPermitidos.join(", ");
            }
            ko.mapping.fromJS({
                tiposPermitidos: params.tiposPermitidos,
                pesoMaximoEnMB: params.pesoMaximoEnMB
            }, self.FileSettings);

            //Método de obtencion de valores encapsulados en observables y funciones en parámetros
            self.TryGetValue = function (valueOrFunction) {
                if (ko.isObservable(valueOrFunction)) return valueOrFunction;

                valueOrFunction = ko.unwrap(valueOrFunction);
                if (typeof valueOrFunction == 'function') {
                    return valueOrFunction(); //value
                }
                return valueOrFunction; //value
            }
            //método para verificacion de parámetros
            self.IsNullOrUndefined = function (value) {
                return value === null || value === undefined;
            }
            //DisplaySettings
            ko.mapping.fromJS({
                puedeCargarArchivo: self.IsNullOrUndefined(params.puedeCargarArchivo) ? true : self.TryGetValue(params.puedeCargarArchivo),
                puedeDescargarArchivo: self.IsNullOrUndefined(params.puedeDescargarArchivo) ? true : self.TryGetValue(params.puedeDescargarArchivo),
                puedeEliminarArchivo: self.IsNullOrUndefined(params.puedeEliminarArchivo) ? false : self.TryGetValue(params.puedeEliminarArchivo),
                puedeVerHistorialArchivo: self.IsNullOrUndefined(params.puedeVerHistorialArchivo) ? false : self.TryGetValue(params.puedeVerHistorialArchivo),

                CargarArchivoHabilitado: true,
                DescargarArchivoHabilitado: true,
                EliminarArchivoHabilitado: true,
                VerHistorialArchivoHabilitado: true,

                tamañoControles: self.IsNullOrUndefined(params.tamañoControles) ? 'def' : params.tamañoControles,
                claseTamañoInput: self.fnObtenerClaseTamañoControl("input", params),
                claseTamañoBoton: self.fnObtenerClaseTamañoControl("btn", params),

                mostrarCajaDeTexto: self.IsNullOrUndefined(params.mostrarCajaDeTexto) ? true : self.TryGetValue(params.mostrarCajaDeTexto),
                mostrarAlertasExito: (params.mostrarAlertasExito) ? true : self.TryGetValue(params.mostrarAlertasExito)

            }, self.DisplaySettings);
        }

        //Función que determina si el presente control tiene un archivo (código,idArchivo) seleccionado
        self.fnCodigoArchivoSeleccionado = ko.computed({
            read: function () {
                var codigo = self.codigo();
                var codigoValido = (codigo !== null && codigo !== undefined && codigo !== "");
                return codigoValido;
            },
            owner: self
        });
        //Función que determina si el presente control tiene un archivo seleccionado en su <input type=file>
        self.fnArchivoSeleccionado = ko.computed({
            read: function () {

                var inputFileValue = self.inputFileValue();
                var inputFileTieneValor = (inputFileValue !== null && inputFileValue !== undefined && inputFileValue !== "");
                return inputFileTieneValor;
            },
            owner: self
        });

        //Contador de botones habilitados (para ajustes visuales)
        self.fnCalcularCantidadDeAccionesVisibles = function () {
            var totalAccionesVisibles = 0;
            if (self.DisplaySettings.puedeCargarArchivo()) totalAccionesVisibles += 2;
            if (self.DisplaySettings.puedeDescargarArchivo()) totalAccionesVisibles++;
            if (self.DisplaySettings.puedeEliminarArchivo()) totalAccionesVisibles++;
            if (self.DisplaySettings.puedeVerHistorialArchivo()) totalAccionesVisibles++;
            return totalAccionesVisibles;
        }

        //Cálculo de ancho de la acción "Seleccionar archivo". Es un overlay sobre el botón con ícono "paperclip"
        self.fnCalcularAnchoUploader = function () {
            if (self.DisplaySettings.puedeCargarArchivo() === false) return "0px";
            var totalAccionesVisibles = self.fnCalcularCantidadDeAccionesVisibles();
            if (totalAccionesVisibles === 0) return "0px";


            var tamañoControlesActual = self.DisplaySettings.tamañoControles();
            var anchoUploader = "";

            if (tamañoControlesActual === "sm") anchoUploader = "31.5px"; //ancho para damaño "sm"
            else if (tamañoControlesActual === "lg") anchoUploader = "48.5px"; //ancho para damaño "lg"
            else anchoUploader = "37px"; //ancho para damaño "def"

            return anchoUploader;
        }

        self.fnMostrarAcciones = function () {
            var totalAccionesVisibles = self.fnCalcularCantidadDeAccionesVisibles();
            return totalAccionesVisibles > 0;
        }

        self.File = new fileService(ns.CONFIG.URL_GA_UI);

        /*Funciones de negocio*/
        self.fnResetUploadForm = function () {
            var upForm = $("#" + self.upLoadFormName);
            upForm[0].reset();
            self.inputFileValue("");

            //restableciendo el valor de la caja de texto descriptiva
            var inputDisplayText = upForm.find("input[data-rol=displayText]")[0];
            if (inputDisplayText) {
                var displayTextOriginal = self.displayText();
                inputDisplayText.value = (displayTextOriginal);
            }

            //restableciendo el valor de la caja de texto de código
            var inputCodigoRequerido = upForm.find("input[data-rol=txtCodigo]")[0];
            if (inputCodigoRequerido) {
                inputCodigoRequerido.value = self.codigo();
            }
        }

        self.fnFormatearPesoArchivo = function (pesoEnBytes) {
            var pesoEnKBytes = (pesoEnBytes / (1024)).toFixed(0);
            var pesoEnKBytesFormateado = pesoEnKBytes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return pesoEnKBytesFormateado + " " + "KB";
        }

        self.fnLoadData = function () {

            //1)Si no se han personalizado tipos de archivos permitidos o tamaño màximo de archivo, obtener valores por defecto
            var requiereTiposAceptadosPorDefecto = false;
            var requierePesoMaximoPorDefecto = false;

            requiereTiposAceptadosPorDefecto = (self.FileSettings.tiposPermitidos() == undefined ||
                self.FileSettings.tiposPermitidos() == "*");

            requierePesoMaximoPorDefecto = (self.FileSettings.pesoMaximoEnMB() == undefined ||
                self.FileSettings.pesoMaximoEnMB() == "0");

            if (requiereTiposAceptadosPorDefecto || requierePesoMaximoPorDefecto) {

                self.File.GetFileSettings(function (result) {
                    if (requiereTiposAceptadosPorDefecto) {
                        self.FileSettings.tiposPermitidos(result.tiposPermitidos);
                    }
                    if (requierePesoMaximoPorDefecto) {
                        self.FileSettings.pesoMaximoEnMB(result.pesoMaximoEnMB);
                    }
                });
            }

            //2) Obtener 
            if (self.codigo() == null || self.codigo() == undefined || self.codigo() == '') {
                if (self.defaultDisplayText) {
                    self.displayText(self.defaultDisplayText);
                    return;
                }
                self.displayText("[Seleccione archivo.]");
                return;
            }
            self.codigoValidacion(0);

            self.File.GetFileInfo({ id: self.codigo(), BuscarBorrador: self.usarBorradores }, function (result) {

                if (result.Success) {
                    var fileDescription = '';
                    var pesoArchivo = self.fnFormatearPesoArchivo(result.Data.pesoEnBytes);
                    fileDescription = result.Data.nombreOriginal + ' (' + pesoArchivo + ')';
                    self.displayText(fileDescription);
                } else {
                    var errorMessage = '';
                    if (result.Messages != null && result.Messages != undefined && result.Messages.length > 0) {
                        errorMessage = result.Messages[0];
                    } else {
                        errorMessage = 'Ocurrió un error al obtener información del archivo.';
                    }
                    self.displayText("[" + errorMessage + "]");
                    if (result.Data && result.Data.reemplazarDatos) {
                        self.fnSetIdArchivo(null);
                    }
                }
            },
                function (errorData) {
                    var errorMessage = "Error al obtener información del archivo: ";
                    errorMessage += errorData.statusText + " (" + errorData.status + ")";
                    self.displayText(errorMessage);

                });

            if (self.DisplaySettings.puedeVerHistorialArchivo()) {
                self.fnGetFileHistoricalData(self.fnLoadHistoryGrid);
                setTimeout(function () {
                    self.fnBindHistoryPopOver();
                }, 200);
            }

        } //Load Data

        self.fnFileSelect = function (file) {
            if ((file !== undefined) && (file != null)) {
                self.nombreArchivo(file.name);
                self.displayText(file.name);
                self.codigoValidacion(2);
            } else {
                self.nombreArchivo("");
                self.displayText("[Seleccione archivo.]");
                self.codigoValidacion(self.esObligatorio ? 1 : -1);
                return;
            }
        };

        self.fnSetIdArchivo = function (idArchivo, invokeLoadData) {
            self.codigo(idArchivo);
            self.File.idArchivo(idArchivo);
            self.File.paramsRequest.id = idArchivo;

            if (idArchivo === undefined || idArchivo === "" || idArchivo == null) {
                self.fnResetUploadForm();
            }
            if (invokeLoadData === true) {
                self.fnLoadData();
                self.fnBindHistoryPopOver();
            }
        };

        self.fnObtenerFormularioCargaArchivos = function () {
            var form = $("form[id=" + self.upLoadFormName + "]");
            return form;
        };

        self.fnObtenerArchivoSeleccionado = function () {

            var form = self.fnObtenerFormularioCargaArchivos();
            if (form.find("input[type=file]")[0].files.length === 0) return null;

            var objFile = form.find("input[type=file]")[0].files[0];
            return objFile;
        };

        self.fnNotificarArchivoNoSeleccionado = function () {
            var iconoUpload = "<i class='fa fa-paperclip'></i>";
            var msjeSeleccione = "Es necesario seleccionar un archivo para cargar";
            var msjeSeleccioneCompuesto = msjeSeleccione + " (botón " + iconoUpload + ")";

            alertService.displayWarningNotification(msjeSeleccioneCompuesto);
        };

        self.fnFileUpload = function () {
            
            //1) Validar archivo no seleccionado
            var nombreArchivo = $.trim(self.nombreArchivo());
            var objFile = self.fnObtenerArchivoSeleccionado();
            if (nombreArchivo.length === 0 || objFile == null) {
                self.fnNotificarArchivoNoSeleccionado();
                return;
            }

            //2)Validar envío de archivo vacío
            if (objFile.size === 0) {
                var mensajeArchivoVacio = "No se puede cargar un archivo vacío";
                alertService.displayWarningNotification(mensajeArchivoVacio);
                return;
            }
            //3) Validar peso máximo permitido del archivo
            var pesoMaximoAdminitidoEnBytes = self.FileSettings.pesoMaximoEnMB() * 1024 * 1024;
            if (objFile.size > pesoMaximoAdminitidoEnBytes) {
                var mensajeArchivoExcedeLimite = "El archivo excede el tamaño máximo permitido (" +
                    self.FileSettings.pesoMaximoEnMB() +
                    " MB)";

                alertService.displayWarningNotification(mensajeArchivoExcedeLimite);
                return;
            }

            //4) Validar extension de archivo
            var extensionesAceptadas = ko.toJS(self.FileSettings.tiposPermitidos);
            var regExGetExtensionArchivo = /(?:\.([^.]+))?$/;
            var extensionArchivo = regExGetExtensionArchivo.exec(objFile.name)[1];
            var mensajeExtensionNoValida = "No se puede cargar el archivo: extensión no válida.";

            if (!extensionArchivo) {
                alertService.displayWarningNotification(mensajeExtensionNoValida);
                return;
            }
            var arrayExtensionesAceptadas = extensionesAceptadas.replace(/[. ]/g, "").split(",");
            if (arrayExtensionesAceptadas.indexOf(extensionArchivo) == -1) {
                alertService.displayWarningNotification(mensajeExtensionNoValida);
                return;
            }

            //Preparando la subida

            var objFormData = new FormData(self.fnObtenerFormularioCargaArchivos()[0]);
            objFormData.append(nombreArchivo, objFile);
            //{usuarioCreacion :{userName: $('a.dropdown-toggle').text().trim()}}
            var paramsRequestMerged = $.extend(self.File.paramsRequest, { usuarioCreacion: { userName: $('a.dropdown-toggle').text().trim() } });
            paramsRequestMerged = $.extend(paramsRequestMerged, self.ParamsExtra);
            var mergedRequestData = JSON.stringify(ko.mapping.toJS($.extend(paramsRequestMerged, { metadata: self.Metadata, etiqueta: self.Tags })));

            objFormData.append('request', mergedRequestData);
            objFormData.append('maxfileMB', self.FileSettings.pesoMaximoEnMB());
            objFormData.append('esBorrador', self.usarBorradores);

            self.File.UploadFile(objFormData, function (result) {
                if (result.Success) {
                    //Carga de archivo exitosa
                    var pesoArchivo = self.fnFormatearPesoArchivo(result.Data.pesoEnBytes);
                    var fileDescription = result.Data.nombreOriginal + ' (' + pesoArchivo + ')';
                    self.displayText(fileDescription);
                    self.codigo(result.Data.id);

                    if (self.DisplaySettings.mostrarAlertasExito()) {
                        alertService.displaySuccessNotification("El archivo se guardó correctamente");
                    }

                    if ((params.fnCallBackSuccess != undefined) && (typeof params.fnCallBackSuccess == 'function')) {
                        result.operation = 'UploadFile';
                        params.fnCallBackSuccess(result, ko.unwrap(params.ControlName));
                    }
                    self.fnResetUploadForm();
                    self.fnLoadData();
                    //$('#' + self.viewHistoryTriggerId).popover("dispose");
                    self.fnBindHistoryPopOver();
                    self.codigoValidacion(0);
                } else {
                    //Error en carga de archivo
                    var errorMessage = '';
                    if (result.Messages != null && result.Messages != undefined && result.Messages.length > 0) {
                        errorMessage = result.Messages[0];
                    } else {
                        errorMessage = 'Ocurrió un error al obtener información del archivo.';
                    }
                    alertService.displayErrorNotification(errorMessage);
                    self.codigoValidacion(self.esObligatorio ? 1 : -1);
                    if ((params.fnCallBackError != undefined) && (typeof params.fnCallBackError == 'function')) {
                        result.operation = 'UploadFile';
                        params.fnCallBackError(result, ko.unwrap(params.ControlName));
                    }
                }
            },
                function (errorData) {
                    var mensajeError = "Ocurrió un error al cargar el archivo.";
                    if (errorData && errorData.state && ko.unwrap(errorData.state()) === "rejected") {
                        mensajeError = "La carga de archivo fue rechazada por el servidor. Esto puede deberse a que se excedió el tamaño de solicitud máxima permitida.";
                    }
                    alertService.displayErrorNotification(mensajeError);

                    if ((params.fnCallBackError != undefined) && (typeof params.fnCallBackError == 'function')) {
                        errorData.operation = 'UploadFile';
                        params.fnCallBackError(errorData, ko.unwrap(params.ControlName));
                    }
                });
        };

        self.fnFileDownload = function (version) {
            var idArchivo = self.codigo();
            if (idArchivo === undefined || idArchivo === "" || idArchivo === null) {
                var warningMessage = "No se puede solicitar la descarga: Identificador de archivo no válido.";
                alertService.displayWarningNotification(warningMessage);

                return;
            }
            self.File.DownloadFile({ id: idArchivo, version: version, BuscarBorrador: self.usarBorradores });
        };
        self.fnFileDelete = function () {

            //Validar idArchivo establecido
            var idArchivo = self.codigo();
            if (idArchivo === undefined || idArchivo === "" || idArchivo === null) {
                var errorMessage = "No se puede solicitar la eliminación: Identificador de archivo no válido.";
                alertService.displayWarningNotification(errorMessage);
                return;
            }

            ko.Confirm({ message: '¿Está seguro que desea eliminar el elemento?' }, function () {
                var idArchivo = self.codigo();

                self.File.DeleteFile({ id: idArchivo },
                    function (result) {
                        if (result.Success) {
                            //reset de formulario
                            self.fnSetIdArchivo(null);
                            self.nombreArchivo("");
                            self.displayText("[Seleccione archivo.]");
                            self.codigoValidacion(self.esObligatorio ? 1 : -1);
                            //notificacion de eliminacion
                            var mensajeArchivoEliminado = "El archivo fue eliminado correctamente.";
                            if (self.DisplaySettings.mostrarAlertasExito()) {
                                alertService.displaySuccessNotification(mensajeArchivoEliminado);
                            } else {
                                self.displayText(mensajeArchivoEliminado);
                            }
                            //callback de eliminacion exitosa
                            if ((params.fnCallBackSuccess != undefined) && (typeof params.fnCallBackSuccess == 'function')) {
                                result.operation = 'DeleteFile';
                                params.fnCallBackSuccess(result, ko.unwrap(params.ControlName));
                            }

                        } else {

                            var errorMessage = '';
                            if (result.Messages != null && result.Messages != undefined && result.Messages.length > 0) {
                                errorMessage = "Error al eliminar el archivo: " + result.Messages[0];
                            } else {
                                errorMessage = 'Ocurrió un error al eliminar el archivo.';
                            }
                            //notificacion de error en eliminacion
                            alertService.displayErrorNotification(errorMessage);

                            //callback de error en eliminacion
                            if ((params.fnCallBackError != undefined) && (typeof params.fnCallBackError == 'function')) {
                                result.operation = 'DeleteFile';
                                params.fnCallBackError(result, ko.unwrap(params.ControlName));
                            }
                        }
                    },
                    function (errorData) {
                        var errorMessage = "Ocurrió un error al eliminar el archivo.";
                        console.log(errorData);
                        //notificacion de error en eliminacion
                        alertService.displayErrorNotification(errorMessage);
                    });
            });

        };

        self.fnDeleteDraft = function (successCallback) {
            //Validar idArchivo establecido
            var idArchivo = self.codigo();
            if (idArchivo === undefined || idArchivo === "" || idArchivo === null) {
                if ((successCallback != undefined) && (typeof successCallback == 'function')) {
                    successCallback();
                    return;
                }
            }

            self.File.DeleteDraft({ id: idArchivo },
                function (result) {
                    if (result.Success) {
                        if ((successCallback != undefined) && (typeof successCallback == 'function')) {
                            successCallback();
                        }
                    } else {
                        var errorMessage = '';
                        if (result.Messages != null && result.Messages != undefined && result.Messages.length > 0) {
                            errorMessage = "Error al eliminar el archivo: " + result.Messages[0];
                        } else {
                            errorMessage = 'Ocurrió un error al eliminar borrador del archivo.';
                        }
                        //notificacion de error en eliminacion de borrador
                        alertService.displayErrorNotification(errorMessage);
                    }
                },
                function () {
                    var errorMessage = "Ocurrió un error al eliminar el borrador del archivo.";
                    console.log(errorData);
                    //notificacion de error en eliminacion
                    alertService.displayErrorNotification(errorMessage);
                });


        };

        self.fnBindHistoryPopOver = function () {
            if ($('#' + self.viewHistoryTriggerId).popover) {
                $('#' + self.viewHistoryTriggerId).popover("destroy");
            }

            //retraso intencional para dar tiempo de inicializacion al componente
            setTimeout(function () {
                $('#' + self.viewHistoryTriggerId).popover({
                    html: true,
                    placement: 'left',
                    content: $('#' + self.viewHistoryContainerId).html(),
                    title: 'Historial de versiones' +
                    '<button onclick="$(this).closest(\'div.popover\').popover(\'hide\');" type="button" class="btn btn-primary btn-sm popover-header-button" aria-hidden="true"><i class="fa fa-times"></i></button>'
                }).on('inserted.bs.popover',
                    function () {
                        $("div .popover").css("display", "inline-table");
                    })
                    .on('show.bs.popover',
                    function () {
                        self.DisplaySettings.CargarArchivoHabilitado(false);
                        self.DisplaySettings.DescargarArchivoHabilitado(false);
                        self.DisplaySettings.EliminarArchivoHabilitado(false);

                    })
                    .on('shown.bs.popover',
                    function () {
                        $("button[data_rol=btnDownloadVersion]").bind("click", function () {
                            var version = $(this).attr("data_version");
                            self.fnFileDownload(version);
                        });
                    })
                    .on('hide.bs.popover',
                    function () {
                        self.DisplaySettings.CargarArchivoHabilitado(true);
                        self.DisplaySettings.DescargarArchivoHabilitado(true);
                        self.DisplaySettings.EliminarArchivoHabilitado(true);
                    })
                    .on('hidden.bs.popover',
                    function () {
                    })
                    .on('click', function (e) {
                        $("button[data-rol=btnPopOver]").not(this).popover('hide');
                    });
            }, 200);
        }

        self.fnLoadHistoryGrid = function (incomingData) {
            //Validar datos recibidos
            if (!incomingData) {
                self.HistoryDataSource(null);
                self.HistoryStatus({ Success: false, Messages: ["Error: no se pudo obtener datos históricos del archivo."] });
                return;
            }
            if (incomingData.Status.Success === false) {
                self.HistoryDataSource(null);
                self.HistoryStatus(incomingData.Status);
                return;
            }
            if (incomingData.Status.Success === true &&
                (incomingData.Data == null || incomingData.Data.length === 0)) {
                self.HistoryDataSource(null);
                self.HistoryStatus({ Success: false, Messages: ["No se encontró datos históricos del archivo."] });
                return;
            }
            //Transformar y transferir datos a miembros locales
            var digestedDataSource = [];

            for (var i = 0, len = incomingData.Data.length; i < len; i++) {
                var current = incomingData.Data[i];
                var userName = "system";

                if (current.usuarioCreacion) {
                    userName = current.usuarioCreacion.userName ? current.usuarioCreacion.userName : userName;
                }
                digestedDataSource.push({
                    version: current.version,
                    descripcion: current.descripcion,
                    usuarioCreacion: { userName: userName },
                    pesoEnBytes: current.pesoEnBytes,
                    //fechaCreacion: moment(current.fechaCreacion).format('DD/MM/YYYY h:mm:ss A')
                    fechaCreacion: moment(current.fechaCreacion).fromNow()
                });
            }
            self.HistoryDataSource(digestedDataSource);
            self.HistoryStatus(incomingData.Status);
        }
        self.fnFileViewHistory = function () {
            //Validar idArchivo establecido
            var idArchivo = self.codigo();
            if (idArchivo === undefined || idArchivo === "" || idArchivo === null) {
                var errorMessage = "No se puede realizar la operación: Identificador de archivo no válido.";
                alertService.displayWarningNotification(errorMessage);
                return;
            }

            return;

        };

        self.fnGetFileHistoricalData = function (nextStepCallback) {
            self.File.GetFileHistory({ id: self.codigo(), PageSize: 10 }, function (result) {
                nextStepCallback(result);
            },
                function (errorData) {
                    var errorMessage = "Error al obtener información histórica del archivo: ";
                    errorMessage += errorData.statusText + " (" + errorData.status + ")";

                    var errorObject = {
                        Data: null, Status: { Messages: [errorMessage] },
                        Success: false, TotalPages: 0, TotalRows: 0
                    }
                    nextStepCallback(errorObject);
                });
        }
        self.fnLoadDataHistorico = function () {
            if (self.DisplaySettings.puedeVerHistorialArchivo()) {
                self.fnGetFileHistoricalData(self.fnLoadHistoryGrid);
                setTimeout(function () {
                    self.fnBindHistoryPopOver();
                }, 200);
            }
        }
        self.fnResetControl = function () {
            self.codigo(null);
            self.fnLoadData();
        }
        $(document).ready(function () {
            
            if (self.usarBorradores === true) {
                self.fnDeleteDraft(self.fnLoadData);
            } else {
                self.fnLoadData();
            }
            $('[type="file"]').each(function (index, element) { $(element).attr('title', ' ') });
        });
    }
    return {
        viewModel: FileInlineModel
    };

});
