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
    
    [Table("partido_equipo", Schema = "dbo")]
    
    public partial class partido_equipo
    {
        
        public partido_equipo()
        {
            this.intento = new HashSet<intento>();
        }
    
    	[Key()]	
    	public int id_partido_equipo { get; set; }
    	public int id_partido { get; set; }
    	public int id_equipo { get; set; }
    
        public virtual equipo equipo { get; set; }
        
        public virtual ICollection<intento> intento { get; set; }
        public virtual partido partido { get; set; }
    }
}
