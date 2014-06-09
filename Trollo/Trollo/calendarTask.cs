using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Trollo
{
    public class calendarTask
    {
        public calendarTask()
        {

        }
        public calendarTask(int _id, string _startDate, string _endDate, string _title)
        {
            id = _id;
            startDate= _startDate;
            endDate= _endDate;
            title = _title;
            
        }

        public int id { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string title { get; set; }

    }
}