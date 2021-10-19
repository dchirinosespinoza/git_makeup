using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Pagination;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class PrestamoConsultaProxy : BaseProxy
    {
        private readonly string _url;

        public PrestamoConsultaProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}PrestamoConsulta/", appConfig.Urls.URL_BUPER_Core_API);

        }
        public PagedResponse<PrestamoResponse> GetPrestamos(PrestamoFilter filtro)
        {
            return this.InvokeWebApi<PagedResponse<PrestamoResponse>>(HttpMethod.Get, _url + "GetPrestamos", this.GetJsonParameters(filtro));
        }
        public StatusResponse<PrestamoResponse> GetPrestamo(PrestamoFilter filtro)
        {
            return this.InvokeWebApi<StatusResponse<PrestamoResponse>>(HttpMethod.Get, _url + "GetPrestamo", this.GetJsonParameters(filtro));
        }
        public StatusResponse<PrestamoResponse> GetPrestamoBuscar(PrestamoFilter filtro)
        {
            return this.InvokeWebApi<StatusResponse<PrestamoResponse>>(HttpMethod.Get, _url + "GetPrestamoBuscar", this.GetJsonParameters(filtro));
        }        
    }

}
