//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Trollo
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    
    public partial class board
    {
        public board()
        {
            this.list = new HashSet<list>();
        }

        
        public int idBoard { get; set; }
        [AllowHtml]
        public string title { get; set; }
        public System.DateTime creationDate { get; set; }
        public int boardOwner { get; set; }
    
        public virtual user user { get; set; }
        public virtual ICollection<list> list { get; set; }
    }
}
