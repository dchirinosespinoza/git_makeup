using System;
using Microsoft.AspNetCore.Mvc;
using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Presentacion.Configuracion.Proxys;
using Release.Helper.WebKoMvc.Controllers;
using Release.Helper.WebKoMvc.Filters;
using System.Linq;
using Release.Helper.ReportingServices;

namespace Prod.MAKEUP.Presentacion.MVC.Controllers
{
    public partial class PrestamoController : CustomBaseController
    {
        private readonly PrestamoConsultaProxy _prestamoConsulta;
        private readonly PrestamoComandoProxy _prestamoComando;
        private readonly IReportManager _reportManager;

        public PrestamoController(PrestamoConsultaProxy prestamoConsulta, PrestamoComandoProxy prestamoComando, IReportManager reportManager)
        {
            _prestamoConsulta = prestamoConsulta;
            _prestamoComando = prestamoComando;
            _reportManager = reportManager;
        }

        #region VISTA
        [HttpGet]
        //[Route("")]
        [Route("Prestamo")]
        [Route("Prestamo/Index")]
        public IActionResult Index()
        {            
            return View();
        }


        #endregion

        #region GET
        [HttpGet]
        [Route("Prestamo/getPrestamos")]
        public JsonResult GetPrestamos(PrestamoFilter request)
        {
            var results = _prestamoConsulta.GetPrestamos(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Prestamo/getPrestamo")]
        public JsonResult GetPrestamo(PrestamoFilter request)
        {
            var results = _prestamoConsulta.GetPrestamo(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Prestamo/getPrestamoBuscar")]
        public JsonResult GetPrestamoBuscar(PrestamoFilter request)
        {
            var results = _prestamoConsulta.GetPrestamoBuscar(request);
            return new JsonResult(results);
        }
        
        #endregion

        #region INSERT/UPDATE/DELETE
        [HttpPost]
        [Route("Prestamo/Registrar")]
        public JsonResult Registrar(PrestamoRequest request)
        {
           var results = _prestamoComando.Registrar(request);
            return new JsonResult(results);
        }
        [HttpPost]
        [Route("Prestamo/Actualizar")]
        public JsonResult Actualizar(PrestamoRequest request)
        {
            var results = _prestamoComando.Actualizar(request);
            return new JsonResult(results);
        }
        
        #endregion

        [HttpPost]
        [Route("Prestamo/Exportar")]
        public IActionResult GetExportar(ReporteFilter filter)
        {
            try
            {                
                ReportFormat format = (filter.Formato == "PDF" ? ReportFormat.PDF : (filter.Formato == "XLSX" ? ReportFormat.EXCELOPENXML : ReportFormat.PDF));
                var report = _reportManager.GetReportFromServer(filter.Rdl, format, filter.Parametros);

                return File(report.FileBytes, report.ContentType, $"{filter.NombreReporte}-{DateTime.Now:dd-MM-yyyy}.{filter.Formato.ToLower()}");
            }
            catch (Exception e)
            {
                return Json("Ocurrió un error al descargar");
            }

        }
    }
}
