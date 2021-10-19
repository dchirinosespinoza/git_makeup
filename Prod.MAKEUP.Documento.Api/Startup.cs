using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json.Serialization;
using Release.MongoDB.Repository;
using Serilog;
using System;

//PKG Source: http://tfs-apptier/produceNuget/nuget
namespace Prod.ArquetipoNetCore.Documento.Host
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            Log.Logger = new LoggerConfiguration()
                            .MinimumLevel.Warning()                            
                            .Enrich.FromLogContext()
                            .WriteTo.File("log/ArquetipoNetCore-.txt", rollingInterval: RollingInterval.Day)                            
                            .CreateLogger();

            var basePath = AppDomain.CurrentDomain.BaseDirectory; //#SDK 2.00

            var builder = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add(new ProducesAttribute("application/json"));
            })
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });

            //For MongoDb 
            BsonSerializer.RegisterSerializer(typeof(DateTime), new BsonUtcDateTimeSerializer());
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            //Register Types
            BootstrapperContainer.Configuration = Configuration;
            BootstrapperContainer.Register(builder);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddSerilog();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
            app.Run(context => context.Response.WriteAsync($"<h1 style='color:Green;'>Prod.ArquetipoNetCore.Documento.API Environment: {env.EnvironmentName}</h1>"));
        }
    }
}
