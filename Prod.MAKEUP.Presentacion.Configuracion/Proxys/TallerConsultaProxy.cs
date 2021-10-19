using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Pagination;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class TallerConsultaProxy : BaseProxy
    {
        private readonly string _url;

        public TallerConsultaProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}TallerConsulta/", appConfig.Urls.URL_BUPER_Core_API);

        }
        
    }

}
