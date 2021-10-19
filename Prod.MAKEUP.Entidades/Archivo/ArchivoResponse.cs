using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Entidades.Archivo
{
    public class ArchivoResponse
    {
        public string id { get; set; }
        public string fileName { get; set; }
        public string mimetype { get; set; }
        public long size { get; set; }
        public byte[] content { get; set; }

        public string idArchivoVersion { get; set; }
        public string nombreOriginal { get; set; }
        public string nombreOficial { get; set; }
        public string descripcion { get; set; }
        public string etiqueta { get; set; }
        public string metadata { get; set; }
        public string contentType { get; set; }
        public long pesoEnBytes { get; set; }
        public int version { get; set; }

        public bool reemplazarDatos { get; set; }

        public DateTime fechaCreacion { get; set; }
        public DateTime? fechaModificacion { get; set; }
        public Usuario usuarioCreacion { get; set; }
        public Usuario usuarioModificacion { get; set; }
    }

    public class PostedFile
    {
        public string id { get; set; }
        public byte[] content { get; set; }
        public string contentType { get; set; }
        public ArchivoRequest extraData { get; set; }
        public string fileName { get; set; }
        public long length { get; set; }
        public int maxfileMB { get; set; }
        public string name { get; set; }
        public bool esBorrador { get; set; }
    }
    public class Usuario
    {
        public string userName { get; set; }

        public string email { get; set; }

        public string tipoUsuario { get; set; }

        public string codRol { get; set; }
    }
}
