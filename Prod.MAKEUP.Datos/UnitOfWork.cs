using Prod.MAKEUP.Entidades;
using Release.Helper.Data.Core;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Dapper;
using Release.Helper;

namespace Prod.MAKEUP.Datos
{
    public class UnitOfWork : BaseUnitOfWork, IUnitOfWork
    {
        public UnitOfWork(IDbContext ctx) : base(ctx, true)
        {
        }
                                                                                        
        #region  COMPROBANTE
        public IEnumerable<ComprobanteResponse> p_COMPROBANTE_ListarPaginado(ComprobanteFilter filtro)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_COMPROBANTE_PAGO", filtro.NroComprobante),
                new Parameter("@FECHA_INICIO",string.IsNullOrEmpty(filtro.FechaInicio) ? (System.DateTime?)null : System.DateTime.ParseExact(filtro.FechaInicio, "dd/MM/yyyy", null)),
                new Parameter("@FECHA_FIN",string.IsNullOrEmpty(filtro.FechaFin) ? (System.DateTime?)null : System.DateTime.ParseExact(filtro.FechaFin, "dd/MM/yyyy", null)),
                new Parameter("@NRO_SIAF",string.IsNullOrEmpty(filtro.NroSIAF) ? null: filtro.NroSIAF),
                new Parameter("@NRO_OS",string.IsNullOrEmpty(filtro.NroOS) ? null: filtro.NroOS),
                new Parameter("@NRO_OC",string.IsNullOrEmpty(filtro.NroOC) ? null: filtro.NroOC),
                new Parameter("@NRO_CP",string.IsNullOrEmpty(filtro.NroCP) ? null: filtro.NroCP),
                new Parameter("@DOCUMENTO_OTRO",string.IsNullOrEmpty(filtro.NroDO) ? null: filtro.NroDO),
                new Parameter("@ESTADO", filtro.Estado),
                new Parameter("@RAZON_SOCIAL", filtro.RazonSocial),
                new Parameter("@PAGENUMBER",filtro.Page),
                new Parameter("@PAGESIZE",filtro.PageSize)
            };

