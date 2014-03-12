using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Trollo.Models;

namespace Trollo.Controllers
{
    public class BoardController : Controller
    {
        private mydbEntities db = new mydbEntities();

        //
        // GET: /Board/

        public ActionResult Index()
        {
            var board = db.board.Include(b => b.user);
            return View(board.ToList());
        }

        //
        // GET: /Board/Details/5

        public ActionResult Details(int id = 0)
        {
            board board = db.board.Find(id);
            if (board == null)
            {
                return HttpNotFound();
            }
            return View(board);
        }

        //
        // GET: /Board/Create

        public ActionResult Create()
        {
            ViewBag.boardOwner = new SelectList(db.user, "idUser", "username");
            return View();
        }

        //
        // POST: /Board/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(board board)
        {
            if (ModelState.IsValid)
            {
                db.board.Add(board);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.boardOwner = new SelectList(db.user, "idUser", "username", board.boardOwner);
            return View(board);
        }

        //
        // GET: /Board/Edit/5

        public ActionResult Edit(int id = 0)
        {
            board board = db.board.Find(id);
            if (board == null)
            {
                return HttpNotFound();
            }
            ViewBag.boardOwner = new SelectList(db.user, "idUser", "username", board.boardOwner);
            return View(board);
        }

        //
        // POST: /Board/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(board board)
        {
            if (ModelState.IsValid)
            {
                db.Entry(board).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.boardOwner = new SelectList(db.user, "idUser", "username", board.boardOwner);
            return View(board);
        }

        //
        // GET: /Board/Delete/5

        public ActionResult Delete(int id = 0)
        {
            board board = db.board.Find(id);
            if (board == null)
            {
                return HttpNotFound();
            }
            return View(board);
        }

        //
        // POST: /Board/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            board board = db.board.Find(id);
            db.board.Remove(board);
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