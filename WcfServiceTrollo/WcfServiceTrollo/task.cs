//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WcfServiceTrollo
{
    using System;
    using System.Collections.Generic;
    
    
    public class task
    {
        public task()
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
