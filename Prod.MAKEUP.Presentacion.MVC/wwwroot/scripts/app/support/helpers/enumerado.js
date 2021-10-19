/*===================================================================================
 Template T4 for enumerado.js
 14/05/2019 03:19:31
====================================================================================*/
define([], function () {
    "use strict";

    return {


        "SECTOR":
        {
            NONE: 0,
            PESQUERIA: 1,
            INDUSTRIA: 2,
            PRODUCE: 3,
        },

        "TIPO_PERSONA":
        {
            NONE: 0,
            NATURAL: 1,
            JURIDICA: 2,
        },

        "TIPO_DOCUMENTO":
        {
            NONE: 0,
            DNI: 1,
            LE: 2,
            CARNET_DE_EXTRANJERIA: 3,
            BREVETE: 4,
            FOTOCHECK: 5,
            OTROS: 6,
            LIBRETA_MILITAR: 7,
            RUC: 8,
            PASAPORTE: 9,
        },
        DescripcionEnumerado(codigo) {
            var enumerado = this.ENUMERADOS.find(function (item) {
                return item.Value == codigo;
            });
            return enumerado == null ? '' : enumerado.Text;
        },
        DescripcionTipo(codigo) {
            var enumerado = this.TIPOS.find(function (item) {
                return item.Value == codigo;
            });
            return enumerado == null ? '' : enumerado.Text;
        },
        EnumeradoPadre(codigo) {
            var enumerado = this.ENUMERADOS.find(function (item) {
                return item.Value == codigo;
            });
            return enumerado == null ? '' : enumerado.TypeFather;
        }
    };
});
