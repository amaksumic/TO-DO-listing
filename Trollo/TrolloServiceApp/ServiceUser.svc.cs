using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service2" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service2.svc or Service2.svc.cs at the Solution Explorer and start debugging.
    public class ServiceUser : IServiceUser
    {

       public bool CreateUser(User korisnik)
        {

            try
            {

                mydbEntities ent = new mydbEntities();

                user kor = new user
                {
                    idUser = 1,
                    username = "asdad",
                    password = "asda"
                };

                ent.user.Add(kor);
                ent.SaveChanges();

                return true;
            }

            catch (Exception exc)
            {
                return false;
            }
            
        }


       public bool DeleteUser(int idUsera)
       {

           try
           {

               mydbEntities ent = new mydbEntities();

              

               user kor = ent.user.Find(idUsera);

               ent.user.Remove(kor);

              
               ent.SaveChanges();

               return true;
           }

           catch (Exception exc)
           {
               return false;
           }

       }
       
    }
}

