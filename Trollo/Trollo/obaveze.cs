using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Trollo
{
    public class obaveze
    {
        public obaveze()
        {

        }
        public obaveze (string _task, string _list, string _board, int _id, int _label)
        {
            task = _task;
            list = _list;
            board = _board;
            id = _id;
            label = _label;
        }

        public int id {get; set;}
        public string task {get; set;}
        public string list {get; set;}
        public string board {get; set;}
        public int label { get; set; }
    }
}