            var result = this.ExecuteReader<ComprobanteResponse>("p_COMPROBANTE_ListarPaginado", CommandType.StoredProcedure, ref para, 0);
            return result;
        }

        public IEnumerable<DetalleComprobanteResponse> p_DETALLE_COMPROBANTE_ListarPaginado(DetalleComprobanteFilter filtro)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_COMPROBANTE", filtro.idComprobantePago),
                new Parameter("@PAGENUMBER",filtro.Page),
                new Parameter("@PAGESIZE",filtro.PageSize)
            };

            var result = this.ExecuteReader<DetalleComprobanteResponse>("p_DETALLE_COMPROBANTE_ListarPaginado", CommandType.StoredProcedure, ref para, 0);
            return result;
        }

        public ComprobanteResponse p_COMPROBANTE_Obtener(ComprobanteFilter filtro)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID",filtro.NroComprobante),
                new Parameter("@NRO_CP",filtro.NroCP),
                new Parameter("@ANIO",filtro.Anio)
            };
            var result = this.ExecuteReader<ComprobanteResponse>("p_COMPROBANTE_Obtener", CommandType.StoredProcedure, ref para).FirstOrDefault();
            return result;
        }
                
        public bool p_COMPROBANTE_Registrar(ComprobanteRequest request)
        {
            var para = new Parameter[]
            {                
                new Parameter("@FECHA",System.DateTime.ParseExact(request.Fecha, "dd/MM/yyyy", null)),
                new Parameter("@NRO_SIAF",request.NroSIAF),
                new Parameter("@NRO_OS",request.NroOS),
                new Parameter("@NRO_OC",request.NroOC),
                new Parameter("@RAZON_SOCIAL",request.RazonSocial),
                new Parameter("ID_PERSONA_EMPRESA", request.id_Persona_Empresa),
                new Parameter("@MONTO",request.MONTO),
                new Parameter("@ID_TIPO_PAGO",request.idTipoPago),
                new Parameter("@COD_ARCHIVO",request.CodArchivo),
                new Parameter("@usuario",request.userName),
                new Parameter("@DOCUMENTO_OTRO", request.NroDO),
                new Parameter("@COD_COMPROBANTE_FIRMADO",request.CodComprobanteFirmado),
                new Parameter("@EXPEDIENTE_SITRADOC",request.ExpedienteSitradoc),
                new Parameter("@TIPO_HOJA",request.TipoHoja),
                new Parameter("@ID_DEPENDENCIA",request.idDependencia)
            };
            var result = this.ExecuteNonQuery("p_COMPROBANTE_Registrar", CommandType.StoredProcedure, ref para) > 0;
            return result;
        }
        public bool p_COMPROBANTE_Actualizar(ComprobanteRequest request)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_COMPROBANTE_PAGO",request.id),
                new Parameter("@FECHA",System.DateTime.ParseExact(request.Fecha, "dd/MM/yyyy", null)),
                new Parameter("@NRO_SIAF",request.NroSIAF),
                new Parameter("@NRO_OS",request.NroOS),
                new Parameter("@NRO_OC",request.NroOC),
                new Parameter("@RAZON_SOCIAL",request.RazonSocial),
                new Parameter("@ID_PERSONA_EMPRESA",request.id_Persona_Empresa),
                new Parameter("@MONTO",request.MONTO),
                new Parameter("@usuario",request.userName),
                new Parameter("@ID_TIPO_PAGO",request.idTipoPago),
                new Parameter("@COD_ARCHIVO",request.CodArchivo),
                new Parameter("@DOCUMENTO_OTRO", request.NroDO),
                new Parameter("@COD_COMPROBANTE_FIRMADO",request.CodComprobanteFirmado),
                new Parameter("@NOMBRE_COMPROBANTE_FIRMADO",request.NombreComprobanteFirmado),
                new Parameter("@EXPEDIENTE_SITRADOC",request.ExpedienteSitradoc),
                new Parameter("@TIPO_HOJA",request.TipoHoja),
                new Parameter("@ID_DEPENDENCIA",request.idDependencia),
                new Parameter("@OPC",request.Opc)
            };
            var result = this.ExecuteNonQuery("p_COMPROBANTE_Actualizar", CommandType.StoredProcedure, ref para) > 0;
            return result;
        }
        public bool p_DETALLE_COMPROBANTE_Registrar(DetalleComprobanteRequest request)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_COMPROBANTE_PAGO",request.idComprobantePago),
                new Parameter("@ID_CONCEPTO_PAGO",request.idConceptoPago),
                new Parameter("@MONTO",request.monto)                
            };
            var result = this.ExecuteNonQuery("p_DETALLE_COMPROBANTE_Registrar", CommandType.StoredProcedure, ref para) > 0;
            return result;
        }
        public bool p_DETALLE_COMPROBANTE_Eliminar(DetalleComprobanteRequest request)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_DETALLE_COMPROBANTE_PAGO",request.idDetalleComprobantePago),                
            };
            var result = this.ExecuteNonQuery("p_DETALLE_COMPROBANTE_Eliminar", CommandType.StoredProcedure, ref para) > 0;
            return result;
        }
        public IEnumerable<FlujoComprobanteResponse> p_FLUJO_COMPROBANTE_ListarPaginado(FlujoComprobanteFilter filtro)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_COMPROBANTE", filtro.idComprobantePago),
                new Parameter("@PAGENUMBER",filtro.Page),
                new Parameter("@PAGESIZE",filtro.PageSize)
            };

            var result = this.ExecuteReader<FlujoComprobanteResponse>("p_FLUJO_COMPROBANTE_ListarPaginado", CommandType.StoredProcedure, ref para, 0);
            return result;
        }

        public IEnumerable<ArchivoAdjuntoResponse> p_DOCUMENTO_ARCHIVOS_FLUJO(ArchivoAdjuntoFilter filtro)
        {
            var para = new Parameter[]
            {
                new Parameter("@NUM_TRAM_DOCUMENTARIO", filtro.idExpSitradoc),
                new Parameter("@TIPO", filtro.tipoHoja),
                new Parameter("@CODDEP", filtro.coddep),
                new Parameter("@CODIGO_TRABAJADOR", filtro.codigotrabajador),
                new Parameter("@PAGENUMBER",filtro.Page),
                new Parameter("@PAGESIZE",filtro.PageSize)
            };

            var result = this.ExecuteReader<ArchivoAdjuntoResponse>("SYN_p_DOCUMENTO_ARCHIVOS_FLUJO", CommandType.StoredProcedure, ref para, 0);
            return result;
        }
        #endregion

        #region PRESTAMO
        public IEnumerable<PrestamoResponse> p_PRESTAMO_ListarPaginado(PrestamoFilter filtro)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_PRESTAMO_COMPROBANTE_PAGO", filtro.NroPrestamoComprobante),
                new Parameter("@ID_COMPROBANTE_PAGO", filtro.NroComprobante),
                new Parameter("@FECHA_INICIO",string.IsNullOrEmpty(filtro.FechaInicio) ? (System.DateTime?)null : System.DateTime.ParseExact(filtro.FechaInicio, "dd/MM/yyyy", null)),
                new Parameter("@FECHA_FIN",string.IsNullOrEmpty(filtro.FechaFin) ? (System.DateTime?)null : System.DateTime.ParseExact(filtro.FechaFin, "dd/MM/yyyy", null)),                
                //new Parameter("@USUARIO_PRESTAMO", filtro.Usuario),
                new Parameter("@ID_ESTADO_PRESTAMO", filtro.idEstadoPrestamo),
                new Parameter("@CODIGO_DEPENDENCIA", filtro.CodigoDependencia),
                new Parameter("@NRO_CP", filtro.NroCP),
                new Parameter("@PAGENUMBER",filtro.Page),
                new Parameter("@PAGESIZE",filtro.PageSize)
            };

            var result = this.ExecuteReader<PrestamoResponse>("p_PRESTAMO_ListarPaginado", CommandType.StoredProcedure, ref para, 0);
            return result;
        }

        public bool p_PRESTAMO_Registrar(PrestamoRequest request)
        {
            var para = new Parameter[]
            {
                new Parameter("@NRO_CP",request.NroCP),
                new Parameter("@ANIO",request.Anio),
                //new Parameter("@ID_COMPROBANTE_PAGO",request.idComprobantePago),
                //new Parameter("@USUARIO_PRESTAMO",request.UsuarioPrestamo),
                //new Parameter("@USUARIO_PRESTAMO_CODIGO",request.UsuarioPrestamoCodigo),
                new Parameter("@FECHA_PRESTAMO",System.DateTime.ParseExact(request.FechaPrestamo, "dd/MM/yyyy", null)),
                new Parameter("@FECHA_DEVOLUCION",string.IsNullOrEmpty(request.FechaDevolucion) ? (System.DateTime?)null : System.DateTime.ParseExact(request.FechaDevolucion, "dd/MM/yyyy", null)),
                new Parameter("@ID_ESTADO_PRESTAMO",request.idEstadoPrestamo),
                new Parameter("@DIAS_PRESTAMO",request.DiasPrestamo),
                new Parameter("@CODIGO_DEPENDENCIA",request.CodigoDependencia),
                new Parameter("@DOCUMENTO_PRESTAMO",request.DocumentoPrestamo)
            };
            var result = this.ExecuteNonQuery("p_PRESTAMO_Registrar", CommandType.StoredProcedure, ref para) > 0;
            return result;
        }
        public bool p_PRESTAMO_Actualizar(PrestamoRequest request)
        {
            var para = new Parameter[]
            {
                new Parameter("@ID_PRESTAMO_COMPROBANTE_PAGO",request.id),
                new Parameter("@ID_COMPROBANTE_PAGO",request.idComprobantePago),
                //new Parameter("@USUARIO_PRESTAMO",request.UsuarioPrestamo),
                //new Parameter("@USUARIO_PRESTAMO_CODIGO",request.UsuarioPrestamoCodigo),
                new Parameter("@FECHA_PRESTAMO",System.DateTime.ParseExact(request.FechaPrestamo, "dd/MM/yyyy", null)),
                new Parameter("@FECHA_DEVOLUCION", string.IsNullOrEmpty(request.FechaDevolucion) ? (System.DateTime?)null : System.DateTime.ParseExact(request.FechaDevolucion, "dd/MM/yyyy", null)),
                new Parameter("@ID_ESTADO_PRESTAMO",request.idEstadoPrestamo),
                new Parameter("@DIAS_PRESTAMO",request.DiasPrestamo),
                new Parameter("@CODIGO_DEPENDENCIA",request.CodigoDependencia),
                new Parameter("@DOCUMENTO_PRESTAMO",request.DocumentoPrestamo),
                new Parameter("@OPC",request.Opc)
            };
            var result = this.ExecuteNonQuery("p_PRESTAMO_Actualizar", CommandType.StoredProcedure, ref para) > 0;
            return result;
        }

        #endregion
    }
}
