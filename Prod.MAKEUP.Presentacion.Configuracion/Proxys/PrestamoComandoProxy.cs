using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class PrestamoComandoProxy : BaseProxy
    {
        private readonly string _url;

        public PrestamoComandoProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}PrestamoComando/", appConfig.Urls.URL_BUPER_Core_API);

        }
        public StatusResponse Actualizar(PrestamoRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "Actualizar", this.GetJsonParameters(request));
        }

        public StatusResponse Registrar(PrestamoRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "Registrar", this.GetJsonParameters(request));
        }
    }

}
