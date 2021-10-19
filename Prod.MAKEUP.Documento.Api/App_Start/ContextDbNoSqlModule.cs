using Autofac;
using Microsoft.Extensions.Configuration;
using Release.MongoDB.Repository;
using Release.MongoDB.Repository.Base;
using System;
using System.Reflection;

namespace Prod.ArquetipoNetCore.Documento.Host
{
    public class ContextDbNoSqlModule : Autofac.Module
    {
        public static IConfiguration Configuration;

        protected override void Load(ContainerBuilder builder)
        {


            var settings = new DbSettings
            {
                ConnectionString = Configuration.GetSection("ConnectionStrings:DocumentosNoSql").Value
            };

            builder.RegisterType<DataContext>().Named<IDataContext>("contextNoSql").WithParameter("settings", settings).InstancePerLifetimeScope();

            //-> Aplicacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ArquetipoNetCore.Documento")))
                .Where(t => t.Name.EndsWith("Aplicacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsImplementedInterfaces();

            //-> Validacion
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ArquetipoNetCore.Documento")))
                .Where(t => t.Name.EndsWith("Validacion", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();
            //-> Proceso
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ArquetipoNetCore.Documento")))
                .Where(t => t.Name.EndsWith("Proceso", StringComparison.Ordinal) && t.GetTypeInfo().IsClass)
                .AsSelf();

            //Base
            builder.RegisterType<CollectionContext>().WithParameter((c, p) => true, (c, p) => p.ResolveNamed<IDataContext>("contextNoSql")).AsSelf();

            //Repository
            builder.RegisterAssemblyTypes(Assembly.Load(new AssemblyName("Prod.ArquetipoNetCore.Datos.NoSQL")))
                .Where(t => t.Name.EndsWith("Repositorio", StringComparison.Ordinal) && t.IsGenericType == false && t.IsClass == true && t.BaseType.Name.Contains("CustomBaseRepository"))
                .AsImplementedInterfaces()
                .WithParameter((c, p) => true, (c, p) => p.ResolveNamed<IDataContext>("contextNoSql"))
                .InstancePerLifetimeScope();

            builder.RegisterGeneric(typeof(CustomBaseRepository<>))
                .As(typeof(ICustomBaseRepository<>))
                .InstancePerDependency();


        }

    }
}
