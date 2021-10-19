using Release.Helper.Pagination;

namespace Prod.MAKEUP.Entidades
{
    public class ComprobanteFilter : PagedRequest
    { 
        public int? NroComprobante { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string NroSIAF { get; set; }
        public string NroOS { get; set; }
        public string NroOC { get; set; }
        public string NroDO { get; set; }
        public string NroCP { get; set; }
        public string Estado { get; set; }
        public int Anio { get; set; }
        public string RazonSocial { get; set; }
    }
}
