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
    
    public partial class list
    {
        public list()
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
