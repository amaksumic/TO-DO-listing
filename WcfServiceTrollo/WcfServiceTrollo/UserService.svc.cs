using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceTrollo
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "UserService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select UserService.svc or UserService.svc.cs at the Solution Explorer and start debugging.
    public class UserService : IUserService
    {
        public User GetUser(int id)
        {
            User korisnik = null;
            using (var context = new mydbEntities())
            {
                var user = (from p in context.user where p.idUser == id select p).FirstOrDefault();

                if (user != null)
                    korisnik = TranslateuserToUser(user);
                else
                    throw new Exception(string.Format("Invalid product id {0}", id));
            }
            return korisnik;
        }

        private User TranslateuserToUser(user maliUser)
        {
            User korisnik = new User();
            korisnik.idUser = maliUser.idUser;
            korisnik.username = maliUser.username;
            korisnik.password = maliUser.password;
            korisnik.creationDate = maliUser.creationDate;
            korisnik.email = maliUser.email;
            return korisnik;
        }
    }
  }
