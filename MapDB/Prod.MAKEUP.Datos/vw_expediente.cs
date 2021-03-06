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
    
    [Table("VW_EXPEDIENTE", Schema = "dbo")]
    
    public partial class vw_expediente
    {
    	[Key()]	
    	public int id_documento { get; set; }
    	public string numero_expediente { get; set; }
    	public string clase_documento { get; set; }
    	public string indicativo_oficio { get; set; }
    	public string asunto { get; set; }
    	public string fecha { get; set; }
    	public string razon_social { get; set; }
    	public Nullable<int> id_persona { get; set; }
    	public Nullable<int> id_clase_documento_interno { get; set; }
    	public System.DateTime fecha_registro { get; set; }
    	public Nullable<int> estado_documento { get; set; }
    	public string estado { get; set; }
    }
}
