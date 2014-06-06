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
    public class BoardMembersAPIController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/BoardMembersAPI
        public IEnumerable<boardmembers> Getboardmembers()
        {
            return db.boardmembers.AsEnumerable();
        }

        // GET api/BoardMembersAPI/5
        public boardmembers Getboardmembers(int id)
        {
            boardmembers boardmembers = db.boardmembers.Find(id);
            if (boardmembers == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return boardmembers;
        }

        // PUT api/BoardMembersAPI/5
        public HttpResponseMessage Putboardmembers(int id, boardmembers boardmembers)
        {
            if (ModelState.IsValid && id == boardmembers.idboardmembers)
            {
                db.Entry(boardmembers).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }


        [HttpGet]
        // GET api/UserApi/5
        public void UserToBoard(string username, int id)
        {

            List<user> user = new List<user>();
            var users = db.user.Where(a => a.username.Equals(username));

            foreach (user u in users)
            {
                user.Add(new user { idUser = u.idUser, username = u.username, email = u.email });
            }


            if (user.Count() != 0)
            {
                boardmembers boardmember = new boardmembers { idkorisnik = user[0].idUser, idploca = id };

                db.boardmembers.Add(boardmember);
                db.SaveChanges();
            }

        }

        [HttpGet]
        public HttpResponseMessage brisanjeUsera(int idKor)
        {
            boardmembers memb = db.boardmembers.Where(bm => bm.idkorisnik == idKor).FirstOrDefault();
            db.boardmembers.Remove(memb);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public List<user> GetUsers(int id) //Vraca usere jednog board-a
        {

            List<user> liste = new List<user>();
            var kor = from korisnici in db.user
                      join saBord in db.boardmembers on korisnici.idUser equals saBord.idkorisnik
                      where saBord.idploca == id
                      select korisnici ;
           
          
            foreach (var u in kor)
            {
                liste.Add(new user { idUser = u.idUser, username = u.username });
            }
            return liste;
        }

        // POST api/BoardMembersAPI
        public HttpResponseMessage Postboardmembers(boardmembers boardmembers)
        {
            if (ModelState.IsValid)
            {
                db.boardmembers.Add(boardmembers);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, boardmembers);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = boardmembers.idboardmembers }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

       

        // DELETE api/BoardMembersAPI/5
        public HttpResponseMessage Deleteboardmembers(int id)
        {
            boardmembers boardmembers = db.boardmembers.Find(id);
            if (boardmembers == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.boardmembers.Remove(boardmembers);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, boardmembers);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}