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
    public class TaskAPIController : ApiController
    {
        private mydbEntities db = new mydbEntities();

        // GET api/TaskApi
        public List<task> Gettasks()
        {
            List<task> tasks = new List<task>();

            var task = db.task.Include(t => t.list);

            foreach (var t in task)
            {
                tasks.Add(new task { idTask = t.idTask, title = t.title, ownerList=t.ownerList, label = t.label, comment=t.comment, startTime=t.startTime, endTime=t.endTime });
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
            var session = HttpContext.Current.Session;
            if (session != null)
            {
                string Admin = session["Admin"].ToString();
            }
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



        [HttpGet]
        // GET api/TaskApi/5/5
        public  List<obaveze> GetTasksByOwner(int id) //Vraca task-ove za task creatora
        {

            List<obaveze> obaveze = new List<obaveze>();



             IEnumerable<obaveze> assignment = db.Database.SqlQuery<obaveze>("SELECT t.title as task, l.title as list, b.title as board, b.idBoard as id FROM board b, list l, task t, taskmembers tm WHERE t.ownerList = l.idList AND" + 
                            " l.ownerBoard = b.idBoard AND t.idTask = tm.idtask AND tm.iduser = {0}", id);


            foreach (var a in assignment)
            {
                obaveze.Add(new obaveze { task = a.task, list = a.list, board=a.board, id = a.id});
            }
            return obaveze;
        }


        [HttpGet]
        // GET api/TaskApi/5/5
        public void TaskToMember(string username, int idtask) //Vraca task-ove za task creatora
        {

              
                user kor = new user();
                kor = db.user.Where(a => a.username.Equals(username)).FirstOrDefault();

                    taskmembers taskmember = new taskmembers { idtask = idtask, iduser = kor.idUser };

                    db.taskmembers.Add(taskmember);
                    db.SaveChanges();

        }


        [HttpGet]
        public String GetAllProducts()
        {
            var session = HttpContext.Current.Session;
            if (session != null)
            {
                string Admin = session["Admin"].ToString();
            }
            return "sesija je null";
        }

        // PUT api/TaskApi/5
        /*public HttpResponseMessage Puttask(task task)
         {
             //task task = new task; 
             List<task> tasks = new List<task>();
             var task2 = db.task.Where(t => t.taskCreator == task.idTask); //To se ovdje odredi, ima svakakvih mimo Where, 
             //čak i select, na fazon upita je.

             foreach (var t in task)
             {
                 tasks.Add(new task { idTask = t.idTask, title = t.title }); //Ovo je da bi se ispisalo, ako se
                 //ne dodaju svi atributi ispisat će ih samo djelimično, odnosno kod mene svuda piše nil i 0
                 //sem za polja koja sam navela.
             }

             return tasks;
         }*/

        //** B I L O  Č E G A  -  IZMJENA

        // /api/TaskApi/UpdateTask/task?id=9
        // {"idTask" : 9, "title" : "21BOO", "comment" : "23HALLO!", "label" : 1, "ownerList" : 1, "taskCreator" : 1}

        // POST api/TaskApi/5
        [HttpGet]
        public void UpdateTask(int id, string comment, bool label)
        {
            /*var session = HttpContext.Current.Session;
            if (session != null)
            {
                string Admin = session["Admin"].ToString();
            }*/
            //int id = 9;
            //if (ModelState.IsValid && id == task.idTask)
            //{
                //Ovdje se mijenjam->

                var task = db.task.Find(id);
                
                    task.comment = comment;
                    if (label == true) task.label = 1;
                    else task.label = 0;

                    db.Entry(task).State = EntityState.Modified;

                    db.SaveChanges();

            //}
            //else
            //{
              //  return Request.CreateResponse(HttpStatusCode.BadRequest);
            //}
        }


        //** D O D A V A NJ E

        ///api/TaskApi/CreateTask/task
        //{"title" : "21BOO", "comment" : "23HALLO!", "label" : 1, "ownerList" : 1, "taskCreator" : 1}

        // POST api/TaskApi
        [HttpPost]
        public HttpResponseMessage CreateTask(task task)
        {
            var session = HttpContext.Current.Session;
            if (session != null)
            {
                string Admin = session["Admin"].ToString();
            }
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
            var session = HttpContext.Current.Session;
            if (session != null)
            {
                string Admin = session["Admin"].ToString();
            }
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