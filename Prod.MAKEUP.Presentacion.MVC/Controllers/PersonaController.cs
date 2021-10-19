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
    public partial class PersonaController : CustomBaseController
    {
        private readonly PersonaConsultaProxy _personaConsulta;
        private readonly PersonaComandoProxy _personaComando;
        private readonly IReportManager _reportManager;

        public PersonaController(PersonaConsultaProxy personaConsulta, PersonaComandoProxy personaComando, IReportManager reportManager)
        {
            _personaConsulta = personaConsulta;
            _personaComando = personaComando;
            _reportManager = reportManager;
        }

        #region VISTA
        [HttpGet]
        //[Route("")]
        [Route("Persona")]
        [Route("Persona/Index")]
        public IActionResult Index()
        {            
            return View();
        }


        #endregion

        #region GET
        [HttpGet]
        [Route("Persona/getPersonas")]
        public JsonResult GetPersonas(PersonaFilter request)
        {
            if (request.Flag == null) request.Flag = "A";
            var results = _personaConsulta.GetPersonas(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Persona/getPersona")]
        public JsonResult GetPersona(PersonaFilter request)
        {
            var results = _personaConsulta.GetPersona(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Persona/getPersonaBuscar")]
        public JsonResult GetPersonaBuscar(PersonaFilter request)
        {
            var results = _personaConsulta.GetPersonaBuscar(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Persona/getPersonaHistorial")]
        public JsonResult GetPersonaHistorial(PersonaFilter request)
        {
            var results = _personaConsulta.GetPersonaHistorial(request);
            return new JsonResult(results);
        }

        #endregion

        #region INSERT/UPDATE/DELETE
        [HttpPost]
        [Route("Persona/Registrar")]
        public JsonResult Registrar(PersonaRequest request)
        {
           var results = _personaComando.Registrar(request);
            return new JsonResult(results);
        }
        [HttpPost]
        [Route("Persona/Actualizar")]
        public JsonResult Actualizar(PersonaRequest request)
        {
            var results = _personaComando.Actualizar(request);
            return new JsonResult(results);
        }


        #endregion

        [HttpPost]
        [Route("Persona/Exportar")]
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
