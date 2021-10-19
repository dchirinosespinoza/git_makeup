﻿using Microsoft.AspNetCore.Mvc;
using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Presentacion.Configuracion.Proxys;
using Release.Helper.WebKoMvc.Controllers;
using System.Linq;

namespace Prod.MAKEUP.Presentacion.MVC.Controllers
{
    public partial class AuthController : CustomBaseController
    {
        private readonly ComunConsultaProxy _comun;

        public AuthController(ComunConsultaProxy comun)
        {
            _comun = comun;
        }

        [HttpGet]
        /*[Route("")]
        [Route("/")]
        [Route("Home")]
        [Route("Home/Index")]*/
        public IActionResult Index()
        {
            return View();
        }

    }

}
