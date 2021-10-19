using System;

namespace Prod.MAKEUP.Entidades
{
    public class PrestamoResponse : Prestamo
    {        
        public int id_comprobante_pago { get; set; }
        public int id_prestamo_comprobante_pago { get; set; }
        //public string usuario_prestamo { get; set; }
        //public int usuario_prestamo_codigo { get; set; }
        public DateTime? fecha_prestamo { get; set; }
        public DateTime? fecha_devolucion { get; set; }
        public string fecha_prestamo_str { get { return fecha_prestamo.HasValue ? string.Format("{0:dd/MM/yyyy}", fecha_prestamo) : string.Empty; } }
        public string fecha_devolucion_str { get { return fecha_devolucion.HasValue ? string.Format("{0:dd/MM/yyyy}", fecha_devolucion) : string.Empty; } }
        public string estado { get; set; }
        public int id_estado_prestamo { get; set; }
        public string des_estado_prestamo { get; set; }
        public string usuario { get; set; }
        public int dias_prestamo { get; set; }
        public int dias_en_prestamo { get; set; }
        public int codigo_dependencia { get; set; }
        public string dependencia { get; set; }
        public string documento_prestamo { get; set; }
        public int numero_comprobante_pago { get; set; }
        public int anio { get; set; }
        public int total_rows { get; set; }        
    }
}
