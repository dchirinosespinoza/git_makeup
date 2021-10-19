using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Prod.MAKEUP.Entidades
{
    public class FlujoComprobante
    {       
        public int id_comprobante_pago { get; set; }
        public string accion { get; set; }
        public string destino { get; set; }
        public DateTime? fecha_estado { get; set; }
    }
}
