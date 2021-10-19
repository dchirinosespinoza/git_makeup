using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class TallerComandoProxy : BaseProxy
    {
        private readonly string _url;

        public TallerComandoProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}TallerComando/", appConfig.Urls.URL_BUPER_Core_API);

        }
        
    }

}
