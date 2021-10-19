using Release.Helper.Pagination;

namespace Prod.MAKEUP.Entidades
{
    public class FlujoComprobanteFilter : PagedRequest
    {
        public int? idComprobantePago { get; set; }        
    }
}
