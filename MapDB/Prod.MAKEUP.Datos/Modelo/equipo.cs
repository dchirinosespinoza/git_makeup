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
    
    [Table("equipo", Schema = "dbo")]
    
    public partial class equipo
    {
        
        public equipo()
        {
            this.partido_equipo = new HashSet<partido_equipo>();
        }
    
    	[Key()]	
    	public int id_equipo { get; set; }
    	public int id_torneo_disciplina_categoria { get; set; }
    
        public virtual torneo_disciplina_categoria torneo_disciplina_categoria { get; set; }
        
        public virtual ICollection<partido_equipo> partido_equipo { get; set; }
    }
}
