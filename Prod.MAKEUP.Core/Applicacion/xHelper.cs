using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prod.MAKEUP.Core
{
    public static class xHelper
    {
        public static T ConvertToViewModel<T>(object obj) where T : class
        {
            var mo = JsonConvert.DeserializeObject<T>(JObject.FromObject(obj).ToString());
            return mo;
        }
    }
}
