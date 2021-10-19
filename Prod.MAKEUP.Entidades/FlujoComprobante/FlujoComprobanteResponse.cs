using System;

namespace Prod.MAKEUP.Entidades
{
    public class FlujoComprobanteResponse : FlujoComprobante
    {        
        public string fecha_estado_str { get { return fecha_estado.HasValue ? string.Format("{0:dd/MM/yyyy hh:mm:ss}", fecha_estado) : string.Empty; } }
        public int total_rows { get; set; }
    }
}
