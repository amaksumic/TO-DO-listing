using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IServiceTask" in both code and config file together.
    [ServiceContract]
    public interface IServiceTask
    {
        [OperationContract]
        bool CreateTask(task task1);

        [OperationContract]
        bool DeleteTask(int idListe);
    }

    [DataContract]
    public class Task
    {
        public Task()
        {
            this.user1 = new HashSet<user>();
        }

        public int idTask { get; set; }
        public string title { get; set; }
        public Nullable<System.DateTime> startTime { get; set; }
        public Nullable<System.DateTime> endTime { get; set; }
        public string comment { get; set; }
        public Nullable<int> label { get; set; }
        public byte[] file { get; set; }
        public int ownerList { get; set; }
        public int taskCreator { get; set; }

        public virtual list list { get; set; }
        public virtual user user { get; set; }
        public virtual ICollection<user> user1 { get; set; }
    }
}
