using MongoDB.Driver;
using Prod.ArquetipoNetCore.Datos.NoSQL.Modelo;
using Release.MongoDB.Repository;
using Release.MongoDB.Repository.Base;

namespace Prod.ArquetipoNetCore.Datos.NoSQL.Repositorios
{
    public class ArchivoRepositorio : CustomBaseRepository<Archivo>, IArchivoRepositorio
    {
        public ArchivoRepositorio(IDataContext context) : base(context)
        {
        }       
    }
}
