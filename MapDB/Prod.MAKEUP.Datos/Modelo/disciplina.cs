//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Prod.MAKEUP.Datos.Modelo
{
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;
    using System;
    using System.Collections.Generic;
    
    [Table("disciplina", Schema = "dbo")]
    
    public partial class disciplina
    {
        
        public disciplina()
        {
            this.institucion_disciplina = new HashSet<institucion_disciplina>();
            this.persona_disciplina = new HashSet<persona_disciplina>();
        }
    
    	[Key()]	
    	public int id_disciplina { get; set; }
    	public string disciplina1 { get; set; }
    
        
        public virtual ICollection<institucion_disciplina> institucion_disciplina { get; set; }
        
        public virtual ICollection<persona_disciplina> persona_disciplina { get; set; }
    }
}