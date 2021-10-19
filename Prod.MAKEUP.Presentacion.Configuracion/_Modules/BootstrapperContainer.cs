using Autofac;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;


namespace Prod.MAKEUP.Presentacion.Configuracion._Modules
{
    public static class BootstrapperContainer
    {
        public static IConfiguration Configuration;
        public static IHostingEnvironment Environment;

        public static void Register(ContainerBuilder builder)
        {
            //Variables
            var appConfig = new AppConfig();
            Configuration.GetSection("AppConfig").Bind(appConfig);
            builder.Register(c => appConfig);

            var appSettings = new AppSettings();
            Configuration.GetSection("AppSettings").Bind(appSettings);

            //Extras
            ExtraModule.AppConfig = appConfig;
            ExtraModule.AppSettings = appSettings;
            
            ExtraModule.Environment = Environment;
            builder.RegisterModule<ExtraModule>();

            //Proxys  
            ProxyModule.AppConfig = appConfig;
            ProxyModule.Configuration = Configuration;
            builder.RegisterModule<ProxyModule>();
        }
    }
}
