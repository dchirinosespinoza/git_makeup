using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Pagination;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class TipConsultaProxy : BaseProxy
    {
        private readonly string _url;

        public TipConsultaProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}TipConsulta/", appConfig.Urls.URL_BUPER_Core_API);

        }
        
    }

}
