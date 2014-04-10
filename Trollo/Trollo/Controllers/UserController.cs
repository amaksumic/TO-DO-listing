using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Recaptcha.Web;
using Recaptcha.Web.Mvc;
using System.Threading.Tasks;

using System.Net.Mail;
using System.Net;
using System.IO;

using DotNet.Highcharts;
using DotNet.Highcharts.Enums;
using DotNet.Highcharts.Helpers;
using DotNet.Highcharts.Options;

namespace Trollo.Controllers
{

    public class EmailManager
    {
        private const string EmailFrom = "noreplay@gmail.com";
        public static void SendConfirmationEmail(user user)
        {
            //var user = Membership.GetUser(userName.ToString());
            var confirmationGuid = user.idUser.ToString();
            var verifyUrl = HttpContext.Current.Request.Url.GetLeftPart
               (UriPartial.Authority) + "/User/Verification/" + confirmationGuid;

            string subject = "Potvrdite svoju prijavu";
            string body = "Dragi/a " + user.username + "\nKlikom na link u nastavku potvrdujete svoju prijavu: "
               + verifyUrl + "\nLijep pozdrav, \n\nMolimo da ovaj mail ne proslijedujete. Link za potvrdu je privatan.";


            MailAddress posiljalac = new MailAddress("nwt.application@gmail.com", "Trollo");
            MailAddress primalac = new MailAddress(user.email);
            MailMessage message= new MailMessage(posiljalac, primalac);

            message.Subject = subject;
            message.Body = body;

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("nwt.application@gmail.com", "Hana1409"),
                EnableSsl = true
            };

            client.Send(message);

            
           // client.Send("noreply@trollo.net", user.email, subject, body);
           
        }
    } 


    public class UserController : BaseController
    {
        private mydbEntities db = new mydbEntities();


        public ActionResult Chart1()
        {
            var user1 = db.user.Where(u => u.email.Contains("a")).Count();
            var user2 = db.user.Where(u => u.email.Contains("e")).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Column })
                .SetTitle(new Title() { Text = "Username A/B" })

                .SetYAxis(new YAxis() { Title = new YAxisTitle { Text = "Number of boards" } })
                .SetSeries(new[]{
                new Series{                   
                    Name = "Board owner 1",
                    Data = new Data(new object[] { user1 })},
                    new Series{
                    Name = "Board owner 2",
                    Data = new Data(new object[] { user2 })
                }});


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }

        public ActionResult Chart2()
        {
            var user1 = db.user.Where(u => u.email.Contains("etf.unsa.ba")).Count();
            var user2 = db.user.Where(u => u.email.Contains("hotmail.com")).Count();

            //Create chart Model
            var chart1 = new Highcharts("Chart1");
            chart1
                .InitChart(new Chart() { DefaultSeriesType = ChartTypes.Pie })
                .SetTitle(new Title() { Text = "Email etf.unsa.ba/hotmail.com" })
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

                    Data = new Data(new object[] { user1, user2 })
                });


            //pass Chart1Model using ViewBag
            ViewBag.Chart1Model = chart1;

            return View();
        }

        //
        // GET: /User/

        public ActionResult Index()
        {
            return View(db.user.ToList());
        }

        public ActionResult Registration()
        {
            return View();
        }

        public ActionResult Affirmation()
        {
            return View();
        }

        /*
        public ActionResult Verification()
        {
            return View();
        }
        */

        //
        // GET: /User/Details/5

        public ActionResult Details(int id = 0)
        {
            user user = db.user.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        //
        // GET: /User/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /User/Create

        [HttpPost]
        public ActionResult Create(user user)
        {
            if (ModelState.IsValid)
            {
                db.user.Add(user);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(user);
        }

        //
        // GET: /User/Edit/5

        public ActionResult Edit(int id = 0)
        {
            user user = db.user.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        //
        // POST: /User/Edit/5

        [HttpPost]
        public ActionResult Edit(user user)
        {
            if (ModelState.IsValid)
            {
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return View("../Home/AfterLogin", user);
            }
            return View(user);
        }

        [HttpPost]
        public ActionResult GetDocument(HttpPostedFileBase file, int id)
        {
            // Verify that the user selected a file
            if (file != null && file.ContentLength > 0)
            {
                // extract only the fielname
                // var fileName = Path.GetFileName(file.FileName);
                // store the file inside ~/App_Data/uploads folder
                // var path = Path.Combine(Server.MapPath("../uploads"), fileName);
                string relativePath = "~/uploads/" + Path.GetFileName(file.FileName);
                string physicalPath = Server.MapPath(relativePath);
                file.SaveAs(physicalPath);

                user user = db.user.Find(id);
                user.picture = relativePath;
                db.Entry(user).State = EntityState.Modified;


                db.SaveChanges();

                return View("../Home/AfterLogin", user);

            }
            //  // redirect back to the index action to show the form once again
            //  return "id " + user.idUser + " " + user.slika;
            return View("../Home/Index");
        }

        //
        // GET: /User/Delete/5

        public ActionResult Delete(int id = 0)
        {
            user user = db.user.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        //
        // POST: /User/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            user user = db.user.Find(id);
            db.user.Remove(user);
            db.SaveChanges();
            return RedirectToAction("../Home/Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        //
        // --> R E G I S T R A C I J A

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Registration(user u)
        {
            if (ModelState.IsValid /*!String.IsNullOrEmpty(recaptchaHelper.Response) && recaptchaResult == RecaptchaVerificationResult.Success*/)
            {
                if (u.username != "" && u.password != "" && u.email != "")
                {

                    RecaptchaVerificationHelper recaptchaHelper = this.GetRecaptchaVerificationHelper();
                    RecaptchaVerificationResult recaptchaResult = await recaptchaHelper.VerifyRecaptchaResponseTaskAsync();

                    if (String.IsNullOrEmpty(recaptchaHelper.Response))
                    {
                        ViewBag.Message = "Recaptch polje ne smije biti prazno!";
                    }
                    else if (recaptchaResult != RecaptchaVerificationResult.Success)
                    {
                        ViewBag.Message = "Unos u Recaptch polje nije ispravan!";
                    }

                    else
                    {
                        using (mydbEntities dc = new mydbEntities())
                        {
                            u.registered = 0;
                            u.picture = "~/uploads/anonim.jpg";
                            dc.user.Add(u);
                            dc.SaveChanges();
                            ModelState.Clear();

                            EmailManager.SendConfirmationEmail(u);

                            u = null;
                            //ViewBag.Message = "Registracija je uspjesna";

                            return RedirectToAction("Affirmation");
                        }
                    }
                }
            }
            return View(u);
        }

        //
        // --> P O T V R D A   Z A   R E G I S T R A C I J U

        public ActionResult Verification(int id)
        {

                var user = db.user.Find(id);

                if (user.registered == 0)
                {
                    user.registered = 1;

                    db.Entry(user).State = EntityState.Modified;
                    db.SaveChanges();

                    Session["LogedUserID"] = user.idUser.ToString();
                    return RedirectToAction("Create", "Board");
                }
                else
                {
                    return RedirectToAction("Login", "Home");
                }
            
        } 

       

    }
}