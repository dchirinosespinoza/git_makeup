using System;
using System.Reflection;
using Autofac;

namespace Prod.ArquetipoNetCore.Task.Modules
{
    public class OperationModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.Load("Prod.ArquetipoNetCore.TaskOperations"))
                .Where(type => type.Name.EndsWith("Operation", StringComparison.Ordinal))
                .AsSelf();

        }
    }
}
