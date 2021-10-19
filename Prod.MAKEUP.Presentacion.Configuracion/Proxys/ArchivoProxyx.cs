using Prod.MAKEUP.Entidades;
using Prod.MAKEUP.Entidades.Archivo;
using Prod.MAKEUP.Presentacion.Configuracion;
using Release.Helper;
using Release.Helper.Proxy;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace Prod.MAKEUP.Presentacion.Configuracion.Proxys
{

    public class ArchivoProxyx : BaseProxy
    {
        private readonly string _url;
        public ArchivoProxyx(AppConfig settings)
        {
            _url = string.Format("{0}archivo/", settings.Urls.URL_GA_UI);
        }

        public StatusResponse<ArchivoByIdResponse[]> FilesByIds(ArchivosByIdsRequest request)
        {
            return this.InvokeWebApi<StatusResponse<ArchivoByIdResponse[]>>(HttpMethod.Post, _url + "filesByIds", this.GetJsonParameters(request));
        }
        public StatusResponse<ArchivoResponse> UploadProxy(PostedFile request)
        {
            var para = this.GetJsonParameters(request);
            return this.InvokeWebApi<StatusResponse<ArchivoResponse>>(HttpMethod.Post, _url + "uploadProxy", para);
        }
        public StatusResponse<ArchivoResponse> fileInfoProxy(ArchivoRequest request)
        {
            var para = this.GetJsonParameters(request);
            return this.InvokeWebApi<StatusResponse<ArchivoResponse>>(HttpMethod.Post, _url + "fileInfoProxy", para);
        }
    }

}

