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
    
    [Table("tiempo", Schema = "dbo")]
    
    public partial class tiempo
    {
    	[Key()]	
    	public int id_tiempo { get; set; }
    	public int id_partido { get; set; }
    
        public virtual partido partido { get; set; }
    }
}
