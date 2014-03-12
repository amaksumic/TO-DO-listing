using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService2" in both code and config file together.
    [ServiceContract]
    public interface IServiceUser
    {

        [OperationContract]
        bool CreateUser(User korisnik);

        [OperationContract]
        bool DeleteUser(int idUsera);




    }

    [DataContract]
    public class User
    {
        string username;
        string password;    
        DateTime time;

        [DataMember]
        public string Username
        {
            get { return username; }
            set { username = value; }
        }
       

        [DataMember]
        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        [DataMember]
        public DateTime Time
        {
            get { return time; }
            set { time = value; }
        }
    }
}
