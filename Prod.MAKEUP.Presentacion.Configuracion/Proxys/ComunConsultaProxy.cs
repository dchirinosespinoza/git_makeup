using Prod.MAKEUP.Entidades;
using Release.Helper;
using Release.Helper.Proxy;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{
    public class ComunConsultaProxy : BaseProxy
    {
        private readonly string _url;

        public ComunConsultaProxy(AppConfig appConfig)
        {            
            _url = string.Format("{0}ComunConsulta/", appConfig.Urls.URL_BUPER_Core_API);

        }
        
        public IEnumerable<Item> GetSectorList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetSectorList", null);
        }
                
        public IEnumerable<Item> GetTipoPersonaList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetTipoPersonaList", null);
        }
        public IEnumerable<Item> GetTipoDocumentoList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetTipoDocumentoList", null);
        }
        public IEnumerable<Item> GetConceptosList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetConceptosList", null);
        }
        public IEnumerable<Item> GetEstadosList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetEstadosList", null);
        }
        public IEnumerable<Item> GetUsuariosList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetUsuariosList", null);
        }

        public IEnumerable<Item> GetNombreRazonSocial()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetNombreRazonSocial", null);
        }
        public IEnumerable<Item> GetTipoPagoList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetTipoPagoList", null);
        }
        public IEnumerable<Item> GetDependenciasList()
        {
            return this.InvokeWebApi<IEnumerable<Item>>(HttpMethod.Get, _url + "GetDependenciasList", null);
        }
    }

}
