using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ServiceListe" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ServiceListe.svc or ServiceListe.svc.cs at the Solution Explorer and start debugging.
    public class ServiceListe : IServiceListe
    {
        public bool CreateList(list Nlista)
        {

            try
            {

                mydbEntities ent = new mydbEntities();

                list lista = new list
                {
                    idList = 1,
                    title = "NovaLista",
                    ownerBoard = 1,
                   
                };

                ent.list.Add(lista);
                ent.SaveChanges();

                return true;
            }

            catch (Exception exc)
            {
                return false;
            }

        }


        public bool DeleteList(int idListe)
        {

            try
            {

                mydbEntities ent = new mydbEntities();



                list lista = ent.list.Find(idListe);

                ent.list.Remove(lista);


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

