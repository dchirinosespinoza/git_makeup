using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class PersonaComandoProxy : BaseProxy
    {
        private readonly string _url;

        public PersonaComandoProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}PersonaComando/", appConfig.Urls.URL_BUPER_Core_API);

        }
        public StatusResponse Actualizar(PersonaRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "Actualizar", this.GetJsonParameters(request));
        }
      
        public StatusResponse Registrar(PersonaRequest request)
        {
            return this.InvokeWebApi<StatusResponse>(HttpMethod.Post, _url + "Registrar", this.GetJsonParameters(request));
        }
    }

}
