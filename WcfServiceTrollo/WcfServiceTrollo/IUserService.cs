using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceTrollo
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IUserService" in both code and config file together.
    [ServiceContract]
    public interface IUserService
    {
        [OperationContract]
        User GetUser(int id);
    }

    [DataContract]
    public  class User
    {
        public User()
        {
            this.board = new HashSet<board>();
            this.task = new HashSet<task>();
            this.board1 = new HashSet<board>();
            this.task1 = new HashSet<task>();
        }
        [DataMember]
        public int idUser { get; set; }
        [DataMember]
        public string username { get; set; }
        [DataMember]
        public string password { get; set; }
        [DataMember]
        public System.DateTime creationDate { get; set; }
        [DataMember]
        public string email { get; set; }
        [DataMember]
        public virtual ICollection<board> board { get; set; }
        [DataMember]
        public virtual ICollection<task> task { get; set; }
        [DataMember]
        public virtual ICollection<board> board1 { get; set; }
        [DataMember]
        public virtual ICollection<task> task1 { get; set; }
    }
}
