using System;

namespace Prod.MAKEUP.Entidades
{
    public class ComprobanteResponse : Comprobante
    {        
        public int id_comprobante_pago { get; set; }
        public string numero_siaf { get; set; }
        public string numero_orden_servicio { get; set; }
        public string numero_orden_compra { get; set; }
        public string documento_otro { get; set; }
        public int? id_tipo_giro { get; set; }
        public int? id_tipo_situacion { get; set; }
        public string razon_social { get; set; }
        public string motivo_anulacion { get; set; }
        public DateTime? fecha_registro { get; set; }
        public string fecha_registro_str { get { return fecha_registro.HasValue ? string.Format("{0:dd/MM/yyyy}", fecha_registro) : string.Empty; } }
        //public string fecha_registro_str { get { return fecha_registro.HasValue ? string.Format("{0:dd/MM/yyyy HH:mm:ss}", fecha_registro) : string.Empty; } }
        public decimal? monto { get; set; }
        public string monto_str { get { return String.Format("{0:n}", monto); } }
        public string estado { get; set; }
        public string usuario { get; set; }
        //public string rolesUsuario { get; set; }
        public int? id_tipo_pago { get; set; }
        public int total_rows { get; set; }
        public bool EditarVisible { get; set; }
        public string cod_archivo { get; set; }
        public int numero_comprobante_pago { get; set; }
        public DateTime? fecha_envio { get; set; }
        public string fecha_envio_str { get { return fecha_envio.HasValue ? string.Format("{0:dd/MM/yyyy}", fecha_envio) : string.Empty; } }
        public DateTime? fecha_recepcion { get; set; }
        public string fecha_recepcion_str { get { return fecha_recepcion.HasValue ? string.Format("{0:dd/MM/yyyy}", fecha_recepcion) : string.Empty; } }
        public string cod_comprobante_firmado { get; set; }
        public string expediente_sitradoc { get; set; }
        public string tipo_hoja_tramite { get; set; }
    }
}
