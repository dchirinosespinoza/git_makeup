using System;
using Microsoft.AspNetCore.Mvc;
using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Presentacion.Configuracion.Proxys;
using Release.Helper.WebKoMvc.Controllers;
using Release.Helper.WebKoMvc.Filters;
using System.Linq;
using Release.Helper;
using Release.Helper.ReportingServices;
using System.IO;
using System.IO.Compression;
using System.Web;
using Microsoft.AspNetCore.StaticFiles;
using System.Collections.Generic;

namespace Prod.MAKEUP.Presentacion.MVC.Controllers
{
    public partial class TutorialController : CustomBaseController
    {
        private readonly TutorialConsultaProxy _tutorialConsulta;
        private readonly TutorialComandoProxy _tutorialComando;
        private readonly IReportManager _reportManager;

        public TutorialController(TutorialConsultaProxy tutorialConsulta, TutorialComandoProxy tutorialComando, 
            IReportManager reportManager)
        {
            _tutorialConsulta = tutorialConsulta;
            _tutorialComando = tutorialComando;
            _reportManager = reportManager;
        }

        #region VISTA
        [HttpGet]
        //[Route("")]
        [Route("Tutorial")]
        [Route("Tutorial/Index")]
        public IActionResult Index()
        {            
            return View();
        }

        #endregion

        #region GET
        
        #endregion

        #region INSERT/UPDATE/DELETE
       
        #endregion

        
    }
}
