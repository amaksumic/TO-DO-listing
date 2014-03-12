using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IServiceBoard" in both code and config file together.
    [ServiceContract]
    public interface IServiceBoard
    {
        [OperationContract]
        bool CreateBoard(board projekat_u);

        [OperationContract]
        bool DeleteBoard(int idBoarda);

    }

        [DataContract]
        public class Board
    {
        public Board()
        {
            this.list = new HashSet<list>();
            this.user1 = new HashSet<user>();
        }
    
        public int idBoard { get; set; }
        public string title { get; set; }
        public System.DateTime creationDate { get; set; }
        public int boardOwner { get; set; }
    
        public virtual user user { get; set; }
        public virtual ICollection<list> list { get; set; }
        public virtual ICollection<user> user1 { get; set; }
    }
}


