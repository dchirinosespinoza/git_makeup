using Prod.ArquetipoNetCore.TaskOperations;
using Release.Helper.Task.BaseService;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace Prod.ArquetipoNetCore.Task
{
    public partial class OperationTask : BaseServiceBase
    {
        public OperationTask(ThreadsOperation threadsOperacion)
        {

            ListaOperaciones = threadsOperacion.Items;
            InitializeComponent();
        }
    }
}
