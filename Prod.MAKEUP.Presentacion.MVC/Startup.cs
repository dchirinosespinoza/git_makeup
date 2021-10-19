using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Prod.MAKEUP.Presentacion.Configuracion._Modules;
using Release.Helper.WebKoMvc.Common;
using Release.Helper.WebKoMvc.Controllers;
using Serilog;
using System;
using Prod.MAKEUP.Presentacion.Configuracion;

//PKG Source: http://tfs-apptier/produceNuget/nuget

namespace Prod.MAKEUP.Presentacion.MVC
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }
        public IHostingEnvironment Environment { get; set; }

        public Startup(IHostingEnvironment env)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Warning()               
                .Enrich.FromLogContext()
                .WriteTo.File("Log/Log-.txt", rollingInterval: RollingInterval.Day)                
                .CreateLogger();

            var basePath = AppDomain.CurrentDomain.BaseDirectory; //#SDK 2.00

            var builder = new ConfigurationBuilder()
                .SetBasePath(basePath)                
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true)          
                .AddEnvironmentVariables();
            Configuration = builder.Build();
            Environment = env;

            BaseController.StartConfig(); //Leer Config 
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {           
            loggerFactory.AddSerilog();
            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();
                        

            app.UseMvc(routes =>
            {
                Areas(routes);

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {           
            //Encryts
            HelperHttp.AllowEncrypt = true;
            HelperHttp.WebRootPath = Environment.WebRootPath;

            var da = new AppConfig();
            Configuration.GetSection("AppConfig").Bind(da);

            //Register Types
            BootstrapperContainer.Configuration = this.Configuration;
            BootstrapperContainer.Environment = this.Environment;           
            BootstrapperContainer.Register(builder);
        }

        public void ConfigureServices(IServiceCollection services)
        {            
            services.AddMvc(o =>
            {
                o.Filters.Add(new ProducesAttribute("application/json"));
                o.Filters.Add(new Release.Helper.WebKoMvc.Filters.SecureResponseRequestAttribute());
            }).AddJsonOptions(o =>
                {
                    o.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });
        }

        private void Areas(IRouteBuilder routes)
        {
            routes.MapRoute(
                name: "area",
                template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
        }


    }
}
