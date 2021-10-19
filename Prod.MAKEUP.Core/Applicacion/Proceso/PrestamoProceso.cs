using Prod.MAKEUP.Datos;
using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Data.ICore;
using System;
using System.Linq;
using Modelo = Prod.MAKEUP.Datos.Modelo;

namespace Prod.MAKEUP.Core.Applicacion
{
    public class PrestamoProceso : AccionGenerica<PersonaRequest>
    {
        private IContext _context;
        private IUnitOfWork _uow;

        public PrestamoProceso(IUnitOfWork unitOfWork)
        {
            _uow = unitOfWork;
            _context = _uow.Context;
        }
        protected override StatusResponse Registrar(PersonaRequest request)
        {
            var sr = new StatusResponse { Value = 0 };

            //Guardar
            //var entity = xHelper.ConvertToViewModel<Modelo.persona>(request);
            //entity.fecha = DateTime.Now;
            //entity.estado = true; //Activo

            //_context.Add(entity);
            //_uow.Save();

            //Ok
            sr.Success = true;
            //sr.Value = entity.id_persona;
            sr.Messages.Add("El registro se guardó correctamente");

            return sr;
        }
        protected override StatusResponse Modificar(PersonaRequest request)
        {
            var sr = new StatusResponse { Value = request.id };

            //Guardar
            //var entity = _context.Query<Modelo.persona>(false).First(x => x.ID == request.id);
            //entity.nombres = request.nombres;
            //entity.apellido_paterno = request.apellido_paterno;
            //entity.apellido_materno = request.apellido_materno;
            //entity.dni = request.dni;
            //entity.id_genero = request.id_genero;
            //entity.estado = request.estado;
            //entity.fecha = DateTime.Now;

            //_context.Update(entity);
            //_uow.Save();

            //Ok
            sr.Success = true;
            sr.Messages.Add("El registro se actualizó correctamente");
            return sr;
        }
        protected override StatusResponse Eliminar(PersonaRequest request)
        {
            var sr = new StatusResponse { Value = request.id };

            //Eliminar
            //var entity = _context.Query<Modelo.persona>(false).FirstOrDefault(x => x.ID == request.id);
            //if (entity != null)
            //{
            //    _context.Remove(entity);
            //    _uow.Save();

            //    sr.Success = true;
            //    sr.Messages.Add("El registro se eliminó correctamente");
            //}
            //else
            //{
            //    sr.Messages.Add("No fue posible eliminar el registro");
            //}

            return sr;

        }
        protected override StatusResponse Aprobar(PersonaRequest request)
        {
            return base.Aprobar(request);
        }
        protected override StatusResponse Solicitar(PersonaRequest request)
        {
            return base.Solicitar(request);
        }
        protected override StatusResponse Observar(PersonaRequest request)
        {
            return base.Observar(request);
        }
    }
}
