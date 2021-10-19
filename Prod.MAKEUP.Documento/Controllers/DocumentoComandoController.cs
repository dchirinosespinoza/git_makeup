using Microsoft.AspNetCore.Mvc;
using Prod.ArquetipoNetCore.Documento.Applicacion.Interfaces;
using Doc = Prod.ArquetipoNetCore.Entidades.Documento;
using System;
using System.Linq;

namespace Prod.ArquetipoNetCore.Documento.Controllers
{
    [Route("[controller]")]
    public class DocumentoComandoController : Controller
    {

        private readonly IDocumentoAplicacion _documentosAplicacion;

        public DocumentoComandoController(IDocumentoAplicacion documentosAplicacion)
        {
            _documentosAplicacion = documentosAplicacion;
        }

        [HttpGet]
        [Route("GuardarUnArchivo")]
        public Doc.Archivo GuardarUnArchivo()
        {
            var request = new Doc.Archivo
            {
                fechaCreacion = DateTime.Now,
                nombre = "Expediente N°",
                versiones = (Enumerable.Range(1, 3).Select(v => new Doc.Version
                {
                    id = v,
                    nombre = "expediente_n" + v + ".pdf",
                    fechaCreacion = DateTime.Now,
                    tipo = "application/json",
                    tamanio = "50MB"
                })).ToList()

            };

            _documentosAplicacion.GuardarArchivo(request);

            return request;
        }

        [HttpPost]
        [Route("GuardarArchivo")]
        public Doc.Archivo GuardarArchivo([FromBody] Doc.Archivo request)
        {
            var ar = Enumerable.Range(1, 30).Select(c => new Doc.Archivo
            {
                fechaCreacion = DateTime.Now,
                nombre = "Expediente N° " + c,
                versiones = (Enumerable.Range(1, 10).Select(v => new Doc.Version
                {
                    id = v,
                    nombre = "expediente_n" + v + ".pdf",
                    fechaCreacion = DateTime.Now,
                    tipo = "application/json",
                    tamanio = "50MB"
                })).ToList()

            }).ToList();

            _documentosAplicacion.GuardarArchivo(ar);

            return request;
        }

    }
}
