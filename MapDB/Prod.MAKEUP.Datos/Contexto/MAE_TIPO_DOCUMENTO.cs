//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Prod.BUPER.Datos.Contexto
{
    using System;
    using System.Collections.Generic;
    
    public partial class MAE_TIPO_DOCUMENTO
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MAE_TIPO_DOCUMENTO()
        {
            this.DAT_REGISTRO = new HashSet<DAT_REGISTRO>();
        }
    
        public int id_documento { get; set; }
        public string tipo_documento { get; set; }
        public string nom_documento { get; set; }
        public string estado { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DAT_REGISTRO> DAT_REGISTRO { get; set; }
    }
}