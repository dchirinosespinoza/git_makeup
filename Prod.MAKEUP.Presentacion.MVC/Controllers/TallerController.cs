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
    public partial class TallerController : CustomBaseController
    {
        private readonly TallerConsultaProxy _tallerConsulta;
        private readonly TallerComandoProxy _tallerComando;
        private readonly IReportManager _reportManager;

        public TallerController(TallerConsultaProxy tallerConsulta, TallerComandoProxy tallerComando, 
            IReportManager reportManager)
        {
            _tallerConsulta = tallerConsulta;
            _tallerComando = tallerComando;
            _reportManager = reportManager;
        }

        #region VISTA
        [HttpGet]
        //[Route("")]
        [Route("Taller")]
        [Route("Taller/Index")]
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
