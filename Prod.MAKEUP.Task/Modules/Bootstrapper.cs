using Autofac;


namespace Prod.ArquetipoNetCore.Task.Modules
{
    internal class Bootstrapper
    {
        public IContainer Build()
        {
            var builder = new ContainerBuilder();                 
            builder.RegisterModule<OperationModule>();
            builder.RegisterModule<ServicesBaseModule>();

            return builder.Build();
        }
    }
}
