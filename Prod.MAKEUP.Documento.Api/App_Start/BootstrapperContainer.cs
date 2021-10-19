using Autofac;
using Microsoft.Extensions.Configuration;

namespace Prod.ArquetipoNetCore.Documento.Host
{
    public static class BootstrapperContainer
    {
        public static IConfiguration Configuration;

        public static void Register(ContainerBuilder builder)
        {
            //Proxy
            ProxyModule.Configuration = Configuration;
            builder.RegisterModule<ProxyModule>();           

            //Add Context No SQL
            ContextDbNoSqlModule.Configuration = Configuration;
            builder.RegisterModule<ContextDbNoSqlModule>();
        }
    }
}
