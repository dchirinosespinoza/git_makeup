using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Prod.MAKEUP.Entidades
{
    public class Prestamo
    {       
        public int ID_PRESTAMO_COMPROBANTE_PAGO { get; set; }
        public int ID_COMPROBANTE_PAGO { get; set; }
        public string USUARIO_PRESTAMO { get; set; }
        public int PRESTAMO_CODIGO { get; set; }
        public string FECHA_PRESTAMO { get; set; }
        public string FECHA_DEVOLUCION { get; set; }
        public string ESTADO { get; set; }
        public string USUARIO { get; set; }
        public int ID_ESTADO_PRESTAMO { get; set; }
        public int DIAS_PRESTAMO { get; set; }
    }
}
