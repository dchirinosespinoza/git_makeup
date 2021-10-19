using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Pagination;

using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Servicios.Applicacion.Interfaces
{
    public interface IPrestamoAplicacion
    {
        PagedResponse<PrestamoResponse> GetPrestamos(PrestamoFilter filtro);
        StatusResponse Registrar(PrestamoRequest request);
        StatusResponse Actualizar(PrestamoRequest request);
        
    }
}
