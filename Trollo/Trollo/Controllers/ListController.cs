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
    public class ListController : Controller
    {
        private mydbEntities db = new mydbEntities();


        public ActionResult Chart1()
        {
            var list1 = db.list.Where(u => u.ownerBoard == 1).Count();
            var list2 = db.list.Where(u => u.ownerBoard == 2).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Bar })
                .SetTitle(new Title() { Text = "Owner board 1/2" })

                .SetYAxis(new YAxis() { Title = new YAxisTitle { Text = "Number of lists" } })
                .SetSeries(new[]{
                new Series{                   
                    Name = "Owner board 1",
                    Data = new Data(new object[] { list1 })},
                    new Series{
                    Name = "Owner board 2",
                    Data = new Data(new object[] { list2 })
                }});


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }

        public ActionResult Chart2()
        {
            var list1 = db.list.Where(u => u.title.Contains("To do")).Count();
            var list2 = db.list.Where(u => u.title.Contains("Doing")).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Pie })
                .SetTitle(new Title() { Text = "To do/Doing" })
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

                    Data = new Data(new object[] { list1, list2 })
                });


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }

        //
        // GET: /List/

        public ActionResult Index()
        {
            var list = db.list.Include(l => l.board);
            return View(list.ToList());
        }

        //
        // GET: /List/Details/5

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
        // GET: /List/Create

        public ActionResult Create()
        {
            ViewBag.ownerBoard = new SelectList(db.board, "idBoard", "title");
            return View();
        }

        //
        // POST: /List/Create

        [HttpPost]
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
        // GET: /List/Edit/5

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
        // POST: /List/Edit/5

        [HttpPost]
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
        // GET: /List/Delete/5

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
        // POST: /List/Delete/5

        [HttpPost, ActionName("Delete")]
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