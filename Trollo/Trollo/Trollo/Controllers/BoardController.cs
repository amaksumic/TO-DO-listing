using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DotNet.Highcharts;
using DotNet.Highcharts.Enums;
using DotNet.Highcharts.Helpers;
using DotNet.Highcharts.Options;

namespace Trollo.Controllers
{
    public class BoardController : Controller
    {
        private mydbEntities db = new mydbEntities();

        public ActionResult Chart1()
        {
            var board1 = db.board.Where(u => u.boardOwner == 1).Count();
            var board2 = db.board.Where(u => u.boardOwner == 2).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Column })
                .SetTitle(new Title() { Text = "Board Owners" })

                .SetYAxis(new YAxis() { Title = new YAxisTitle { Text = "Number of boards" } })
                .SetSeries(new[]{
                new Series{                   
                    Name = "Board owner 1",
                    Data = new Data(new object[] { board1 })},
                    new Series{
                    Name = "Board owner 2",
                    Data = new Data(new object[] { board2 })
                }});


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }

        public ActionResult Chart2()
        {
            var board1 = db.board.Where(u => u.title.Contains("a")).Count();
            var board2 = db.board.Where(u => u.title.Contains("b")).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Pie })
                .SetTitle(new Title() { Text = "Board Titles A/B" })
                .SetPlotOptions(new PlotOptions
                {
                    Pie = new PlotOptionsPie
                    {
                        AllowPointSelect = true,
                        //Cursor = Cursors.Pointer,
                        DataLabels = new PlotOptionsPieDataLabels
                        {

                            Formatter = "function() { return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %'; }"
                        }
                    }
                })
                
                .SetSeries(new Series
                {
                    Type = ChartTypes.Pie,

                    Data = new Data(new object[] { board1, board2 })
                });


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }
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