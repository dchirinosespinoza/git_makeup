using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Entidades.Archivo
{
    public class ArchivoByIdResponse
    {
        public string id { get; set; }
        public string contentType { get; set; }
        public string extension { get; set; }
        public byte[] content { get; set; }
        public string mensajeError { get; set; }
    }
}
