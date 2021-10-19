using Prod.MAKEUP.Datos;
using Prod.MAKEUP.Datos.Modelo;
using Prod.MAKEUP.Servicios.Applicacion.Interfaces;
using Release.Helper;
using Release.Helper.Data.ICore;
using Release.Helper.Pagination;
using System.Collections.Generic;
using System.Linq;
using Modelo = Prod.MAKEUP.Datos.Modelo;

namespace Prod.MAKEUP.Servicios.Applicacion
{
    public class ComunAplicacion : IComunAplicacion
    {
        private IContext _context;
        private IUnitOfWork _uow;
        public ComunAplicacion(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
            _context = _uow.Context;
        }


        public IEnumerable<Item> GetConceptosList()
        {
            var list = _context.Query<Modelo.disciplina>()
                                .OrderBy(c => c.disciplina1)
                                .Select(t => new Item
                                {
                                    Value = t.id_disciplina,
                                    Text = t.disciplina1
                                });
            return list;
        }



    }
}
