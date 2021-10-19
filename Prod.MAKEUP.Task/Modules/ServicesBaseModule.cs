using System.ServiceProcess;
using Autofac;


namespace Prod.ArquetipoNetCore.Task.Modules
{
    internal class ServicesBaseModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //Servicios
            builder.RegisterType<OperationTask>().As<ServiceBase>().InstancePerLifetimeScope();

        }
    }
}
