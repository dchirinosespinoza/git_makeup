define(["jquery"], function ($) {
    "use strict";

    $.validationEngineLanguage.allRules.extend = function (args) {
        if ((args !== null && typeof args === 'object')) {
            for (var i in args) {
                if (args.hasOwnProperty(i)) {
                    this[i] = args[i];
                }
            }
        }
        return this;
    }

    $.validationEngineLanguage.allRules.extend(
        {
            "onlyNumberSp2": {
                "regex": /^[0-9\ ]+$/,
                "alertText": "* Sólo números"
            },
            "onlyLetterSp2": {
                "regex": /^[a-zA-Z\ \']+$/,
                "alertText": "* Sólo letras"
            },
            "onlyLetterSp3": {
                "regex": /^[a-zA-Z\ \']+$/,
                "alertText": "* Sólo letras XXX yyyyyyyyyyyyyyy"
            }
        }
    );

});

