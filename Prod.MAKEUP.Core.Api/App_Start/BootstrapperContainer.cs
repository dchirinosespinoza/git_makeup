using Autofac;
using Microsoft.Extensions.Configuration;

namespace Prod.MAKEUP.Servicios.Host
{
    public static class BootstrapperContainer
    {
        public static IConfiguration Configuration;

        public static void Register(ContainerBuilder builder)
        {
            //Proxy
            ProxyModule.Configuration = Configuration;
            builder.RegisterModule<ProxyModule>();

            //Add Context
            ContextDbModule.Configuration = Configuration;
            builder.RegisterModule<ContextDbModule>();
            
        }
    }
}
