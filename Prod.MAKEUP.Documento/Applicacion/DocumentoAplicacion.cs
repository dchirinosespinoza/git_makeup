using MongoDB.Bson;
using MongoDB.Driver;
using Prod.ArquetipoNetCore.Datos.NoSQL.Repositorios;
using Prod.ArquetipoNetCore.Documento.Applicacion.Interfaces;
using Prod.ArquetipoNetCore.Documento.Applicacion.Validacion;
using Prod.ArquetipoNetCore.Entidades.Documento;
using Release.Helper.Pagination;
using Release.MongoDB.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Prod.ArquetipoNetCore.Documento.Applicacion
{
    public class DocumentoAplicacion : IDocumentoAplicacion
    {
        private readonly ITipoRepositorio _tipoRepositorio;
        private readonly IArchivoRepositorio _archivoRepositorio;
        private readonly CollectionContext _collectionContext;
        private readonly TipoValidacion _tipoValidacion;

        public DocumentoAplicacion(
            ITipoRepositorio tipoRepositorio,
            IArchivoRepositorio archivoRepositorio,
            CollectionContext collectionContext,
            TipoValidacion tipoValidacion)
        {
            _tipoRepositorio = tipoRepositorio;
            _archivoRepositorio = archivoRepositorio;
            _collectionContext = collectionContext;
            _tipoValidacion = tipoValidacion;

        }
        //https://mongodb-documentation.readthedocs.io/en/latest/ecosystem/tutorial/use-linq-queries-with-csharp-driver.html

        //https://www.codementor.io/pmbanugo/working-with-mongodb-in-net-1-basics-g4frivcvz
        //http://www.layerworks.com/blog/2014/11/11/mongodb-shell-csharp-driver-comparison-cheat-cheet
        //https://www.codeproject.com/Articles/524602/Beginners-guide-to-using-MongoDB-and-the-offic

        public Archivo GuardarArchivo(Archivo request)
        {
            var e = _tipoValidacion.ValidarTipo(request);

            if (!e.Any())
            {
                //return e;
            }

            /*
            var cstudents = _collectionContext.Context("estudiantes");

            var document = new BsonDocument
                {
                  {"nombre", BsonValue.Create("Joshe")},
                  {"apellido", new BsonString("Perez")},
                  { "cursos", new BsonArray(new[] {"Matematica", "Fisica", "Religion"}) },
                  { "Aula", "404" },
                  { "edad", 100 }
                };

            cstudents.InsertOneAsync(document);


            */

            //Creando Archivo
            var eArchivo = new Datos.NoSQL.Modelo.Archivo
            {
                esActivo = true,
                esBorrado = false,
                fechaCreacion = DateTime.Now,
                nombre = request.nombre,
                versiones = request.versiones.Select(c => new Datos.NoSQL.Modelo.Version
                {
                    id = c.id,
                    nombre = c.nombre,
                    fechaCreacion = c.fechaCreacion,
                    tamanio = c.tamanio,
                    tipo = c.tipo,
                    esActivo = true,
                    esBorrado = false
                }
                ).ToList()
                //versiones = new List<Datos.NoSQL.Modelo.Version>
                //{
                //    new Datos.NoSQL.Modelo.Version
                //    {
                //        id = 1,
                //        nombre ="expediente.pdf",fechaCreacion=DateTime.Now, tamanio="50Kb",tipo="application/pdf"
                //    }
                //}
            };

            var a = _archivoRepositorio.InsertAsync(eArchivo).Result;

            var archivo = _archivoRepositorio.Collection;
            var versionUpd = new Datos.NoSQL.Modelo.Version
            {
                id = 2, //ID
                nombre = "expediente2_2018.pdf",
                fechaCreacion = DateTime.Now,
                tamanio = "60Kb",
                tipo = "application/pdf"
            };

            archivo.FindOneAndUpdate(
                c => c.id == a.id && c.versiones.Any(s => s.id == versionUpd.id),
                Builders<Datos.NoSQL.Modelo.Archivo>.Update
                        .Set(s => s.nombre, "Expediente N° 2018")
                        .Set(s => s.fechaModificacion, DateTime.Now)
                        //Version
                        .Set(c => c.versiones[-1], versionUpd)
                /*
                .Set(c => c.versiones[-1].nombre, "expediente2_2018.docx")
                .Set(c => c.versiones[-1].fechaCreacion, DateTime.Now)
                .Set(c => c.versiones[-1].tamanio, "60Kb")
                .Set(c => c.versiones[-1].tipo, "Word")
                */
                );


            //Actualizar archivo                        
            /*
            ObjectId id = a.id;

            var filter = Builders<Datos.NoSQL.Modelo.Archivo>.Filter.Eq(s => s.id, id);
            var update = Builders<Datos.NoSQL.Modelo.Archivo>.Update.Set(s => s.nombre, "Expediente N° 2018")
                                                                                          .Set(s => s.fechaModificacion, DateTime.Now)
                                                                                          .Set(s => s.versiones.Single(x => x.id == 2), new Datos.NoSQL.Modelo.Version
                                                                                          {
                                                                                              id = 2,
                                                                                              nombre = "expediente2_2018.pdf",
                                                                                              fechaCreacion = DateTime.Now,
                                                                                              tamanio = "60Kb",
                                                                                              tipo = "application/pdf"
                                                                                          });




            _archivoRepositorio.UpdateOneAsync(filter, update);

            */

            /*
            var entity = new Datos.NoSQL.Modelo.Tipo
            {
                nombre = request.nombre,
                fechaCreacion = DateTime.Now,
                esActivo = true,
                esBorrado = false
            };
            var o = _tipoRepositorio.InsertAsync(entity).Result;

            request.id = o.id.ToString();
            request.fechaCreacion = o.fechaCreacion;
            */
            return request;
        }

        public void GuardarArchivo(List<Archivo> request)
        {
            var items = request.Select(a => new Datos.NoSQL.Modelo.Archivo
            {
                esActivo = true,
                esBorrado = false,
                fechaCreacion = a.fechaCreacion,
                nombre = a.nombre,
                versiones = a.versiones.Select(v => new Datos.NoSQL.Modelo.Version
                {
                    id = v.id,
                    nombre = v.nombre,
                    fechaCreacion = v.fechaCreacion,
                    tamanio = v.tamanio,
                    tipo = v.tipo,
                    esActivo = true,
                    esBorrado = false
                }).ToList()
            }).ToList();

            var r = _archivoRepositorio.InsertAsyncBatch(items);

        }

        public PagedResponse<Archivo> BusquedaPaginada(ArchivoFiltro filtro)
        {
            var pr = new PagedResponse<Archivo> { Data = new List<Archivo>() };


            //Filter
            string id = filtro.id ?? "";


            var sort = new SortDefinitionBuilder<Datos.NoSQL.Modelo.Archivo>().Descending(x => x.fechaCreacion);
            var r = _archivoRepositorio.FindPaged(filtro,
                //x => (x.esBorrado == false && (x.id == (id.Length == 0 ? x.id : ObjectId.Parse(id)))),
                x => (x.esBorrado == false),
                sort);

            //To
            foreach (var item in r.Data)
            {
                pr.Data.Add(new Archivo
                {
                    nombre = item.nombre,
                    fechaCreacion = item.fechaCreacion,
                    id = item.id.ToString(),
                    versiones = GetVersiones(item.id.ToString())
                });
            }
            pr.TotalPages = r.TotalPages;
            pr.TotalRows = r.TotalRows;

            return pr;
        }

        public Archivo Archivo(ArchivoFiltro filtro)
        {
            filtro.Page = 1;
            filtro.PageSize = 1000;
            var files = BusquedaPaginada(filtro);

            return files.Data.FirstOrDefault();
        }

        private List<Entidades.Documento.Version> GetVersiones(string idArchivo)
        {
            var v = new List<Entidades.Documento.Version>();

            var a = _archivoRepositorio.GetByIdAsync(idArchivo).Result;

            if (a != null)
            {
                v = a.versiones.Select(c => new Entidades.Documento.Version
                {
                    id = c.id,
                    nombre = c.nombre,
                    fechaCreacion = c.fechaCreacion,
                    tamanio = c.tamanio,
                    tipo = c.tipo
                }).ToList();
            }
            return v;
        }
    }
}
