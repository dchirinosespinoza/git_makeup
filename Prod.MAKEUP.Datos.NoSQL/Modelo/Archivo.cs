using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Prod.ArquetipoNetCore.Datos.NoSQL.Modelo
{
    public class Archivo : IEntity
    {


        public bool esActivo { get; set; }
        public bool esBorrado { get; set; }
        public DateTime fechaCreacion { get; set; }
        public DateTime? fechaModificacion { get; set; }
        public ObjectId id { get; set; }
        public string nombre { get; set; }
        public List<Version> versiones { get; set; }


    }

    public class Version//: IEntity
    {        
        [BsonId()]
        public int id { get; set; }
        public string nombre { get; set; }
        public string tipo { get; set; }
        public string tamanio { get; set; }
        public DateTime fechaCreacion { get; set; }
        public bool esBorrado { get; set; }
        public bool esActivo { get; set; }
    }
}
