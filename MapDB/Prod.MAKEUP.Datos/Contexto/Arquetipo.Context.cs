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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ArquetipoDbContext : DbContext
    {
        public ArquetipoDbContext()
            : base("name=ArquetipoDbContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CAT_CONFIGURACION_CAMPOS> CAT_CONFIGURACION_CAMPOS { get; set; }
        public virtual DbSet<CAT_PARAMETROS> CAT_PARAMETROS { get; set; }
        public virtual DbSet<DAT_ARCHIVO> DAT_ARCHIVO { get; set; }
        public virtual DbSet<DAT_CODIGO_TUPA> DAT_CODIGO_TUPA { get; set; }
        public virtual DbSet<DAT_REGISTRO> DAT_REGISTRO { get; set; }
        public virtual DbSet<ENUMERADO> ENUMERADO { get; set; }
        public virtual DbSet<H_DEPENDENCIA> H_DEPENDENCIA { get; set; }
        public virtual DbSet<MAE_CODIGO> MAE_CODIGO { get; set; }
        public virtual DbSet<MAE_OFICINA> MAE_OFICINA { get; set; }
        public virtual DbSet<MAE_TIPO_DOCUMENTO> MAE_TIPO_DOCUMENTO { get; set; }
        public virtual DbSet<TIPO_ENUMERADO> TIPO_ENUMERADO { get; set; }
        public virtual DbSet<PERSONA> PERSONA { get; set; }
        public virtual DbSet<TUPA> TUPA { get; set; }
        public virtual DbSet<enumerados> enumerados { get; set; }
        public virtual DbSet<VW_DAT_CODIGO_TUPA> VW_DAT_CODIGO_TUPA { get; set; }
        public virtual DbSet<PERSONA1> PERSONA1Set { get; set; }
        public virtual DbSet<SECTOR> SECTOR { get; set; }
        public virtual DbSet<TIPO_PERSONA> TIPO_PERSONA { get; set; }
    }
}
