using Prod.ArquetipoNetCore.Entidades.Documento;
using Release.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.ArquetipoNetCore.Documento.Applicacion.Validacion
{
    public class TipoValidacion : ValidacionGenerica
    {
        
        public List<string> ValidarTipo(Archivo request)
        {
            //TODO: Completar malidaciones 
            Msg.Add("El Tipo ingresado no es el correcto");


            return Msg;
        }
    }
}
