using Release.Helper.Pagination;

namespace Prod.MAKEUP.Entidades
{
    public class PersonaFilter : PagedRequest
    {
        public int? IdPersona { get; set; }
        public int? TipoPersona { get; set; }
        public int? Sector { get; set; }
        public string Detalle { get; set; }
        public int? TipoIdentificacion { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Flag { get; set; }
    }
}
