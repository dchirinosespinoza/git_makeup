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
    public partial class ComprobanteController : CustomBaseController
    {
        private readonly ComprobanteConsultaProxy _comprobanteConsulta;
        private readonly ComprobanteComandoProxy _comprobanteComando;
        private readonly IReportManager _reportManager;

        public ComprobanteController(ComprobanteConsultaProxy comprobanteConsulta, ComprobanteComandoProxy comprobanteComando, 
            IReportManager reportManager)
        {
            _comprobanteConsulta = comprobanteConsulta;
            _comprobanteComando = comprobanteComando;
            _reportManager = reportManager;
        }

        #region VISTA
        [HttpGet]
        //[Route("")]
        [Route("Comprobante")]
        [Route("Comprobante/Index")]
        public IActionResult Index()
        {            
            return View();
        }


        #endregion

        #region GET
        [HttpGet]
        [Route("Comprobante/getComprobantes")]
        public JsonResult GetComprobantes(ComprobanteFilter request)
        {            
            var results = _comprobanteConsulta.GetComprobantes(request);
                        
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Comprobante/getComprobante")]
        public JsonResult GetComprobante(ComprobanteFilter request)
        {
            var results = _comprobanteConsulta.GetComprobante(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Comprobante/getComprobanteBuscar")]
        public JsonResult GetComprobanteBuscar(ComprobanteFilter request)
        {            
            var results = _comprobanteConsulta.GetComprobanteBuscar(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Comprobante/getComprobanteHistorial")]
        public JsonResult GetComprobanteHistorial(ComprobanteFilter request)
        {
            var results = _comprobanteConsulta.GetComprobanteHistorial(request);
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("Comprobante/getDetalleComprobantes")]
        public JsonResult GetDetalleComprobantes(DetalleComprobanteFilter request)
        {
            var results = _comprobanteConsulta.GetDetalleComprobantes(request);
            return new JsonResult(results);
        }

        [HttpGet]
        [Route("Comprobante/getFlujoComprobantes")]
        public JsonResult GetFlujoComprobantes(FlujoComprobanteFilter request)
        {
            var results = _comprobanteConsulta.GetFlujoComprobantes(request);
            return new JsonResult(results);
        }

        [HttpGet]
        [Route("Comprobante/getArchivoAdjunto")]
        public JsonResult GetArchivoAdjunto(ArchivoAdjuntoFilter request)
        {           
            var results = _comprobanteConsulta.GetArchivoAdjunto(request);
            return new JsonResult(results);
        }

        #endregion

        #region INSERT/UPDATE/DELETE
        [HttpPost]
        [Route("Comprobante/Registrar")]
        public JsonResult Registrar(ComprobanteRequest request)
        {
            var results = _comprobanteComando.Registrar(request);
            return new JsonResult(results);
        }
        [HttpPost]
        [Route("Comprobante/Actualizar")]
        public JsonResult Actualizar(ComprobanteRequest request)
        {
            var results = _comprobanteComando.Actualizar(request);
            return new JsonResult(results);
        }
        [HttpPost]
        [Route("Comprobante/RegistrarDetalle")]
        public JsonResult RegistrarDetalle(DetalleComprobanteRequest request)
        {
            var results = _comprobanteComando.RegistrarDetalle(request);
            return new JsonResult(results);
        }

        [HttpPost]
        [Route("Comprobante/EliminarDetalle")]
        public JsonResult EliminarDetalle(DetalleComprobanteRequest request)
        {
            var results = _comprobanteComando.EliminarDetalle(request);
            return new JsonResult(results);
        }

        #endregion

        [HttpPost]
        [Route("Comprobante/Exportar")]
        public IActionResult GetExportar(ReporteFilter filter)
        {
            try
            {
                var Estado = "-1";
                filter.Parametros["ESTADO"] = Estado;

                ReportFormat format = (filter.Formato == "PDF" ? ReportFormat.PDF : (filter.Formato == "XLSX" ? ReportFormat.EXCELOPENXML : ReportFormat.PDF));
                var report = _reportManager.GetReportFromServer(filter.Rdl, format, filter.Parametros);

                //filter.Formato = filter.Formato == "XLSX" ? "XLS" : filter.Formato;

                return File(report.FileBytes, report.ContentType, $"{filter.NombreReporte}-{DateTime.Now:dd-MM-yyyy}.{filter.Formato.ToLower()}");
            }
            catch (Exception e)
            {
                return Json(e.Message);                
            }

        }

        [HttpPost]
        [Route("Comprobante/DescargarAdjuntos")]
        public IActionResult DescargarAdjuntos(DetalleComprobanteRequest request)
        {
            var sr = new StatusResponse();
            int pos, pos2;
            string str;

            List<string> archList = new List<string>();
            List<string> nombList = new List<string>();
            for (int i = 0; i < request.ArchivosAdjuntos.Length; i++)
            {
                pos = request.ArchivosAdjuntos[i].IndexOf("@");

                str = request.ArchivosAdjuntos[i].Substring(0, pos);
                archList.Add(str);

                str = request.ArchivosAdjuntos[i].Substring(pos + 1);
                nombList.Add(str);
            }

            string[] archivos = archList.ToArray();
            string[] nombres = nombList.ToArray();

            //string[] archivos = { "5f1746f3bfd0968d449d5900", "5f17470ebfd0968d449d5902" };

            try
            {
                

                //https://www.carlrippon.com/zipping-up-files-from-a-memorystream/
                byte[] fileBytes = null;
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    fileBytes = memoryStream.ToArray();

                    string contentType = "APPLICATION/octet-stream";
                    return File(fileBytes, contentType, "Archivos.zip");

                    //System.IO.File.WriteAllBytes("c:\\Archivos.zip", fileBytes);
                }

                //sr.Success = true;
                //sr.Messages.Add("Se ha descargado satisfactoriamente");
            }
            catch (System.Exception ex)
            {
                //sr.Success = false;
                //sr.Messages.Add(string.Format("Error inesperado:{0}", ex.Message));
                return Json("Ocurrió un error al descargar");
            }

            //var results = _comprobanteComando.DescargarAdjuntos(request);
            //return new JsonResult(sr);

        }
    }
}
