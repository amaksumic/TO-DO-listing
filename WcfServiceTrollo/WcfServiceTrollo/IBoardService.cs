using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;


namespace WcfServiceTrollo
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IBoardService" in both code and config file together.
    [ServiceContract]
    public interface IBoardService
    {
        [OperationContract]
        void DoWork();
    }

    [DataContract]
    public  class Board
    {
        public Board()
        {
            this.list = new HashSet<list>();
            this.user1 = new HashSet<user>();
        }
        [DataMember]
        public int idBoard { get; set; }
        [DataMember]
        public string title { get; set; }
        [DataMember]
        public System.DateTime creationDate { get; set; }
        [DataMember]
        public int boardOwner { get; set; }
        [DataMember]
        public virtual user user { get; set; }
        [DataMember]
        public virtual ICollection<list> list { get; set; }
        [DataMember]
        public virtual ICollection<user> user1 { get; set; }
    }
}
