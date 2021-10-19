using Release.Helper.Pagination;

namespace Prod.MAKEUP.Entidades
{
    public class PrestamoFilter : PagedRequest
    {
        public int? NroPrestamoComprobante { get; set; }
        public int? NroComprobante { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string Usuario { get; set; }
        public string idEstadoPrestamo { get; set; }
        public int? CodigoDependencia { get; set; }
        public int? NroCP { get; set; }
    }
}
