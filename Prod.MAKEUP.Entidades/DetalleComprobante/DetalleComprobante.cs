using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Prod.MAKEUP.Entidades
{
    public class DetalleComprobante
    {       
        public int ID_COMPROBANTE_PAGO { get; set; }
        public int ID_DETALLE_COMPROBANTE_PAGO { get; set; }
        public int ID_CONCEPTO_PAGO { get; set; }
        public string DES_CONCEPTO_PAGO { get; set; }
        public decimal? MONTO { get; set; }
    }
}
