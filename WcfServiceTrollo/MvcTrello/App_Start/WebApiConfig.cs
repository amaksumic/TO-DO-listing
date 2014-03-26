using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Net.Http;
using System.Web.Routing;


namespace MvcTrello
{
    public class WebApiConfig : System.Web.HttpApplication
    {

        public static void Register(HttpConfiguration config)
        {
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
                defaults: new { title = RouteParameter.Optional, comment = RouteParameter.Optional, 
                    l = RouteParameter.Optional, owner = RouteParameter.Optional, creator = RouteParameter.Optional}
            );

            config.Routes.MapHttpRoute(
                name: "RutaBoard",
                routeTemplate: "api/{controller}/{action}/{board}",
                defaults: new { board = RouteParameter.Optional }
                );



            // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
            // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
            // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
            //config.EnableQuerySupport();

            // To disable tracing in your application, please comment out or remove the following line of code
            // For more information, refer to: http://www.asp.net/web-api
            config.EnableSystemDiagnosticsTracing();
        }
    }
}
