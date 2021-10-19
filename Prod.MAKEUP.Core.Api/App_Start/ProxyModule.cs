using System;
using System.Reflection;
using Autofac;
using Microsoft.Extensions.Configuration;

namespace Prod.MAKEUP.Servicios.Host
{
    public class ProxyModule : Autofac.Module
    {
        public static IConfiguration Configuration;

        protected override void Load(ContainerBuilder builder)
        {
            //Proxy

            //Proxy Externos
           
            base.Load(builder);
        }
    }
}
