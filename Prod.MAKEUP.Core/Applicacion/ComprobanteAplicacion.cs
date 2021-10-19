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
    public class ComprobanteAplicacion : IComprobanteAplicacion
    {
        private IContext _context;
        private IUnitOfWork _uow;
        private readonly ComprobanteProceso _comprobanteProceso;
        private readonly ComprobanteValidacion _comprobanteValidacion;
        public ComprobanteAplicacion(
            IUnitOfWork unitOfWork,
            ComprobanteProceso comprobanteProceso,
            ComprobanteValidacion comprobanteValidacion)
        {
            _uow = unitOfWork;
            _context = _uow.Context;
            _comprobanteProceso = comprobanteProceso;
            _comprobanteValidacion = comprobanteValidacion;
        }


        #region GET
        public PagedResponse<ComprobanteResponse> GetComprobantes(ComprobanteFilter filtro)
        {




            var data = _uow.p_COMPROBANTE_ListarPaginado(filtro);

            if (data.Any())
            {
                var totalRows = data.FirstOrDefault().total_rows;
                var response = new PagedResponse<ComprobanteResponse>()
                {
                    Data = data.ToList(),
                    TotalRows = totalRows,
                    //TotalPages = totalRows > 0 ? ((totalRows / filtro.PageSize) + ((totalRows % filtro.PageSize) > 0 ? 1 : 0)) : 0
                };
                return response;

            }

            return new PagedResponse<ComprobanteResponse>()
            {
                Data = new List<ComprobanteResponse>(),
                TotalRows = 0,
                TotalPages = 0
            };


        }
        public StatusResponse<ComprobanteResponse> GetComprobante(ComprobanteFilter filtro)
        {
            var response = new StatusResponse<ComprobanteResponse>();
            var comprobante = _uow.p_COMPROBANTE_Obtener(filtro);
            if (comprobante != null)
            {
                response.Data = comprobante;
                response.Success = true;
            }
            else
            {
                response.Success = false;
                response.Messages = new List<string>() { "No se encontraron los datos del comprobante" };
            }
            return response;
        }
        public PagedResponse<DetalleComprobanteResponse> GetDetalleComprobantes(DetalleComprobanteFilter filtro)
        {

            var data = _uow.p_DETALLE_COMPROBANTE_ListarPaginado(filtro);

            if (data.Any())
            {
                var totalRows = data.FirstOrDefault().total_rows;
                var response = new PagedResponse<DetalleComprobanteResponse>()
                {
                    Data = data.ToList(),
                    TotalRows = totalRows,
                    //TotalPages = totalRows > 0 ? ((totalRows / filtro.PageSize) + ((totalRows % filtro.PageSize) > 0 ? 1 : 0)) : 0
                };
                return response;

            }

            return new PagedResponse<DetalleComprobanteResponse>()
            {
                Data = new List<DetalleComprobanteResponse>(),
                TotalRows = 0,
                TotalPages = 0
            };
        }
        public PagedResponse<FlujoComprobanteResponse> GetFlujoComprobantes(FlujoComprobanteFilter filtro)
        {

            var data = _uow.p_FLUJO_COMPROBANTE_ListarPaginado(filtro);

            if (data.Any())
            {
                var totalRows = data.FirstOrDefault().total_rows;
                var response = new PagedResponse<FlujoComprobanteResponse>()
                {
                    Data = data.ToList(),
                    TotalRows = totalRows,
                    //TotalPages = totalRows > 0 ? ((totalRows / filtro.PageSize) + ((totalRows % filtro.PageSize) > 0 ? 1 : 0)) : 0
                };
                return response;

            }

            return new PagedResponse<FlujoComprobanteResponse>()
            {
                Data = new List<FlujoComprobanteResponse>(),
                TotalRows = 0,
                TotalPages = 0
            };
        }

        public PagedResponse<ArchivoAdjuntoResponse> GetArchivoAdjunto(ArchivoAdjuntoFilter filtro)
        {

            var data = _uow.p_DOCUMENTO_ARCHIVOS_FLUJO(filtro);

            if (data.Any())
            {
                var totalRows = data.FirstOrDefault().total_rows;
                var response = new PagedResponse<ArchivoAdjuntoResponse>()
                {
                    Data = data.ToList(),
                    TotalRows = totalRows,
                    //TotalPages = totalRows > 0 ? ((totalRows / filtro.PageSize) + ((totalRows % filtro.PageSize) > 0 ? 1 : 0)) : 0
                };
                return response;

            }

            return new PagedResponse<ArchivoAdjuntoResponse>()
            {
                Data = new List<ArchivoAdjuntoResponse>(),
                TotalRows = 0,
                TotalPages = 0
            };
        }

        #endregion
        #region INSERT/UPDATE/DELETE
        public StatusResponse Registrar(ComprobanteRequest request)
        {
            var sr = new StatusResponse();

            var errores = _comprobanteValidacion.ValidarRegistro(request);
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
                var registro = _uow.p_COMPROBANTE_Registrar(request);

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
        public StatusResponse Actualizar(ComprobanteRequest request)
        {
            var sr = new StatusResponse();

            var errores = _comprobanteValidacion.ValidarActualizar(request);
            if (errores.Any())
            {
                sr.Messages = errores;
                return sr;
            }

            try
            {
                _uow.BeginTransaction();


                var registro = _uow.p_COMPROBANTE_Actualizar(request);

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

        public StatusResponse RegistrarDetalle(DetalleComprobanteRequest request)
        {
            var sr = new StatusResponse();

            var errores = _comprobanteValidacion.ValidarRegistrarDetalle(request);
            if (errores.Any())
            {
                sr.Messages = errores;
                return sr;
            }

            try
            {
                _uow.BeginTransaction();


                var registro = _uow.p_DETALLE_COMPROBANTE_Registrar(request);

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

        public StatusResponse EliminarDetalle(DetalleComprobanteRequest request)
        {
            var sr = new StatusResponse();

            var errores = _comprobanteValidacion.ValidarEliminarDetalle(request);
            if (errores.Any())
            {
                sr.Messages = errores;
                return sr;
            }

            try
            {
                _uow.BeginTransaction();


                var registro = _uow.p_DETALLE_COMPROBANTE_Eliminar(request);

                if (registro)
                {
                    _uow.Commit();
                    sr.Success = true;
                    sr.Messages.Add("Se ha eliminado satisfactoriamente");
                }
                else
                {
                    _uow.Rollback();
                    sr.Success = false;
                    sr.Messages.Add("No se pudo eliminar los datos");
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

        public StatusResponse DescargarAdjuntos(DetalleComprobanteRequest request) //DACE revisar
        {
            var sr = new StatusResponse();

            var errores = _comprobanteValidacion.ValidarDescargarAdjuntos(request);
            if (errores.Any())
            {
                sr.Messages = errores;
                return sr;
            }

            try
            {
                
                sr.Success = true;
                sr.Messages.Add("Se ha descargado satisfactoriamente");                
            }
            catch (System.Exception ex)
            {
                sr.Success = false;
                sr.Messages.Add(string.Format("Error inesperado:{0}", ex.Message));
            }
            return sr;
        }

    }
}
