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
            return View(u);

        }

        public ActionResult AfterLogin()
        {
            if (Session["LogedUserID"] != null)
            {

                kor = TempData["korisnik"] as user;
                return View(kor);
                //return "id " +kor.idUser;
            }
            else
            {
                return RedirectToAction("Index");
                //return "nema sesije";
            }
        }
    }
}
