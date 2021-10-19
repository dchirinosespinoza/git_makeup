using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Pagination;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class ComprobanteConsultaProxy : BaseProxy
    {
        private readonly string _url;

        public ComprobanteConsultaProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}ComprobanteConsulta/", appConfig.Urls.URL_BUPER_Core_API);

        }
        public PagedResponse<ComprobanteResponse> GetComprobantes(ComprobanteFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<ComprobanteResponse>>(HttpMethod.Get, _url + "GetComprobantes", this.GetJsonParameters(filtro));
        }
        public PagedResponse<ComprobanteResponse> GetComprobanteHistorial(ComprobanteFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<ComprobanteResponse>>(HttpMethod.Get, _url + "GetComprobanteHistorial", this.GetJsonParameters(filtro));
        }
        public StatusResponse<ComprobanteResponse> GetComprobante(ComprobanteFilter filtro)
        {
            return this.InvokeWebApi<StatusResponse<ComprobanteResponse>>(HttpMethod.Get, _url + "GetComprobante", this.GetJsonParameters(filtro));
        }
        public StatusResponse<ComprobanteResponse> GetComprobanteBuscar(ComprobanteFilter filtro)
        {
            return this.InvokeWebApi<StatusResponse<ComprobanteResponse>>(HttpMethod.Get, _url + "GetComprobanteBuscar", this.GetJsonParameters(filtro));
        }
        public PagedResponse<DetalleComprobanteResponse> GetDetalleComprobantes(DetalleComprobanteFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<DetalleComprobanteResponse>>(HttpMethod.Get, _url + "GetDetalleComprobantes", this.GetJsonParameters(filtro));
        }
        public PagedResponse<FlujoComprobanteResponse> GetFlujoComprobantes(FlujoComprobanteFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<FlujoComprobanteResponse>>(HttpMethod.Get, _url + "GetFlujoComprobantes", this.GetJsonParameters(filtro));
        }
        public PagedResponse<ArchivoAdjuntoResponse> GetArchivoAdjunto(ArchivoAdjuntoFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<ArchivoAdjuntoResponse>>(HttpMethod.Get, _url + "GetArchivoAdjunto", this.GetJsonParameters(filtro));
        }
    }

}
