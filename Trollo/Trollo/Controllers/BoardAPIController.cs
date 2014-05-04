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
    public class BoardAPIController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/BoardApi
        public List<board> Getboards()
        {
            try
            {
                var board = db.board.Include(b => b.user);
                return board.ToList();
            }
            catch (Exception exc)
            {
                string s = exc.Message;
                return null;
            }
        }

        [HttpGet]
        // GET api/BoardApi/5
        public List<board> Getboard(int id)
        {
            ////board board = db.board.Find(id);
            //var boardByID = from b in db.board
            //                where b.boardOwner == id
            //                select b;
            //if (boardByID == null)
            //{
            //    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            //}
            //List<board> list = boardByID.ToList();
            //return list;

            List<board> Boards = new List<board>();

            //var session = HttpContext.Current.Session;
            //if (session != null)
            //{
            //string Admin = session["Admin"].ToString();
            //task task = new task; 

            var board = db.board.Where(b => b.boardOwner  == id); 

            foreach (var b in board)
            {
                Boards.Add(new board { idBoard = b.idBoard, title = b.title }); 
            }
            return Boards;
        }

        // PUT api/BoardApi/5
        public HttpResponseMessage Putboard(int id, board board)
        {
            if (ModelState.IsValid && id == board.idBoard)
            {
                db.Entry(board).State = EntityState.Modified;

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

        // GET api/BoardApi/5


        // POST api/BoardApi
        public HttpResponseMessage Postboard(board board)
        {
            if (ModelState.IsValid)
            {
                db.board.Add(board);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, board);
                response.Headers.Location = new Uri(Url.Link("RutaBoard", new { id = board.idBoard }));


                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/BoardApi/5
        public HttpResponseMessage Deleteboard(int id)
        {
            board board = db.board.Find(id);
            if (board == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.board.Remove(board);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, board);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}