﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using Trollo.Controllers;
using Trollo.Models;

namespace Trollo
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public void DoWork()
        {
            user korisnik = new user();
            korisnik.username = "sda";
            korisnik.password = "asdf";
            korisnik.creationDate = DateTime.Now;

            UserController controler = new UserController();
            controler.Create(korisnik);
        }
    }
}
