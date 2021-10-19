using Autofac;
using Microsoft.Extensions.Configuration;
using Release.Helper.ReportingServices;
using System;
using System.Reflection;

namespace Prod.MAKEUP.Presentacion.Configuracion._Modules
{
    public class ProxyModule : Autofac.Module
    {
        public static AppConfig AppConfig;
        public static IConfiguration Configuration;
        protected override void Load(ContainerBuilder builder)
        {
            //Proxy Local
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.MAKEUP.Presentacion.Configuracion")))
               .Where(type => type.Name.EndsWith("Proxy", StringComparison.Ordinal))
               .AsSelf();

            //Reportes SSRS
            var rc = new ReportConfig();
            Configuration.GetSection("AppConfig:ReportConfig").Bind(rc);
            builder.RegisterType<ReportManager>().As<IReportManager>().WithParameter("config", rc);

            //Proxy Externos
                       
            base.Load(builder);
        }
    }
}
