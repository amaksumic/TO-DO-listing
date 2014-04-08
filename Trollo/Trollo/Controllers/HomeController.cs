using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Trollo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(user u)
        {
            // this action is for handle post (login)
            if (ModelState.IsValid) // this is check validity
            {
                using (mydbEntities dc = new mydbEntities())
                {
                    var v = dc.user.Where(a => a.username.Equals(u.username) && a.password.Equals(u.password)).FirstOrDefault();

                    if (v != null)
                    {
                        Session["LogedUserID"] = v.idUser.ToString();
                        //Session["LogedUserFullname"] = v.FullName.ToString();
                        return RedirectToAction("AfterLogin");
                    }
                }
            }
            return View(u);
        }


        public ActionResult AfterLogin()
        {
            if (Session["LogedUserID"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index");
            }
        }
    }
}
