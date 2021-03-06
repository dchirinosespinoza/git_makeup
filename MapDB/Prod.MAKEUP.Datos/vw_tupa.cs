//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Prod.ArquetipoNetCore.Servicios.Modelo
{
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;
    using System;
    using System.Collections.Generic;
    
    [Table("VW_TUPA", Schema = "dbo")]
    
    public partial class vw_tupa
    {
    	[Key()]	
    	public int id_tupa { get; set; }
    	public Nullable<int> id_clase_tupa { get; set; }
    	public string clase_tupa { get; set; }
    	public string descripcion_tupa { get; set; }
    	public Nullable<int> numero_dias { get; set; }
    	public Nullable<decimal> uit_tupa { get; set; }
    	public Nullable<int> codigo_dependencia { get; set; }
    	public string dependencia { get; set; }
    	public Nullable<int> estado_tupa { get; set; }
    	public string des_estado_tupa { get; set; }
    	public Nullable<int> tipo_aprobacion { get; set; }
    	public Nullable<int> numero_tupa { get; set; }
    	public Nullable<int> id_sector { get; set; }
    	public string des_sector { get; set; }
    	public Nullable<int> id_tipo_silencio { get; set; }
    	public string silencio { get; set; }
    	public Nullable<bool> automatizado { get; set; }
    	public Nullable<int> administrado { get; set; }
    	public Nullable<int> produce { get; set; }
    	public Nullable<bool> siap { get; set; }
    	public string link { get; set; }
    }
}
