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
    public class PostTask
    {
        public string title {get; set;}
        public string comment{get; set;}
        public int l{get; set;}
        public int owner{get; set;}
        public int creator{get; set;}
    }
    public class TaskApiController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/TaskApi
        public IEnumerable<task> Gettasks()
        {
            var task = db.task.Include(t => t.list).Include(t => t.user);
            return task.AsEnumerable();
        }

        // GET api/TaskApi/5
        public task Gettask(int id)
        {
            task task = db.task.Find(id);
            if (task == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return task;
        }

        // GET api/TaskApi/5/5
        public List<task> GetTasks(int id, string s) //Vraca task-ove jedne liste.
        {
            //task task = new task; 
            List<task> tasks = new List<task>();
            var task = db.task.Where(t => t.ownerList == id); //to se ovdje odredi, ima svakakvih mimo Where, 
                                                                //čak i select, na fazon upita je

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title }); //ovo je da bi se ispisalo, ako se
                //ne dodaju svi atributi ispisati će ih samo djelimično, donosno kod mene svuda piše nil i 0
                //sem za polja koja sam navela
            }

            return tasks;
        }

        // PUT api/TaskApi/5
        public HttpResponseMessage Puttask(int id, task task)
        {
            if (ModelState.IsValid && id == task.idTask)
            {
                db.Entry(task).State = EntityState.Modified;

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


        // POST api/TaskApi
        [HttpPost]
        public HttpResponseMessage Posttask(task task)
        {
            if (ModelState.IsValid)
            {
                db.task.Add(task);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, task);
                response.Headers.Location = new Uri(Url.Link("Ruta4Api", new { id = task.idTask }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        //idTask, title, comment, label, ownerList, taskCreator

        // GET api/TaskApi/CreateTasks/5/5
        [HttpGet]
        public string CreateTasks(int l, int owner, int creator, string title, string comment) //Vraca task-ove jedne liste.
        {
            task task = new task(title, comment, l, owner, creator); 
            //List<task> tasks = new List<task>();
            //var task = db.task.Where(t => t.ownerList == l); //to se ovdje odredi, ima svakakvih mimo Where, 
            //čak i select, na fazon upita je

            db.task.Add(task);
            db.SaveChanges();

            return "Dodan sam!";
        }

        // DELETE api/TaskApi/5
        public HttpResponseMessage Deletetask(int id)
        {
            task task = db.task.Find(id);
            if (task == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.task.Remove(task);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, task);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}