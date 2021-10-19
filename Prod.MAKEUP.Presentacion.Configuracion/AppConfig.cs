using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Presentacion.Configuracion
{
    public class AppConfig {
        public Urls Urls { get; set; }
    }
    public class Urls
    {
        public string URL_GA_UI { get; set; }
        public string URL_BUPER_Core_API { get; set; }

        public string URL_RENIEC_API { get; set; }
        public string URL_SUNAT_API { get; set; }
        public string URL_UBIGEO { get; set; }
        
    }

 
}
