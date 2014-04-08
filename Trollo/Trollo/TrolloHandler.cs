using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;

namespace Trollo
{
    // Proslijeduje posao HttpControllerHandler-u koji dalje nastavlja sa WebAPI izvršenjem.

    public class TrolloHandler : HttpControllerHandler, IRequiresSessionState
    {
        public TrolloHandler(RouteData routeData)
            : base(routeData)
        {
        }
    }
}

// Za sesije trebaju dvije komponente:
// IRouteHandler da kaže da sealed ide našem Handler-unchecked,
// TrelloHandler koji daje oznaku ruti kao da je sesija enable
// i onda nastavlja sa WebApi.