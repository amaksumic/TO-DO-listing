using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfServiceTrollo
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "TaskService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select TaskService.svc or TaskService.svc.cs at the Solution Explorer and start debugging.
    public class TaskService : ITaskService
    {
        public bool CreateTask(task task1)
        {

            try
            {

                mydbEntities ent = new mydbEntities();

                task task = new task
                {
                    idTask = 1,
                    title = "Lala",
                    startTime = DateTime.Now,
                    endTime = DateTime.Now,
                    comment = "We love u",
                    label = 2,
                    ownerList = 1,
                    taskCreator = 1
                };

                ent.task.Add(task);
                ent.SaveChanges();

                return true;
            }

            catch (Exception exc)
            {
                return false;
            }
        }
    }
}

