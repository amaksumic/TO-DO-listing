using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MvcTrello.Controllers
{
    public class ValuesController 
    {
        public ValuesController() { }

      // GET api/values
        [HttpGet]
        public string Get(int id)
        {
            /*-var session = HttpContext.Current.Session;
            if (session != null)
            {
                if (session["Time"] == null)
                    session["Time"] = DateTime.Now;
                return "Session Time: " + session["Time"] ;
            }*/
            return "Session is not availabe";
        }
        
  

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}