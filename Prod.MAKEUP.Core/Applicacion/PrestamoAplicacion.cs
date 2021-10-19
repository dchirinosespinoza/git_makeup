using Prod.MAKEUP.Datos;
using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Servicios.Applicacion.Interfaces;
using Release.Helper;
using Release.Helper.Data.ICore;
using Release.Helper.Pagination;
using System.Collections.Generic;
using System.Linq;
using Prod.MAKEUP.Core.Applicacion;

namespace Prod.MAKEUP.Servicios.Applicacion
{
    public class PrestamoAplicacion : IPrestamoAplicacion
    {
        private IContext _context;
        private IUnitOfWork _uow;
        private readonly PrestamoProceso _prestamoProceso;
        private readonly PrestamoValidacion _prestamoValidacion;
        public PrestamoAplicacion(
            IUnitOfWork unitOfWork,
            PrestamoProceso prestamoProceso,
            PrestamoValidacion prestamoValidacion)
        {
            _uow = unitOfWork;
            _context = _uow.Context;
            _prestamoProceso = prestamoProceso;
            _prestamoValidacion = prestamoValidacion;
        }


        #region GET
        public PagedResponse<PrestamoResponse> GetPrestamos(PrestamoFilter filtro)
        {

            var data = _uow.p_PRESTAMO_ListarPaginado(filtro);

            if (data.Any())
            {
                var totalRows = data.FirstOrDefault().total_rows;
                var response = new PagedResponse<PrestamoResponse>()
                {
                    Data = data.ToList(),
                    TotalRows = totalRows,
                    //TotalPages = totalRows > 0 ? ((totalRows / filtro.PageSize) + ((totalRows % filtro.PageSize) > 0 ? 1 : 0)) : 0
                };
                return response;

            }

            return new PagedResponse<PrestamoResponse>()
            {
                Data = new List<PrestamoResponse>(),
                TotalRows = 0,
                TotalPages = 0
            };


        }
                
        /*DACE
        public StatusResponse<PersonaResponse> GetPersonaBuscar(PersonaFilter filtro)
        {
            var response = new StatusResponse<PersonaResponse>() { Success = true };
            var persona = _uow.p_PERSONA_ObtenerRepetido(filtro);


            if (persona == null)
            {
                switch (filtro.TipoIdentificacion)
                {
                    case (int)Enumerados.TIPO_DOCUMENTO.DNI:

                        #region RENIEC
                        var reniec = _reniecServicio.Buscar(new BuscarPersonaRequest() { dni = filtro.Detalle });
                        if (reniec.Success)
                        {
                            response.Data = new PersonaResponse()
                            {
                                id_tipo_identificacion = (int)filtro.TipoIdentificacion,
                                nro_documento = filtro.Detalle,
                                nombres = reniec.Data.nombre,
                                apellidos = $"{reniec.Data.apellidoPaterno} {reniec.Data.apellidoMaterno}",
                                codigo_departamento = reniec.Data.codigoDepartamento,
                                codigo_provincia = reniec.Data.codigoProvincia,
                                codigo_distrito = reniec.Data.codigoDistrito,
                                direccion = reniec.Data.direccion

                            };
                        }
                        else
                        {
                            response.Success = false;
                            response.Messages = (reniec.Messages.Any() ? reniec.Messages.Select(x => $"RENIEC: {x}").ToList() : new List<string>() { "El número de documento no se encuentra registrado en RENIEC" });
                        }
                        break;


                    #endregion

                    case (int)Enumerados.TIPO_DOCUMENTO.RUC:

                        #region SUNAT
                        var sunat = _sunatServicio.Buscar(new SunatRequest() { ruc = filtro.Detalle });
                        if (sunat.Success)
                        {
                            response.Data = new PersonaResponse()
                            {
                                id_tipo_identificacion = (int)filtro.TipoIdentificacion,
                                nro_documento = filtro.Detalle,
                                razon_social = sunat.Data.razonSocial,
                                codigo_departamento = sunat.Data.departamento,
                                codigo_provincia = sunat.Data.provincia,
                                codigo_distrito = sunat.Data.ubigeo,
                                direccion = sunat.Data.domicilio

                            };
                        }
                        else
                        {
                            response.Success = false;
                            response.Messages = (sunat.Messages.Any() ? sunat.Messages.Select(x => $"SUNAT: {x}").ToList() : new List<string>() { "El número de documento no se encuentra registrado en SUNAT" });
                        }
                        break;


                    #endregion

                    default:
                        response.Success = true;
                        break;

                }
            }
            else
            {
                response.Success = false;
                response.Messages = new List<string>() { "La persona ya se encuentra registrada" };
            }


            return response;
        }*/
        #endregion
        #region INSERT/UPDATE/DELETE
        public StatusResponse Registrar(PrestamoRequest request)
        {
            var sr = new StatusResponse();

            var errores = _prestamoValidacion.ValidarRegistro(request);
            if (errores.Any())
            {
                sr.Messages = errores;
                return sr;
            }

            try
            {
                _uow.BeginTransaction();

                //_personaProceso.UserName = request.userName;
                //sr = _personaProceso.EjecutaRegistrar(request);
                var registro = _uow.p_PRESTAMO_Registrar(request);

                if (registro)
                {
                    _uow.Commit();
                    sr.Success = true;
                    sr.Messages.Add("Se ha registrado satisfactoriamente");
                }
                else
                {
                    _uow.Rollback();
                    sr.Success = false;
                    sr.Messages.Add("No se pudo registrar los datos");
                }

            }
            catch (System.Exception ex)
            {
                _uow.Rollback();
                sr.Success = false;
                sr.Messages.Add(string.Format("Error inesperado:{0}", ex.Message));
            }
            return sr;
        }
        public StatusResponse Actualizar(PrestamoRequest request)
        {
            var sr = new StatusResponse();

            var errores = _prestamoValidacion.ValidarActualizar(request);
            if (errores.Any())
            {
                sr.Messages = errores;
                return sr;
            }

            try
            {
                _uow.BeginTransaction();


                var registro = _uow.p_PRESTAMO_Actualizar(request);

                if (registro)
                {
                    _uow.Commit();
                    sr.Success = true;
                    sr.Messages.Add("Se ha registrado satisfactoriamente");
                }
                else
                {
                    _uow.Rollback();
                    sr.Success = false;
                    sr.Messages.Add("No se pudo registrar los datos");
                }

            }
            catch (System.Exception ex)
            {
                _uow.Rollback();
                sr.Success = false;
                sr.Messages.Add(string.Format("Error inesperado:{0}", ex.Message));
            }
            return sr;
        }

        #endregion



    }
}
