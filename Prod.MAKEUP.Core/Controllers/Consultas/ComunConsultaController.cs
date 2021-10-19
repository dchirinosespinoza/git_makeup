using Microsoft.AspNetCore.Mvc;
using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Servicios.Applicacion.Interfaces;
using Release.Helper;
using System.Collections.Generic;

namespace Prod.MAKEUP.Servicios.Controllers
{
    [Route("[controller]")]
    public class ComunConsultaController : Controller
    {
        private readonly IComunAplicacion _comunAplicacion;

        public ComunConsultaController(IComunAplicacion comunAplicacion)
        {
            _comunAplicacion = comunAplicacion;
        }
                
        [HttpGet]
        [Route("GetConceptosList")]
        public IEnumerable<Item> GetConceptosList()
        {
            var o = _comunAplicacion.GetConceptosList();
            return o;
        }
                
    }
}
