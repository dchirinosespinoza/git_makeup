using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class ComprobanteComandoProxy : BaseProxy
    {
        private readonly string _url;

        public ComprobanteComandoProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}ComprobanteComando/", appConfig.Urls.URL_BUPER_Core_API);

        }
        public StatusResponse Actualizar(ComprobanteRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "Actualizar", this.GetJsonParameters(request));
        }

        public StatusResponse Registrar(ComprobanteRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "Registrar", this.GetJsonParameters(request));
        }

        public StatusResponse RegistrarDetalle(DetalleComprobanteRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "RegistrarDetalle", this.GetJsonParameters(request));
        }
        public StatusResponse EliminarDetalle(DetalleComprobanteRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "EliminarDetalle", this.GetJsonParameters(request));
        }
        public StatusResponse DescargarAdjuntos(DetalleComprobanteRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "DescargarAdjuntos", this.GetJsonParameters(request));
        }
    }

}
