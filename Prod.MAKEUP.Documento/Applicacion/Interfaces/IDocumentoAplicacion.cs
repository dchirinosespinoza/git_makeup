using Prod.ArquetipoNetCore.Entidades.Documento;
using Release.Helper.Pagination;
using System.Collections.Generic;

namespace Prod.ArquetipoNetCore.Documento.Applicacion.Interfaces
{
    public interface IDocumentoAplicacion
    {
        Archivo GuardarArchivo(Archivo request);
        void GuardarArchivo(List<Archivo> request);
        PagedResponse<Archivo> BusquedaPaginada(ArchivoFiltro filtro);
        Archivo Archivo(ArchivoFiltro filtro);
    }
}
