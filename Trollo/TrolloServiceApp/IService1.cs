using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace TrolloServiceApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {

        //[OperationContract]
        //[WebInvoke]
        //bool CreateBoard(string title, int boardOwner);

        [OperationContract]
        bool CreateUser(string username, string password, DateTime date);

       
        
        //[OperationBehavior]
        //[WebInvoke(UriTemplate = "CreateList/{title}/{listOwner}")]
        //bool CreateList(string title, int listOwner);

        [OperationContract]
        bool RenameList(string newTitle, int listID, int userID);

        [OperationContract]
        [WebGet(UriTemplate = "GetData/{value}")]
        string GetData(int value);

        // TODO: Add your service operations here
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }

   
}
