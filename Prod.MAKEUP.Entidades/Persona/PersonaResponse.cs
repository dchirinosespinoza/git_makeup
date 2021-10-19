using System;

namespace Prod.MAKEUP.Entidades
{
    public class PersonaResponse : Persona
    {
        public string id_sector_desc { get; set; }
        public string id_tipo_persona_desc { get; set; }
        public string id_tipo_identificacion_desc { get; set; }
        public string codigo_departamento_desc { get; set; }
        public string codigo_provincia_desc { get; set; }
        public string codigo_distrito_desc { get; set; }
        public string id_tipo_representante_desc { get; set; }
        public DateTime? fecha_auditoria { get; set; }
        public string fecha_auditoria_str { get { return fecha_auditoria.HasValue ? string.Format("{0:dd/MM/yyyy HH:mm:ss}", fecha_auditoria) : string.Empty; } }
        public int total_rows { get; set; }

    }
}
