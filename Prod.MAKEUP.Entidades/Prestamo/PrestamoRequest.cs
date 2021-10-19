namespace Prod.MAKEUP.Entidades
{
    public class PrestamoRequest : Prestamo
    {
        public int? id { get; set; }
        public int? idComprobantePago { get; set; }
        public string FechaPrestamo { get; set; }
        public string FechaDevolucion { get; set; }
        public string UsuarioPrestamo { get; set; }
        public int UsuarioPrestamoCodigo { get; set; }
        public int idEstadoPrestamo { get; set; }
        public int DiasPrestamo { get; set; }
        public string userName { get; set; }
        public int CodigoDependencia { get; set; }
        public string DocumentoPrestamo { get; set; }
        public string Opc { get; set; }
        public string NroCP { get; set; }
        public int Anio { get; set; }
    }
}
