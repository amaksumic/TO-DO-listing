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
    public class TaskmembersAPIController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/TaskmembersAPI
        public IEnumerable<taskmembers> Gettaskmembers()
        {
            return db.taskmembers.AsEnumerable();
        }

        // GET api/TaskmembersAPI/5
        public taskmembers Gettaskmembers(int id)
        {
            taskmembers taskmembers = db.taskmembers.Find(id);
            if (taskmembers == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return taskmembers;
        }
        [HttpGet]
        public HttpResponseMessage brisanjeUsera(int idKor, int idT)
        {
            taskmembers memb = db.taskmembers.Where(tm => tm.iduser == idKor && tm.idtask==idT).FirstOrDefault();
            db.taskmembers.Remove(memb);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

       


        public List<user> GetUsers(int id) //Vraca usere na tasku
        {

            List<user> liste = new List<user>();
            var kor = from korisnici in db.user
                      join saTask in db.taskmembers on korisnici.idUser equals saTask.iduser
                      where saTask.idtask == id
                      select korisnici;


            foreach (var u in kor)
            {
                liste.Add(new user { idUser = u.idUser, username = u.username });
            }
            return liste;
        }

        // PUT api/TaskmembersAPI/5
        public HttpResponseMessage Puttaskmembers(int id, taskmembers taskmembers)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != taskmembers.idtaskmembers)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(taskmembers).State = EntityState.Modified;

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

        // POST api/TaskmembersAPI
        public HttpResponseMessage Posttaskmembers(taskmembers taskmembers)
        {
            if (ModelState.IsValid)
            {
                db.taskmembers.Add(taskmembers);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, taskmembers);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = taskmembers.idtaskmembers }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/TaskmembersAPI/5
        public HttpResponseMessage Deletetaskmembers(int id)
        {
            taskmembers taskmembers = db.taskmembers.Find(id);
            if (taskmembers == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.taskmembers.Remove(taskmembers);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, taskmembers);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}