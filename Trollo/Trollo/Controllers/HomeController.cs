using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Trollo.Helpers;


namespace Trollo.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login()
        {
           return View("../Home/Login");
        }

        user kor = null;
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(user u)
        {
            // this action is for handle post (login)
            if (ModelState.IsValid) // this is check validity
            {
                using (mydbEntities dc = new mydbEntities())
                {
                    kor = dc.user.Where(a => a.username.Equals(u.username) && a.password.Equals(u.password)).FirstOrDefault();

                    if (kor != null)
                    {
                        Session["LogedUserID"] = kor.idUser.ToString();
                        TempData["korisnik"] = kor;
                        //Session["LogedUserFullname"] = v.FullName.ToString();
                        return RedirectToAction("AfterLogin");
                    }
                }
            }
            return RedirectToAction("../Home/Index");

        }

        public ActionResult AfterLogin()
        {
            if (Session["LogedUserID"] != null)
            {
                mydbEntities dc = new mydbEntities();


                kor = TempData["korisnik"] as user;
                var br = dc.board.Count(b => b.boardOwner == kor.idUser);
                TempData["borad"] = br;
                return View(kor);
                //return "id " +kor.idUser;
            }
            else
            {
                return RedirectToAction("Index");
                //return "nema sesije";
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
