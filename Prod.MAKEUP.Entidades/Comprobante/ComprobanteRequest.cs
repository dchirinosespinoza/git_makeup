namespace Prod.MAKEUP.Entidades
{
    public class ComprobanteRequest : Comprobante
    {
        public int? id { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string Fecha { get; set; }
        public string NroSIAF { get; set; }
        public string NroOS { get; set; }
        public string NroDO { get; set; }
        public string NroOC { get; set; }
        public string RazonSocial { get; set; }
        public int id_Persona_Empresa { get; set; }
        public string userName { get; set; }
        public int idTipoPago { get; set; }
        public string CodArchivo { get; set; }
        public string CodComprobanteFirmado { get; set; }
        public string NombreComprobanteFirmado { get; set; }
        public string Estado { get; set; }
        public string Opc { get; set; }
        public string TipoHoja { get; set; }
        public string ExpedienteSitradoc { get; set; }
        public int idDependencia { get; set; }
    }
}
