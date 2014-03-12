using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ServiceTask" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ServiceTask.svc or ServiceTask.svc.cs at the Solution Explorer and start debugging.
    public class ServiceTask : IServiceTask
    {
        public bool CreateTask(task task1)
        {

            try
            {

                mydbEntities ent = new mydbEntities();

                task task = new task
                {
                    idTask=1,
                    title="Lala",
                    startTime= DateTime.Now,
                    endTime=DateTime.Now,
                    comment="We love u",
                    label=2,
                    ownerList=1,
                    taskCreator=1
                };

                ent.task.Add ( task );
                ent.SaveChanges();

                return true;
            }

            catch (Exception exc)
            {
                return false;
            }

        }

        public bool DeleteTask(int idTask)
        {

            try
            {

                mydbEntities ent = new mydbEntities();



                task task = ent.task.Find(idTask);

                ent.task.Remove(task);


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
