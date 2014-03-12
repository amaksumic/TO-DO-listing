using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }

       public  bool CreateUser(string username, string password, DateTime date)
        {
            //using (SampleDbEntities entities = new SampleDbEntities())
            //{
            //    Book book = new Book { BookName = name };
            //    entities.Books.AddObject(book);
            //    entities.SaveChanges();
            //}
            return true;

        }


       public  bool RenameList(string newTitle, int listID, int userID) {
            return true; 
        }

       //public  bool CreateList(string title, int listOwner) {
       //     return true; 
       // }
    }
}
