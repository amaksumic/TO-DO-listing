using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceTrollo
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IListService" in both code and config file together.
    [ServiceContract]
    public interface IListService
    {
        [OperationContract]
        void DoWork();
    }

    [DataContract]
    public class List
    {
        public List()
        {
            this.task = new HashSet<task>();
        }
        [DataMember]
        public int idList { get; set; }
        [DataMember]
        public string title { get; set; }
        [DataMember]
        public int ownerBoard { get; set; }
        [DataMember]
        public virtual board board { get; set; }
        [DataMember]
        public virtual ICollection<task> task { get; set; }
    }
}
