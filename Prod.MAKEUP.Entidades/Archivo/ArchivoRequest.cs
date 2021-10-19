using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Entidades.Archivo
{
    public class ArchivoRequest
    {
        public ArchivoRequest()
        {
            metadata = new ArchivoRequestMetadata();
        }

        public string id { get; set; }
        public long size { get; set; }
        public string fileName { get; set; }
        public byte[] content { get; set; }
        public string mimetype { get; set; }
        public bool esTemporal { get; set; }

        public int version { get; set; } //para obtencion de version especifica de Archivo
        public string idArchivoVersion { get; set; }
        public string nombreOriginal { get; set; }
        public string nombreOficial { get; set; }
        public string descripcion { get; set; }
        public string etiqueta { get; set; }
        public string contentType { get; set; }
        public long pesoEnBytes { get; set; }
        public Usuario usuarioCreacion { get; set; }

        public ArchivoRequestMetadata metadata { get; set; }
        public byte[] fileAsByteArray { get; set; }

    }
    public class ArchivoRequestMetadata
    {
        public string NumeroExpediente { get; set; }
        public string IdProceso { get; set; }
        public string IdProcesoPaso { get; set; }
        public string IdProcesoBandeja { get; set; }
        public TipoArchivo TipoArchivo { get; set; }
    }
    public enum TipoArchivo
    {
        NoDefinido = 0,
        Estudio = 1,
        Requisito = 2,
        Anexo = 3,
        DocumentoOficial = 4
    }
}
