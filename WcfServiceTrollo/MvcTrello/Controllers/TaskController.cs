using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcTrello.Controllers
{
    public class TaskController : Controller
    {
        private mydbEntities db = new mydbEntities();

        //
        // GET: /Task/

        public ActionResult Index()
        {
            var task = db.task.Include(t => t.list).Include(t => t.user);
            return View(task.ToList());
        }

        //
        // GET: /Task/Details/5

        public ActionResult Details(int id = 0)
        {
            task task = db.task.Find(id);
            if (task == null)
            {
                return HttpNotFound();
            }
            return View(task);
        }

        //
        // GET: /Task/Create

        public ActionResult Create()
        {
            ViewBag.ownerList = new SelectList(db.list, "idList", "title");
            ViewBag.taskCreator = new SelectList(db.user, "idUser", "username");
            return View();
        }

        //
        // POST: /Task/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(task task)
        {
            if (ModelState.IsValid)
            {
                db.task.Add(task);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ownerList = new SelectList(db.list, "idList", "title", task.ownerList);
            ViewBag.taskCreator = new SelectList(db.user, "idUser", "username", task.taskCreator);
            return View(task);
        }

        //
        // GET: /Task/Edit/5

        public ActionResult Edit(int id = 0)
        {
            task task = db.task.Find(id);
            if (task == null)
            {
                return HttpNotFound();
            }
            ViewBag.ownerList = new SelectList(db.list, "idList", "title", task.ownerList);
            ViewBag.taskCreator = new SelectList(db.user, "idUser", "username", task.taskCreator);
            return View(task);
        }

        //
        // POST: /Task/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(task task)
        {
            if (ModelState.IsValid)
            {
                db.Entry(task).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ownerList = new SelectList(db.list, "idList", "title", task.ownerList);
            ViewBag.taskCreator = new SelectList(db.user, "idUser", "username", task.taskCreator);
            return View(task);
        }

        //
        // GET: /Task/Delete/5

        public ActionResult Delete(int id = 0)
        {
            task task = db.task.Find(id);
            if (task == null)
            {
                return HttpNotFound();
            }
            return View(task);
        }

        //
        // POST: /Task/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            task task = db.task.Find(id);
            db.task.Remove(task);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}