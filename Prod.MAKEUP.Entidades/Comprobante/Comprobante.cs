using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Prod.MAKEUP.Entidades
{
    public class Comprobante
    {       
        public int ID_COMPROBANTE_PAGO { get; set; }
        public string NUMERO_SIAF { get; set; }
        public string NUMERO_ORDEN_SERVICIO { get; set; }
        public string NUMERO_ORDEN_COMPRA { get; set; }
        public int? ID_TIPO_GIRO { get; set; }
        public int? ID_TIPO_SITUACION { get; set; }
        public string RAZON_SOCIAL { get; set; }
        public string MOTIVO_ANULACION { get; set; }
        public string FECHA_REGISTRO { get; set; }
        public decimal? MONTO { get; set; }
        public string ESTADO { get; set; }
        public string USUARIO { get; set; }
        public int? ID_TIPO_PAGO { get; set; }
        public string DOCUMENTO_OTRO { get; set; }
    }
}
