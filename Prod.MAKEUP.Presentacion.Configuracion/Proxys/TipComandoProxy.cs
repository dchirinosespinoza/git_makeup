using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class TipComandoProxy : BaseProxy
    {
        private readonly string _url;

        public TipComandoProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}TipComando/", appConfig.Urls.URL_BUPER_Core_API);

        }
        
    }

}
