using Autofac;
using Microsoft.Extensions.Configuration;
using Prod.MAKEUP.Datos.Contexto;
using Prod.MAKEUP.Datos;

using Release.Helper.Data.Core;
using System;
using System.Reflection;

namespace Prod.MAKEUP.Servicios.Host
{
    public class ContextDbModule : Autofac.Module
    {
        public static IConfiguration Configuration;

        protected override void Load(ContainerBuilder builder)
        {

            #region Base Context

            //Conexion
            string connectionString = Configuration.GetSection("ConnectionStrings:GestorDbContext").Value;

            //Context           
            builder.RegisterType<GestorDbContext>().Named<IDbContext>("contextGestor").WithParameter("connstr", connectionString).InstancePerLifetimeScope();
            //Resolver UnitOfWork
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().WithParameter((c, p) => true, (c, p) => p.ResolveNamed<IDbContext>("contextGestor"));
                       

            //-> Aplicacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.MAKEUP.Core")))
                .Where(t => t.Name.EndsWith("Aplicacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsImplementedInterfaces();               

            //-> Validacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.MAKEUP.Core")))
                .Where(t => t.Name.EndsWith("Validacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();
            //-> Proceso
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.MAKEUP.Core")))
                .Where(t => t.Name.EndsWith("Proceso", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();

            #endregion

            
        }

    }
}
