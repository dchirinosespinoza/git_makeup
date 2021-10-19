using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Pagination;

using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Servicios.Applicacion.Interfaces
{
    public interface IComprobanteAplicacion
    {
        PagedResponse<ComprobanteResponse> GetComprobantes(ComprobanteFilter filtro);
        StatusResponse<ComprobanteResponse> GetComprobante(ComprobanteFilter filtro);
        StatusResponse Registrar(ComprobanteRequest request);
        StatusResponse Actualizar(ComprobanteRequest request);
        StatusResponse RegistrarDetalle(DetalleComprobanteRequest request);
        PagedResponse<DetalleComprobanteResponse> GetDetalleComprobantes(DetalleComprobanteFilter filtro);
        StatusResponse EliminarDetalle(DetalleComprobanteRequest request);
        PagedResponse<FlujoComprobanteResponse> GetFlujoComprobantes(FlujoComprobanteFilter filtro);
        StatusResponse DescargarAdjuntos(DetalleComprobanteRequest request); //DACE revisar
        PagedResponse<ArchivoAdjuntoResponse> GetArchivoAdjunto(ArchivoAdjuntoFilter filtro);
    }
}
