using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Prod.MAKEUP.Entidades
{
    public class Persona
    {
        public int id { get; set; }
        public int id_sector { get; set; }
        public int id_tipo_persona { get; set; }
        public string codigo_departamento { get; set; }
        public string codigo_provincia { get; set; }
        public string codigo_distrito { get; set; }
        public int id_tipo_identificacion { get; set; }
        public string rubro { get; set; }
        public string razon_social { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public string nro_documento { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public string fax { get; set; }
        public string email { get; set; }
        public string representante_legal { get; set; }
        public string nro_documento_representante { get; set; }
        public int? id_tipo_identificacion_rep_leg { get; set; }
        public int? codigo_puerto { get; set; }
        public string flag { get; set; }
        public string usuario { get; set; }
        public string observaciones { get; set; }
        public string celular { get; set; }
        public int? id_aura { get; set; }
        public string flag_oec { get; set; }
        public string nro_docpernatural { get; set; }
        public int? id_tipo_organizacion { get; set; }


    }
}
