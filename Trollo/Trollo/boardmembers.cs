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
    
    public partial class boardmembers
    {

        public boardmembers()
        {

        }
        public boardmembers(int _idkorisnik, int _idploca)
        {
            idkorisnik = _idkorisnik;
            idploca = _idploca;
        }

        public int idboardmembers { get; set; }
        public Nullable<int> idkorisnik { get; set; }
        public Nullable<int> idploca { get; set; }
    }
}
