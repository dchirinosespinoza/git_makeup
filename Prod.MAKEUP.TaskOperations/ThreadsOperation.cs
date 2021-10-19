



/*===================================================================================
 Template T4 for Tareas
 NO Editar ni Agregar Manualmente rutinas
 Lectura de Prod.WF.Task\ConfiguracionTarea.xml

 Fecha de Generacion : 15/08/2018 04:52:29
===================================================================================*/
using System.Collections.Generic;
using Release.Helper.Task.BaseService;
using Prod.WF.TaskOperations.Operations;

namespace Prod.ArquetipoNetCore.TaskOperations
{
	public partial class ThreadsOperation 
	{ 
		public IList<TareaBase> Items;

        public ThreadsOperation
            (
             EjecutaExtraccionOperation ejecutaExtraccionOperation
            )
        {

            //id tareas en "ConfiguracionTarea.xml"
			          
            ejecutaExtraccionOperation.IdTarea = "EjecutaExtraccionOperation";

            Items = new List<TareaBase>
            {
                ejecutaExtraccionOperation,               
            };
        }
	}
}
