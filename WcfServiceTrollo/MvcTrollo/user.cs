//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MvcTrollo
{
    using System;
    using System.Collections.Generic;
    
    public partial class user
    {
        public user()
        {
            this.board = new HashSet<board>();
            this.task = new HashSet<task>();
            this.board1 = new HashSet<board>();
            this.task1 = new HashSet<task>();
        }
    
        public int idUser { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public System.DateTime creationDate { get; set; }
        public string email { get; set; }
    
        public virtual ICollection<board> board { get; set; }
        public virtual ICollection<task> task { get; set; }
        public virtual ICollection<board> board1 { get; set; }
        public virtual ICollection<task> task1 { get; set; }
    }
}