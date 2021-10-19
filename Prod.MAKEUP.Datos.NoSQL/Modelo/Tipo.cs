using MongoDB.Bson;
using System;

namespace Prod.ArquetipoNetCore.Datos.NoSQL.Modelo
{
    public class Tipo : IEntity
    {
     

        public bool esActivo { get; set; }
        public bool esBorrado { get; set; }
        public DateTime fechaCreacion { get; set; }
        public DateTime? fechaModificacion { get; set; }
        public ObjectId id { get; set; }
        public string nombre { get; set; }

     
    }



}
