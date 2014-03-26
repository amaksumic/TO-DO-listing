using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;

namespace MvcTrello
{
    public class TrolloRouteHandler : IRouteHandler //Da bi isao preko našeg TrolloHandler-a.
    {
        IHttpHandler IRouteHandler.GetHttpHandler(RequestContext requestContext)
        {
            return new TrolloHandler(requestContext.RouteData);
        }
    }
}