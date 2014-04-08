using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Routing;

namespace Trollo
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            RouteTable.Routes.MapHttpRoute( //Web API vs. MVC rute
                name: "Ruta1Api",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            ).RouteHandler = new TrolloRouteHandler(); //Dodajemo route handler.

            config.Routes.MapHttpRoute(
                 name: "Ruta4Api",
                 routeTemplate: "api/{controller}/{action}/{task}",
                 defaults: new { task = RouteParameter.Optional }
             );
            config.Routes.MapHttpRoute(
                name: "Ruta2Api",
                routeTemplate: "api/{controller}/{action}/{id}/{s}",
                defaults: new { id = RouteParameter.Optional, s = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "Ruta3Api",
                routeTemplate: "api/{controller}/{action}/{l}/{owner}/{creator}/{title}/{comment}",
                defaults: new
                {
                    title = RouteParameter.Optional,
                    comment = RouteParameter.Optional,
                    l = RouteParameter.Optional,
                    owner = RouteParameter.Optional,
                    creator = RouteParameter.Optional
                }
            );

            config.Routes.MapHttpRoute(
                name: "RutaBoard",
                routeTemplate: "api/{controller}/{action}/{board}",
                defaults: new { board = RouteParameter.Optional }
                );
        }
    }
}
