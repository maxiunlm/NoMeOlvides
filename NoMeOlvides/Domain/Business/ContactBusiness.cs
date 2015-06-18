using Domain.Data;
using Domain.DataModel;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Business
{
    public class ContactBusiness
    {
        public ContactData Data { get; set; }


        public ContactBusiness()
        {
            Data = new ContactData();
        }

        public virtual void SaveContact(ContactDataModel contactDataModel)
        {
            Data.SaveContact(contactDataModel);
        }

        public virtual ContactDataModel GetContactByEmail(string email)
        {
            return Data.GetContactByEmail(email);
        }

        public virtual ContactDataModel GetContactById(ObjectId id)
        {
            return Data.GetContactById(id);
        }

        public virtual void Delete(ObjectId id)
        {
            Data.Delete(id);
        }

        public virtual List<ContactDataModel> ListContacts(ObjectId id)
        {
            return Data.ListContacts(id);
        }
    }
}
