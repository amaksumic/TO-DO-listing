using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ServiceBoard" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ServiceBoard.svc or ServiceBoard.svc.cs at the Solution Explorer and start debugging.
    public class ServiceBoard : IServiceBoard
    {


       public bool CreateBoard(board projekat_u)
        {

            try
            {

                mydbEntities ent = new mydbEntities();

                board projekat = new board
                {
                       idBoard = 1,
                       title = "TO-DO",
                       boardOwner = 1,
                       creationDate = DateTime.Now
                };

                ent.board.Add(projekat);
                ent.SaveChanges();

                return true;
            }

            catch (Exception exc)
            {
                return false;
            }
            
        }


       public bool DeleteBoard(int idBoarda)
       {

           try
           {

               mydbEntities ent = new mydbEntities();

              

               board projekat = ent.board.Find(idBoarda);

               ent.board.Remove(projekat);

              
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

