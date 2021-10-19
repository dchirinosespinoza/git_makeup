using Microsoft.AspNetCore.Mvc;
using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Servicios.Applicacion.Interfaces;
using Release.Helper;
using Release.Helper.Pagination;

namespace Prod.MAKEUP.Servicios.Controllers
{
    [Route("[controller]")]
    public class ComprobanteConsultaController : Controller
    {
        private readonly IComprobanteAplicacion _comprobanteAplicacion;

        public ComprobanteConsultaController(IComprobanteAplicacion comprobanteAplicacion)
        {
            _comprobanteAplicacion = comprobanteAplicacion;

        }
        [HttpGet]
        [Route("GetComprobantes")]
        public PagedResponse<ComprobanteResponse> GetComprobantes([FromBody]ComprobanteFilter filtro)
        {
            return _comprobanteAplicacion.GetComprobantes(filtro);
        }

        
        [HttpGet]
        [Route("GetComprobante")]
        public StatusResponse<ComprobanteResponse> GetComprobante([FromBody]ComprobanteFilter filtro)
        {
            return _comprobanteAplicacion.GetComprobante(filtro);
        }

        [HttpGet]
        [Route("GetDetalleComprobantes")]
        public PagedResponse<DetalleComprobanteResponse> GetDetalleComprobantes([FromBody]DetalleComprobanteFilter filtro)
        {
            return _comprobanteAplicacion.GetDetalleComprobantes(filtro);
        }

        [HttpGet]
        [Route("GetFlujoComprobantes")]
        public PagedResponse<FlujoComprobanteResponse> GetFlujoComprobantes([FromBody]FlujoComprobanteFilter filtro)
        {
            return _comprobanteAplicacion.GetFlujoComprobantes(filtro);
        }

        [HttpGet]
        [Route("GetArchivoAdjunto")]
        public PagedResponse<ArchivoAdjuntoResponse> GetArchivoAdjunto([FromBody]ArchivoAdjuntoFilter filtro)
        {
            return _comprobanteAplicacion.GetArchivoAdjunto(filtro);
        }

    }
}
