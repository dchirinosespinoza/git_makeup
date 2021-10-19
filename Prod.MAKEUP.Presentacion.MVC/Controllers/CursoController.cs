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
    public partial class CursoController : CustomBaseController
    {
        private readonly CursoConsultaProxy _cursoConsulta;
        private readonly CursoComandoProxy _cursoComando;
        private readonly IReportManager _reportManager;

        public CursoController(CursoConsultaProxy cursoConsulta, CursoComandoProxy cursoComando, 
            IReportManager reportManager)
        {
            _cursoConsulta = cursoConsulta;
            _cursoComando = cursoComando;
            _reportManager = reportManager;
        }

        #region VISTA
        [HttpGet]
        //[Route("")]
        [Route("Curso")]
        [Route("Curso/Index")]
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
