using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceTrollo
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "ITaskService" in both code and config file together.
    [ServiceContract]
    public interface ITaskService
    {
        [OperationContract]
        bool CreateTask(task task1);

        //[OperationContract]
       // bool DeleteTask(int idListe);
    }

    [DataContract]
    public class Task
    {
        public Task()
        {
            this.user1 = new HashSet<user>();
        }
        [DataMember]
        public int idTask { get; set; }
        [DataMember]
        public string title { get; set; }
        [DataMember]
        public Nullable<System.DateTime> startTime { get; set; }
        [DataMember]
        public Nullable<System.DateTime> endTime { get; set; }
        [DataMember]
        public string comment { get; set; }
        [DataMember]
        public Nullable<int> label { get; set; }
        [DataMember]
        public byte[] file { get; set; }
        [DataMember]
        public int ownerList { get; set; }
        [DataMember]
        public int taskCreator { get; set; }
        [DataMember]
        public virtual list list { get; set; }
        [DataMember]
        public virtual user user { get; set; }
        [DataMember]
        public virtual ICollection<user> user1 { get; set; }
    }
}
