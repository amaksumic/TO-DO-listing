using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcTrello.Controllers
{
    public class ListaController : Controller
    {
        private mydbEntities db = new mydbEntities();

        //
        // GET: /Lista/

        public ActionResult Index()
        {
            var list = db.list.Include(l => l.board);
            return View(list.ToList());
        }

        //
        // GET: /Lista/Details/5

        public ActionResult Details(int id = 0)
        {
            list list = db.list.Find(id);
            if (list == null)
            {
                return HttpNotFound();
            }
            return View(list);
        }

        //
        // GET: /Lista/Create

        public ActionResult Create()
        {
            ViewBag.ownerBoard = new SelectList(db.board, "idBoard", "title");
            return View();
        }

        //
        // POST: /Lista/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(list list)
        {
            if (ModelState.IsValid)
            {
                db.list.Add(list);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ownerBoard = new SelectList(db.board, "idBoard", "title", list.ownerBoard);
            return View(list);
        }

        //
        // GET: /Lista/Edit/5

        public ActionResult Edit(int id = 0)
        {
            list list = db.list.Find(id);
            if (list == null)
            {
                return HttpNotFound();
            }
            ViewBag.ownerBoard = new SelectList(db.board, "idBoard", "title", list.ownerBoard);
            return View(list);
        }

        //
        // POST: /Lista/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(list list)
        {
            if (ModelState.IsValid)
            {
                db.Entry(list).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ownerBoard = new SelectList(db.board, "idBoard", "title", list.ownerBoard);
            return View(list);
        }

        //
        // GET: /Lista/Delete/5

        public ActionResult Delete(int id = 0)
        {
            list list = db.list.Find(id);
            if (list == null)
            {
                return HttpNotFound();
            }
            return View(list);
        }

        //
        // POST: /Lista/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            list list = db.list.Find(id);
            db.list.Remove(list);
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