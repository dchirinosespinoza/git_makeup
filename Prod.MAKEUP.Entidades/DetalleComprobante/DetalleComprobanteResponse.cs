using System;

namespace Prod.MAKEUP.Entidades
{
    public class DetalleComprobanteResponse : DetalleComprobante
    {
        public int id_comprobante_pago { get; set; }
        public int id_detalle_comprobante_pago { get; set; }
        public int id_concepto_pago { get; set; }
        public string des_concepto_pago { get; set; }
        public int total_rows { get; set; }
        public decimal? monto { get; set; }
        public string monto_str { get { return String.Format("{0:n}", monto); } }
    }
}
