using Release.Helper.Pagination;

namespace Prod.MAKEUP.Entidades
{
    public class DetalleComprobanteFilter : PagedRequest
    {
        public int? idComprobantePago { get; set; }
        public int idDetalleComprobantePago { get; set; }
        public int idConceptoPago { get; set; }
        public string desConceptoPago { get; set; }
        public decimal? monto { get; set; }
        public string userName { get; set; }
    }
}
