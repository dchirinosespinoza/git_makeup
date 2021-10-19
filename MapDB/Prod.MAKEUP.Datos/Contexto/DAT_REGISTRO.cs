//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Prod.BUPER.Datos.Contexto
{
    using System;
    using System.Collections.Generic;
    
    public partial class DAT_REGISTRO
    {
        public int id_registro { get; set; }
        public Nullable<int> id_codigo { get; set; }
        public Nullable<int> id_archivo { get; set; }
        public Nullable<int> id_oficina { get; set; }
        public Nullable<int> id_documento { get; set; }
        public string codigo_tributo { get; set; }
        public string tipo_documento { get; set; }
        public string num_documento { get; set; }
        public string cod_juzgado { get; set; }
        public string num_registro { get; set; }
        public Nullable<decimal> importe { get; set; }
        public Nullable<System.DateTime> fecha_pago { get; set; }
        public string secuencia { get; set; }
        public string digito_chequeo { get; set; }
        public string codigo_oficina { get; set; }
        public string cajero { get; set; }
        public string filler { get; set; }
        public string razsoc_nomape { get; set; }
        public Nullable<System.DateTime> fecha_registro { get; set; }
        public string trama_registro { get; set; }
    
        public virtual DAT_ARCHIVO DAT_ARCHIVO { get; set; }
        public virtual MAE_CODIGO MAE_CODIGO { get; set; }
        public virtual MAE_OFICINA MAE_OFICINA { get; set; }
        public virtual MAE_TIPO_DOCUMENTO MAE_TIPO_DOCUMENTO { get; set; }
    }
}