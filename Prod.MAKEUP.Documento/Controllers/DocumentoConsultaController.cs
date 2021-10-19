using Microsoft.AspNetCore.Mvc;
using Doc = Prod.ArquetipoNetCore.Entidades.Documento;
using Prod.ArquetipoNetCore.Documento.Applicacion.Interfaces;
using Release.Helper.Pagination;
using System.Collections.Generic;

namespace Prod.ArquetipoNetCore.Documento.Controllers
{
    [Route("[controller]")]
    public class DocumentoConsultaController : Controller
    {

        private readonly IDocumentoAplicacion _documentosAplicacion;

        public DocumentoConsultaController(IDocumentoAplicacion documentosAplicacion)
        {
            _documentosAplicacion = documentosAplicacion;
        }

        [HttpGet]
        [Route("BusquedaPaginada")]
        public PagedResponse<Doc.Archivo> BusquedaPaginada([FromBody]Doc.ArchivoFiltro filtro)
        {
            return _documentosAplicacion.BusquedaPaginada(filtro);
        }
        [HttpGet]
        [Route("Archivo")]
        public Doc.Archivo Archivo([FromBody]Doc.ArchivoFiltro filtro)
        {
            return _documentosAplicacion.Archivo(filtro);
        }
    }
}
