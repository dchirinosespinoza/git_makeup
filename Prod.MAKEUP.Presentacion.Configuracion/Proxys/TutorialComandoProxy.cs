using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Proxy;
using System.Net.Http;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class TutorialComandoProxy : BaseProxy
    {
        private readonly string _url;

        public TutorialComandoProxy(AppConfig appConfig)
        {
            _url = string.Format("{0}CursoComando/", appConfig.Urls.URL_BUPER_Core_API);

        }
        
    }

}
