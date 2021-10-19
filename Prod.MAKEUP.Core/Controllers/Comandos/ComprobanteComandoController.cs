using Microsoft.AspNetCore.Mvc;
using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Servicios.Applicacion.Interfaces;
using Release.Helper;
using Release.Helper.Pagination;

namespace Prod.MAKEUP.Servicios.Controllers
{
    [Route("[controller]")]
    public class ComprobanteComandoController : Controller
    {
        private readonly IComprobanteAplicacion _personaAplicacion;

        public ComprobanteComandoController(IComprobanteAplicacion personaAplicacion)
        {
            _personaAplicacion = personaAplicacion;

        }


        [HttpPost]
        [Route("Registrar")]
        public StatusResponse Registrar([FromBody]ComprobanteRequest request)
        {
            return _personaAplicacion.Registrar(request);
        }
        [HttpPost]
        [Route("Actualizar")]
        public StatusResponse Actualizar([FromBody]ComprobanteRequest request)
        {
            return _personaAplicacion.Actualizar(request);
        }
        [HttpPost]
        [Route("RegistrarDetalle")]
        public StatusResponse RegistrarDetalle([FromBody]DetalleComprobanteRequest request)
        {
            return _personaAplicacion.RegistrarDetalle(request);
        }
        [HttpPost]
        [Route("EliminarDetalle")]
        public StatusResponse EliminarDetalle([FromBody]DetalleComprobanteRequest request)
        {
            return _personaAplicacion.EliminarDetalle(request);
        }
    }
}
