using Prod.MAKEUP.Enumerados;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Entidades
{
    public class ReporteFilter
    {
        public string NombreReporte { get; set; }
        public string Rdl { get; set; }
        public Dictionary<string, string> Parametros { get; set; }
        public string Formato { get; set; }
        //public string ContenType
        //{
        //    get
        //    {
        //        var result = "PDF";
        //        if (Formato.ToUpper() == "PDF")
        //        {
        //            result = CONTENT_TYPE.PDF;
        //        }
        //        else if (Formato.ToUpper() == "EXCEL")
        //        {
        //            result = CONTENT_TYPE.EXCEL;
        //        }

        //        return result;
        //    }
        //}
    }
}
