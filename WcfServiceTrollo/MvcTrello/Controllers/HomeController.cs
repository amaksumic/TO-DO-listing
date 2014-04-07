using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcTrello.Helpers;

namespace MvcTrello.Controllers
{
    public class HomeController : BaseController
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


        public ActionResult SetCulture(string culture)
        {
            // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);
            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
                cookie.Value = culture;   // update cookie value
            else
            {
                cookie = new HttpCookie("_culture");
                cookie.Value = culture;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);
            return RedirectToAction("Index");
        }  

    }
}
