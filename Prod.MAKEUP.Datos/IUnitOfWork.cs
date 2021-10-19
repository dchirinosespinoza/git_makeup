
using Prod.MAKEUP.Entidades;
using Release.Helper.Data.ICore;
using System.Collections.Generic;

namespace Prod.MAKEUP.Datos
{
    public interface IUnitOfWork : IBaseUnitOfWork
    {
        
        IEnumerable<ComprobanteResponse> p_COMPROBANTE_ListarPaginado(ComprobanteFilter filtro);
        IEnumerable<DetalleComprobanteResponse> p_DETALLE_COMPROBANTE_ListarPaginado(DetalleComprobanteFilter filtro);
        ComprobanteResponse p_COMPROBANTE_Obtener(ComprobanteFilter filtro);
        bool p_COMPROBANTE_Registrar(ComprobanteRequest request);
        bool p_COMPROBANTE_Actualizar(ComprobanteRequest request);
        bool p_DETALLE_COMPROBANTE_Registrar(DetalleComprobanteRequest request);
        bool p_DETALLE_COMPROBANTE_Eliminar(DetalleComprobanteRequest request);

        IEnumerable<PrestamoResponse> p_PRESTAMO_ListarPaginado(PrestamoFilter filtro);
        bool p_PRESTAMO_Registrar(PrestamoRequest request);
        bool p_PRESTAMO_Actualizar(PrestamoRequest request);

        IEnumerable<FlujoComprobanteResponse> p_FLUJO_COMPROBANTE_ListarPaginado(FlujoComprobanteFilter filtro);
        IEnumerable<ArchivoAdjuntoResponse> p_DOCUMENTO_ARCHIVOS_FLUJO(ArchivoAdjuntoFilter filtro);
    }
}
