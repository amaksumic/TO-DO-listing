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
using System.IO;

using System.Threading.Tasks;
using System.IO;
using System.ComponentModel;
using System.Drawing;
using System.Web.Hosting;
using System.Drawing.Imaging;
using System.Net.Http.Headers;

namespace Trollo.Controllers
{
    public class UserAPIController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        int id = 0;

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

        [HttpGet]
        public string LoginApi(string pass, string name)
        {
            //user user =  db.user.Where(a => a.username.Equals(name) && a.password.Equals(pass)).FirstOrDefault();



            return name+" "+pass;
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
        [HttpGet]
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


        [HttpGet]
        // GET api/UserApi/5
        public user GetUserByUsername(string username)
        {
            List<user> user = new List<user>();
            var users = db.user.Where(a => a.username.Equals(username));
            
            foreach (user u in users)
            {
               user.Add(new user { username = u.username, email = u.email}); 
            }

            if (user.Count() == 0)
            {
                user.Add(new user { username = "User ne postoji"}); 
            }
            return user[0];

        }

        [HttpGet]
        // GET api/UserApi/5
        public user GetUserByEmail(string email)
        {
            List<user> user = new List<user>();
            var users = db.user.Where(a => a.email.Contains(email));

            foreach (user u in users)
            {
                user.Add(new user {username = u.username, email = u.email });
            }

            if (user.Count() == 0)
            {
                user.Add(new user { email = "User ne postoji" });
            }
            return user[0];

        }



        [HttpGet]
        // GET api/UserApi/5
        public string UpdateEmail(int id, string noviemail)
        {

                var user = db.user.Find(id);

                //user.registered = 1;
                if (noviemail != "") user.email = noviemail;

                db.Entry(user).State = EntityState.Modified;

                db.SaveChanges();

            return "Izmjena uspješno izvršena!";

        }

        [HttpGet]
        // GET api/UserApi/5
        public string UpdatePassword(int id, string novi, string repeate)
        {

            var user = db.user.Find(id);            

            //user.registered = 1;
            if (novi != "" && novi.Equals(repeate)) user.password = novi;

            db.Entry(user).State = EntityState.Modified;

            db.SaveChanges();

            return "Izmjena uspješno izvršena!";

        }

        [HttpGet]
        // GET api/UserApi/5
        public string UpdateUsername(int id, string novi)
        {

            var user = db.user.Find(id);

            //user.registered = 1;
            if (novi != "")
            {

                user.username = novi;

                db.Entry(user).State = EntityState.Modified;

                db.SaveChanges();

                return "Izmjena uspješno izvršena!";
            }
            else return "Password se ne podudara!";

        }
/*
        [HttpPost]
        public async Task<HttpResponseMessage> UpdateAvatar()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                // Show all the key-value pairs.
                foreach (var key in provider.FormData.AllKeys)
                {
                    foreach (var val in provider.FormData.GetValues(key))
                    {
                        System.Diagnostics.Trace.WriteLine(string.Format("{0}: {1}", key, val));
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

            return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "!");

        }

        /*
                user user = db.user.Find(id);
                user.picture = relativePath;
                db.Entry(user).State = EntityState.Modified;


                db.SaveChanges();
*/


        [HttpGet]
        // GET api/UserApi/5
        public user Registration(string username, string pass, string email)
        {
            user kor = new user(0, username, pass, email);
            kor.picture = "~/uploads/anonim.jpg";
            db.user.Add(kor);
            db.SaveChanges();
            ModelState.Clear();
            return kor;
        }

        [HttpGet]
        // GET api/UserApi/5
        public int GetId(string username)
        {
            user kor = new user();
            kor = db.user.Where(u=>u.username.Equals(username)).FirstOrDefault();

            return kor.idUser;

        }

        [HttpGet]
        // GET api/UserApi/5
        public user GetPath(string username)
        {
            user kor = new user();
            kor = db.user.Where(u => u.username.Equals(username)).FirstOrDefault();
            user kor2 = new user(kor.picture);
            return kor2;

        }

        [HttpGet]
        // GET api/UserApi/5
        public user Login(string username, string pass)
        {

            user kor = new user();
            kor = db.user.Where(a => a.username.Equals(username) && a.password.Equals(pass)).FirstOrDefault();

            id = kor.idUser;
            
            if (kor != null)
            {
                return kor;
            }
            return null;
        }

        [HttpGet]
        public string Logout()
        {
            return null;
        }


    }
}