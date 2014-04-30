using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Trollo.Controllers
{
    public class UserAController : ApiController
    {
        // GET api/usera
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/usera/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/usera
        public void Post([FromBody]string value)
        {
        }

        // PUT api/usera/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/usera/5
        public void Delete(int id)
        {
        }
    }
}
