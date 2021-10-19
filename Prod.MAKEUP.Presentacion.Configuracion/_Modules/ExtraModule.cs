using Autofac;
using Microsoft.AspNetCore.Hosting;
using Release.Helper.WebKoMvc.Controllers;

namespace Prod.MAKEUP.Presentacion.Configuracion._Modules
{
    public class ExtraModule : Autofac.Module
    {
        public static AppConfig AppConfig;
        public static AppSettings AppSettings;
        public static IHostingEnvironment Environment;

        protected override void Load(ContainerBuilder builder)
        {
            BaseController.BaseConfig.Container = AppSettings.IdContainer;
            BaseController.BaseConfig.Key = AppSettings.Key?.Replace("-", "");
            BaseController.BaseConfig.WebRootPath = Environment.WebRootPath;
            //BaseController.BaseConfig.PathApp = AppSettings.PathApp;

            BaseController.BaseConfig.Settings = new // => ns.CONFIG en el JS
            {
                URL_GA_UI = AppConfig.Urls.URL_GA_UI.TrimEnd('/')
            };

            base.Load(builder);
        }
    }
}
