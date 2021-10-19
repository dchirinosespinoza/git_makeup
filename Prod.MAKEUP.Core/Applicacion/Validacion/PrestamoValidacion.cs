
using Prod.MAKEUP.Datos;
using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Data.ICore;
using System.Collections.Generic;
using Modelo = Prod.MAKEUP.Datos.Modelo;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;

namespace Prod.MAKEUP.Servicios.Applicacion
{
    public class PrestamoValidacion : ValidacionGenerica
    {
        private IContext _context;
        private IUnitOfWork _uow;
        public readonly IConfiguration _configuration;
        public PrestamoValidacion(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _uow = unitOfWork;
            _context = _uow.Context;
            _configuration = configuration;
        }

        public List<string> ValidarRegistro(PrestamoRequest request)
        {
            /*DACE
            //TODO: Completar malidaciones 
            switch (request.id_tipo_identificacion)
            {
                case (int)Enumerados.TIPO_DOCUMENTO.DNI:

                    #region RENIEC

                    var regexDni = _configuration.GetSection("Regex:DNI").Value;
                    if (!Regex.IsMatch(request.nro_documento, regexDni))
                    {
                        Msg.Add($"El número de DNI {request.nro_documento} no es correcto");
                    }
                    break;

                #endregion

                case (int)Enumerados.TIPO_DOCUMENTO.RUC:

                    #region SUNAT
                    var regexRuc = _configuration.GetSection("Regex:RUC").Value;
                    if (!Regex.IsMatch(request.nro_documento, regexRuc))
                    {
                        Msg.Add($"El número de RUC {request.nro_documento} no es correcto");
                    }
                    break;

                #endregion

                default:
                    break;

            }

            //EXISTE PERSONA
            var persona = _uow.p_PERSONA_Obtener(new PersonaFilter()
            {
                TipoIdentificacion = request.id_tipo_identificacion,
                Detalle = request.nro_documento
            });

            if (persona != null)
            {
                Msg.Add("La persona ya se encuentra registrada");
            }

            //CELULAR

            if (!string.IsNullOrEmpty(request.celular))
            {
                var regexCelular = _configuration.GetSection("Regex:CELULAR").Value;
                if (!Regex.IsMatch(request.celular, regexCelular))
                {
                    Msg.Add("El número de celular es incorrecto, debe empezar con {9} y tener 9 dígitos");
                }
            }


            //EMAIL

            if (!string.IsNullOrEmpty(request.email.Trim()))
            {
                var regexEmail = _configuration.GetSection("Regex:EMAIL").Value;
                if (!Regex.IsMatch(request.email, regexEmail))
                {
                    Msg.Add($"El email {request.email} no cumple con el formato correcto xxx@xxx.xxx.xx ejem: micorreo@dominio.com, micorreo@dominio.com.pe, etc");
                }
            }*/

            //EXISTE COMPROBANTE
            var comprobante = _uow.p_COMPROBANTE_Obtener(new ComprobanteFilter()
            {
                NroComprobante = request.idComprobantePago,
                NroCP = request.NroCP,
                Anio = request.Anio
            });

            if (comprobante == null)
            {
                Msg.Add("El comprobante no se encuentra registrado para el año ingresado");
            }

            return Msg;
        }
        public List<string> ValidarActualizar(PrestamoRequest request)
        {
            /*DACE
            switch (request.id_tipo_identificacion)
            {
                case (int)Enumerados.TIPO_DOCUMENTO.DNI:

                    #region RENIEC

                    var regexDni = _configuration.GetSection("Regex:DNI").Value;
                    if (!Regex.IsMatch(request.nro_documento, regexDni))
                    {
                        Msg.Add($"El número de DNI {request.nro_documento} no es correcto");
                    }
                    break;

                #endregion

                case (int)Enumerados.TIPO_DOCUMENTO.RUC:

                    #region SUNAT
                    var regexRuc = _configuration.GetSection("Regex:RUC").Value;
                    if (!Regex.IsMatch(request.nro_documento, regexRuc))
                    {
                        Msg.Add($"El número de RUC {request.nro_documento} no es correcto");
                    }
                    break;

                #endregion

                default:
                    break;

            }

            //EXISTE PERSONA
            var persona = _uow.p_PERSONA_Obtener(new PersonaFilter()
            {
                //IdPersona = request.id,
                TipoIdentificacion = request.id_tipo_identificacion,
                Detalle = request.nro_documento
            });

            if (persona != null && persona.id != request.id)
            {
                Msg.Add("Ya existe una persona registrada con el mismo tipo y número de identificación");
            }

            //CELULAR

            if (!string.IsNullOrEmpty(request.celular))
            {
                var regexCelular = _configuration.GetSection("Regex:CELULAR").Value;
                if (!Regex.IsMatch(request.celular, regexCelular))
                {
                    Msg.Add("El número de celular es incorrecto, debe empezar con {9} y tener 9 dígitos");
                }
            }


            //EMAIL
            if (request.email != null)
                if (!string.IsNullOrEmpty(request.email.Trim()))
                {
                    var regexEmail = _configuration.GetSection("Regex:EMAIL").Value;
                    if (!Regex.IsMatch(request.email, regexEmail))
                    {
                        Msg.Add($"El email {request.email} no cumple con el formato correcto xxx@xxx.xxx.xx ejem: micorreo@dominio.com, micorreo@dominio.com.pe, etc");
                    }
                }
                */
            return Msg;


        }

    }
}
