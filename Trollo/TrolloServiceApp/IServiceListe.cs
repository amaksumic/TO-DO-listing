using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IServiceListe" in both code and config file together.
    [ServiceContract]
    public interface IServiceListe
    {
        [OperationContract]
        bool CreateList(list Nlista);

        [OperationContract]
        bool DeleteList(int idListe);
    }

     [DataContract]
    public class List
    {
        public List()
        {
            this.task = new HashSet<task>();
        }

        public int idList { get; set; }
        public string title { get; set; }
        public int ownerBoard { get; set; }

        public virtual board board { get; set; }
        public virtual ICollection<task> task { get; set; }
    }
}
