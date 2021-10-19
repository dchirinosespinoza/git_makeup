using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Prod.MAKEUP.Presentacion.Configuracion.Proxys;
using Release.Helper.WebKoMvc.Controllers;
using System;
using System.Linq;
namespace Prod.MAKEUP.Presentacion.MVC.Controllers
{
    [Route("Comun")]
    public class ComunController : CustomBaseController
    {
        private readonly ComunConsultaProxy _comun;

        public ComunController(ComunConsultaProxy comun
            )
        {
            _comun = comun;
        }


        #region Views

        #endregion

        #region Ajax

        [HttpGet]
        [Route("getSectores")]
        public JsonResult GetSectores()
        {
            var results = _comun.GetSectorList();
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("getTiposPersona")]
        public JsonResult GetTiposPersona()
        {

            var results = _comun.GetTipoPersonaList();
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("getTiposDocumento")]
        public JsonResult GetTiposDocumento()
        {

            var results = _comun.GetTipoDocumentoList();
            return new JsonResult(results);
        }
        [HttpGet]
        [Route("getConceptos")]
        public JsonResult GetConceptos()
        {

            var results = _comun.GetConceptosList();
            return new JsonResult(results);
        }

        [HttpGet]
        [Route("getEstados")]
        public JsonResult GetEstados()
        {

            var results = _comun.GetEstadosList();
            return new JsonResult(results);
        }

        [HttpGet]
        [Route("getUsuarios")]
        public JsonResult GetUsuarios()
        {

            var results = _comun.GetUsuariosList();
            return new JsonResult(results);
        }

        [HttpGet]
        [Route("GetNombreRazonSocial")]
        public JsonResult GetNombreRazonSocial()
        {

            var results = _comun.GetNombreRazonSocial();
            return new JsonResult(results);
        }     

        #endregion

        [HttpGet]
        [Route("getTipoPago")]
        public JsonResult GetTipoPago()
        {

            var results = _comun.GetTipoPagoList();
            return new JsonResult(results);
        }

        [HttpGet]
        [Route("getDependencias")]
        public JsonResult GetDependencias()
        {

            var results = _comun.GetDependenciasList();
            return new JsonResult(results);
        }
    }
}
