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

namespace MvcTrello.Controllers
{
    public class ListApiController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/ListApi
        public IEnumerable<list> Getlists()
        {
            var list = db.list.Include(l => l.board);
            return list.AsEnumerable();
        }

        // GET api/ListApi/5
        public list Getlist(int id)
        {
            list list = db.list.Find(id);
            if (list == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return list;
        
        }
        [HttpPost]
        // GET api/ListApi/5/5
        public List<list> GetLists(int id, string s) //Vraca liste jednog board-a
        {
            
            List<list> liste = new List<list>();
            var list = db.list.Where(l => l.ownerBoard == id); 
            foreach (var l in list)
            {
                liste.Add(new list { idList = l.idList, title = l.title }); 
            }

            return liste;
        }
        // PUT api/ListApi/5
        public HttpResponseMessage Putlist(int id, list list)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != list.idList)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(list).State = EntityState.Modified;

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

        // POST api/ListApi
        public HttpResponseMessage Postlist(list list)
        {
            if (ModelState.IsValid)
            {
                db.list.Add(list);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, list);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = list.idList }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ListApi/5
        public HttpResponseMessage Deletelist(int id)
        {
            list list = db.list.Find(id);
            if (list == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.list.Remove(list);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, list);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}