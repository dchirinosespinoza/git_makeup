define(['knockout', 'ajaxService'], function (ko, ajaxService) {
    function paginatorViewModel(params) {
        var self = this;
        self.Grid = params.grid;
        self.ShowHistory = params.ShowHistory != undefined ? params.ShowHistory: false;
        self.Template = params.Template != undefined ? params.Template : "";
        //---------------------
    }
    return {
        viewModel: paginatorViewModel,
        /*
        ,template: ``
        */
    };

});
