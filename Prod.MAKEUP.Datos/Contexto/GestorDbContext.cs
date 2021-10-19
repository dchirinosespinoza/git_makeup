
using Microsoft.EntityFrameworkCore;
using Release.Helper.Data.Core;
using Prod.MAKEUP.Datos.Modelo;


namespace Prod.MAKEUP.Datos.Contexto
{
    public partial class GestorDbContext : DbContext, IDbContext
    {
        private readonly string _connstr;

        public GestorDbContext(string connstr)
        {
            this._connstr = connstr;
        }

        public GestorDbContext(DbContextOptions<GestorDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!string.IsNullOrWhiteSpace(this._connstr))
            {                
                optionsBuilder.UseSqlServer(this._connstr, b=>b.UseRowNumberForPaging());
            }
        }
        /*Copiado Manualmente desde /MapDB/Prod.ArquetipoNetCore.Datos */
        public virtual DbSet<persona> persona { get; set; }
        public virtual DbSet<cancha> cancha { get; set; }
        public virtual DbSet<disciplina> disciplina { get; set; }
        public virtual DbSet<equipo> equipo { get; set; }
        public virtual DbSet<fixture> fixture { get; set; }
        public virtual DbSet<institucion> institucion { get; set; }
        public virtual DbSet<institucion_disciplina> institucion_disciplina { get; set; }
        public virtual DbSet<institucion_disciplina_categoria> institucion_disciplina_categoria { get; set; }
        public virtual DbSet<intento> intento { get; set; }
        public virtual DbSet<jugador> jugador { get; set; }
        public virtual DbSet<partido> partido { get; set; }
        public virtual DbSet<partido_equipo> partido_equipo { get; set; }
        public virtual DbSet<perfil> perfil { get; set; }
        public virtual DbSet<persona_disciplina> persona_disciplina { get; set; }
        public virtual DbSet<ranking> ranking { get; set; }
        public virtual DbSet<sede> sede { get; set; }
        public virtual DbSet<set> set { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<tiempo> tiempo { get; set; }
        public virtual DbSet<torneo> torneo { get; set; }
        public virtual DbSet<torneo_disciplina> torneo_disciplina { get; set; }
        public virtual DbSet<torneo_disciplina_categoria> torneo_disciplina_categoria { get; set; }
        public virtual DbSet<usuario> usuario { get; set; }
    }
}
