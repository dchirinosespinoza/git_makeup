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
    
    [Table("institucion_disciplina", Schema = "dbo")]
    
    public partial class institucion_disciplina
    {
        
        public institucion_disciplina()
        {
            this.institucion_disciplina_categoria = new HashSet<institucion_disciplina_categoria>();
            this.torneo_disciplina = new HashSet<torneo_disciplina>();
        }
    
    	[Key()]	
    	public int id_institucion_disciplina { get; set; }
    	public int id_institucion { get; set; }
    	public int id_disciplina { get; set; }
    
        public virtual disciplina disciplina { get; set; }
        public virtual institucion institucion { get; set; }
        
        public virtual ICollection<institucion_disciplina_categoria> institucion_disciplina_categoria { get; set; }
        
        public virtual ICollection<torneo_disciplina> torneo_disciplina { get; set; }
    }
}
