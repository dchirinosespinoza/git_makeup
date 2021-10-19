using Release.Helper;
using Release.Helper.Proxy;
using Release.Helper.Task.BaseService;
using System.Net.Http;
using System.Threading;
using System.Linq;
using System;

namespace Prod.WF.TaskOperations.Operations
{
    public class EjecutaExtraccionOperation : TareaBase
    {


        public EjecutaExtraccionOperation()
        {

            #if DEBUG
            Test();
            #endif
        }

        private void Test()
        {
            Continua = true;
            IdTarea = "EjecutaExtraccionOperation";

            string ruta = Environment.CurrentDirectory;
            ProcesoTarea.Leer(Environment.CurrentDirectory.Replace("bin", "") + "ConfiguracionTarea.xml");
            EjecutarTarea();
        }


        protected override void EjecutarTarea()
        {
            new OperationManager().RunOperation(IdTarea, Continua, Estado, () =>
             {               

                #if DEBUG

                 Console.WriteLine("Tarea ejecutada :" + IdTarea + "a las :" + DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss"));

                #endif
             });

            Thread.CurrentThread.Abort();
        }
    }
}