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
    public class TaskController : Controller
    {
        private mydbEntities db = new mydbEntities();


        public ActionResult Chart1()
        {
            var task1 = db.task.Where(u => u.taskCreator == 1).Count();
            var task2 = db.task.Where(u => u.taskCreator == 2).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Bar })
                .SetTitle(new Title() { Text = "Task creators 1/2" })

                .SetYAxis(new YAxis() { Title = new YAxisTitle { Text = "Number of tasks" } })
                .SetSeries(new[]{
                new Series{                   
                    Name = "Task creator 1",
                    Data = new Data(new object[] { task1 })},
                    new Series{
                    Name = "Task creator 2",
                    Data = new Data(new object[] { task2 })
                }});


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }

        public ActionResult Chart2()
        {
            var task1 = db.task.Where(u => u.label == 1).Count();
            var task2 = db.task.Where(u => u.label == 5).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Pie })
                .SetTitle(new Title() { Text = "Important/Not Important" })
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

                    Data = new Data(new object[] { task1, task2 })
                });


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }

        //
        // GET: /Task/

        public ActionResult Index()
        {
            var task = db.task.Include(t => t.list);
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
            return View();
        }

        //
        // POST: /Task/Create

        [HttpPost]
        public ActionResult Create(task task)
        {
            if (ModelState.IsValid)
            {
                db.task.Add(task);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ownerList = new SelectList(db.list, "idList", "title", task.ownerList);
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
            return View(task);
        }

        //
        // POST: /Task/Edit/5

        [HttpPost]
        public ActionResult Edit(task task)
        {
            if (ModelState.IsValid)
            {
                db.Entry(task).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ownerList = new SelectList(db.list, "idList", "title", task.ownerList);
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