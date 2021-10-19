using Microsoft.AspNetCore.Mvc.Filters;
using Release.Helper.WebKoMvc.Controllers;

namespace Prod.MAKEUP.Presentacion.MVC.Controllers
{
    public class CustomBaseController : BaseController
    {        
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);            
        }
   
    }

}
