using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Trollo.Controllers
{
    public class UserAPIController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/UserAPI
        public IEnumerable<user> Getusers()
        {
            return db.user.AsEnumerable();
        }


        [Authorize]
        public class UsersController : ApiController
        {
            public string Get()
            {
                return "This is a top secret material that only authorized users can see";
            }
        }

        // GET api/UserAPI/5
        public user Getuser(int id)
        {
            user user = db.user.Find(id);
            if (user == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return user;
        }

        // PUT api/UserAPI/5
        public HttpResponseMessage Putuser(int id, user user)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != user.idUser)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/UserAPI
        public HttpResponseMessage Postuser(user user)
        {
            if (ModelState.IsValid)
            {
                db.user.Add(user);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, user);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = user.idUser }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/UserAPI/5
        public HttpResponseMessage Deleteuser(int id)
        {
            user user = db.user.Find(id);
            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.user.Remove(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}