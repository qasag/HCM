using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HCM.Filters
{
    public class AdminActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            string userType = (string)context.HttpContext.Session.Contents["UserType"];

            if (userType != "SuperAdmin" && userType != "ClientAdmin")
            {
                RouteValueDictionary redirectTargetDictionary = new RouteValueDictionary();
                redirectTargetDictionary.Add("action", "Index");
                redirectTargetDictionary.Add("controller", "Login");
                context.Result = new RedirectToRouteResult(redirectTargetDictionary);
            }
            base.OnActionExecuting(context);
        }
    }
}