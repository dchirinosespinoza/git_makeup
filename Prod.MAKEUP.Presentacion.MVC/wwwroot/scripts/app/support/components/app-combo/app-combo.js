define(['knockout', 'ajaxService'], function (ko, ajaxService) {
    function comboViewModel(params) {
        var self = this;
        self.RutaBusqueda = params.RutaBusqueda;
        self.Data = (params.RutaBusqueda === undefined ? ko.mapping.fromJS(params.Data) : ko.mapping.fromJS([]));
        self.TextInput = params.ConTodos ? '--Todos--' : '--Seleccione--';
        self.Input = ko.observable(-1);
        self.Obligatorio = ko.observable(params.Obligatorio ? true : false);
        self.DisplayValue = (params.DisplayValue === undefined ? 'Value' : params.DisplayValue);
        self.DisplayText = (params.DisplayText === undefined ? 'Text' : params.DisplayText);
        self.VerCaption = false;//(params.VerCaption === undefined ? true : params.VerCaption);
        self.AutoLoad = (params.AutoLoad === undefined ? true : params.AutoLoad);
        if (ko.isObservable(params.Enable))
            self.Enable = params.Enable;
        else if (typeof params.Enable == "function")
            self.Enable = (params.Enable() === undefined ? true : params.Enable);
        else
            self.Enable = (params.Enable === undefined ? true : (params.Enable ? true : false));

        //self.Enable = params.Enable == undefined ?true:ko.unwrap(params.Enable);

        if (params.viewContainer && params.Name)
            params.viewContainer[params.Name] = self;

        //Combo GET
        if (self.AutoLoad && params.RutaBusqueda !== undefined) {
            ajaxService.GetWithData(self.RutaBusqueda, params.ParametroExtra ? params.ParametroExtra : {}, function (result) {
                if (!result.Data) {//si no existe Data
                    result.unshift({ Value: '', Text: self.TextInput });
                    ko.mapping.fromJS(result, self.Data);
                } else {
                    result.Data.unshift({ Value: '', Text: self.TextInput });
                    ko.mapping.fromJS(result.Data, self.Data);
                }
                if (params.Input != null && params.Input != undefined) {
                    self.Input(params.Input());
                }
                if (typeof params.fnComplete == "function")
                    params.fnComplete();

            });
        } else {
            if (typeof params.fnComplete == "function")
                params.fnComplete();
        }

        //----------------
        //Subscribe value combo
        self.Input.subscribe(function (newValue) {
            if (params.Input != null && params.Input != undefined) {
                params.Input(newValue == undefined ? params.Input() : newValue);
            }
        });
        //----------------
        /*Funciones de negocio*/
        self.GetData = function (parameters, fnPostLoad) {
            ajaxService.GetWithData(self.RutaBusqueda, parameters, function (result) {
                if (!result.Data) {
                    result.unshift({ Value: '', Text: self.TextInput });
                    ko.mapping.fromJS(result, self.Data);
                } else {
                    result.Data.unshift({ Value: '', Text: self.TextInput });
                    ko.mapping.fromJS(result.Data, self.Data);
                }
                if (fnPostLoad != undefined && fnPostLoad != null) {
                    fnPostLoad(result);
                }
            });
        }
        self.GetDataWithValue = function (parameters, value) {
            ajaxService.GetWithData(self.RutaBusqueda, parameters, function (result) {
                if (!result.Data) {
                    result.unshift({ Value: '', Text: self.TextInput });
                    ko.mapping.fromJS(result, self.Data);
                } else {
                    result.Data.unshift({ Value: '', Text: self.TextInput });
                    ko.mapping.fromJS(result.Data, self.Data);
                }
                self.Input(value);
            });
        }
        self.SetDataWithLocalData = function (array) {
            if (params.RutaBusqueda === undefined) {
                array.unshift({ Value: '', Text: self.TextInput });
                self.Data(array);

            }
        }
        //---------------------
    }
    return {
        viewModel: comboViewModel,
        /*
        ,template: ``
        */
    };

});
