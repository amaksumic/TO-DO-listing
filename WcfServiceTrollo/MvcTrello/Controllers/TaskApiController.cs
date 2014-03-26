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
        public string title { get; set; }
        public string comment { get; set; }
        public int l { get; set; }
        public int owner { get; set; }
        public int creator { get; set; }
    }
    public class TaskApiController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/TaskApi
        public List<task> Gettasks()
        {
            List<task> tasks = new List<task>();

            var task = db.task.Include(t => t.list).Include(t => t.user);

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title });
            }

            return tasks;
        }

        // GET api/TaskApi/5
        public task Gettask(int id)
        {
            task task = new task();

            var t = db.task.Find(id);

            task = new task { idTask = t.idTask, title = t.title };

            if (task == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return task;
        }

        //** L I S T A  I  NJENI TASKOVI

        // GET api/TaskApi/5/5
        [HttpGet]
        public List<task> GetListsTasks(int id)
        {
            //task task = new task; 
            List<task> tasks = new List<task>();

            //-> Ovdje se trazim!
            var task = db.task.Where(t => t.ownerList == id);

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title });
            }

            return tasks;
        }


        //** K O R I S N I K  I  TASKOVI KOJE JE KREIRAO



        // GET api/TaskApi/5/5
        public List<task> GetTasksByCreator(int id) //Vraca task-ove za task creatora
        {
            //task task = new task; 
            List<task> tasks = new List<task>();
            var task = db.task.Where(t => t.taskCreator == id); //to se ovdje odredi, ima svakakvih mimo Where, 
            //čak i select, na fazon upita je

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title }); //ovo je da bi se ispisalo, ako se
                //ne dodaju svi atributi ispisati će ih samo djelimično, donosno kod mene svuda piše nil i 0
                //sem za polja koja sam navela
            }

            return tasks;
        }


        // GET api/TaskApi/5/5
        public List<task> GetTasksByCreator(int id) //Vraca task-ove za task creatora
        {
            //task task = new task; 
            List<task> tasks = new List<task>();
            var task = db.task.Where(t => t.taskCreator == id); //to se ovdje odredi, ima svakakvih mimo Where, 
            //čak i select, na fazon upita je

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title }); //ovo je da bi se ispisalo, ako se
                //ne dodaju svi atributi ispisati će ih samo djelimično, donosno kod mene svuda piše nil i 0
                //sem za polja koja sam navela
            }

            return tasks;
        }


        // GET api/TaskApi/5/5
        public List<task> GetTasksByCreator(int id) //Vraca task-ove za task creatora
        {
            //task task = new task; 
            List<task> tasks = new List<task>();
            var task = db.task.Where(t => t.taskCreator == id); //to se ovdje odredi, ima svakakvih mimo Where, 
            //čak i select, na fazon upita je

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title }); //ovo je da bi se ispisalo, ako se
                //ne dodaju svi atributi ispisati će ih samo djelimično, donosno kod mene svuda piše nil i 0
                //sem za polja koja sam navela
            }

            return tasks;
        }


        // GET api/TaskApi/5/5
        public List<task> GetTasksByCreator(int id) //Vraca task-ove za task creatora
        {
            //task task = new task; 
            List<task> tasks = new List<task>();
            var task = db.task.Where(t => t.taskCreator == id); //to se ovdje odredi, ima svakakvih mimo Where, 
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
            //task task = new task; 
            List<task> tasks = new List<task>();
            var task = db.task.Where(t => t.taskCreator == id); //To se ovdje odredi, ima svakakvih mimo Where, 
            //čak i select, na fazon upita je.

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title }); //Ovo je da bi se ispisalo, ako se
                //ne dodaju svi atributi ispisat će ih samo djelimično, odnosno kod mene svuda piše nil i 0
                //sem za polja koja sam navela.
            }

            return tasks;
        }

        //** B I L O  Č E G A  -  IZMJENA

        // /api/TaskApi/UpdateTask/task?id=9
        // {"idTask" : 9, "title" : "21BOO", "comment" : "23HALLO!", "label" : 1, "ownerList" : 1, "taskCreator" : 1}

        // POST api/TaskApi/5
        [HttpPost]
        public HttpResponseMessage UpdateTask(task task, int id)
        {
            //int id = 9;
            if (ModelState.IsValid && id == task.idTask)
            {
                //Ovdje se mijenjam->
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


        //** D O D A V A NJ E

        ///api/TaskApi/CreateTask/task
        //{"title" : "21BOO", "comment" : "23HALLO!", "label" : 1, "ownerList" : 1, "taskCreator" : 1}

        // POST api/TaskApi
        [HttpPost]
        public HttpResponseMessage CreateTask(task task)
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

        //** B R I S A NJ E

        // DELETE api/TaskApi/5
        [HttpGet]
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