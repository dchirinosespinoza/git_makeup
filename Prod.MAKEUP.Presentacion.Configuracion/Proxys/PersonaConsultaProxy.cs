using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Pagination;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class PersonaConsultaProxy : BaseProxy
    {
        private readonly string _url;

        public PersonaConsultaProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}PersonaConsulta/", appConfig.Urls.URL_BUPER_Core_API);

        }
        public PagedResponse<PersonaResponse> GetPersonas(PersonaFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<PersonaResponse>>(HttpMethod.Get, _url + "GetPersonas", this.GetJsonParameters(filtro));
        }
        public PagedResponse<PersonaResponse> GetPersonaHistorial(PersonaFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<PersonaResponse>>(HttpMethod.Get, _url + "GetPersonaHistorial", this.GetJsonParameters(filtro));
        }
        public StatusResponse<PersonaResponse> GetPersona(PersonaFilter filtro)
        {
            return this.InvokeWebApi<StatusResponse<PersonaResponse>>(HttpMethod.Get, _url + "GetPersona", this.GetJsonParameters(filtro));
        }
        public StatusResponse<PersonaResponse> GetPersonaBuscar(PersonaFilter filtro)
        {
            return this.InvokeWebApi<StatusResponse<PersonaResponse>>(HttpMethod.Get, _url + "GetPersonaBuscar", this.GetJsonParameters(filtro));
        }
    }

}
