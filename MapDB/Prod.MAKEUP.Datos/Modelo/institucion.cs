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
    
    [Table("institucion", Schema = "dbo")]
    
    public partial class institucion
    {
        
        public institucion()
        {
            this.institucion_disciplina = new HashSet<institucion_disciplina>();
            this.sede = new HashSet<sede>();
            this.torneo = new HashSet<torneo>();
            this.usuario = new HashSet<usuario>();
        }
    
    	[Key()]	
    	public int id_institucion { get; set; }
    
        
        public virtual ICollection<institucion_disciplina> institucion_disciplina { get; set; }
        
        public virtual ICollection<sede> sede { get; set; }
        
        public virtual ICollection<torneo> torneo { get; set; }
        
        public virtual ICollection<usuario> usuario { get; set; }
    }
}
