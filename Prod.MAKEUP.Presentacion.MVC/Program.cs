using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore;

namespace Prod.MAKEUP.Presentacion.MVC
{
    public class Program
    {
        #region Public Methods

        public static void Main(string[] args)
        {            
            BuildWebHost(args).Run(); //#SDK 2.00
        }

        // #SDK 2.00
        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseKestrel(c => c.AddServerHeader = false)
                .ConfigureServices(s => s.AddAutofac())              
                .UseStartup<Startup>()               
                .Build();


        #endregion Public Methods
    }
}
