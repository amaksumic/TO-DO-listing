using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;

namespace MvcTrello
{
    public class TrolloHandler : HttpControllerHandler, IRequiresSessionState
    {
        public TrolloHandler(RouteData routeData)
            : base(routeData)
        {
        }
    }
}
