using Domain.Data;
using Domain.DataModel;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.ViewModel;

namespace Domain.Business
{
    public class ContactBusiness
    {
        public ContactData Data { get; set; }


        public ContactBusiness()
        {
            Data = new ContactData();
        }

        public virtual ObjectId SaveContact(ContactDataModel contactDataModel)
        {
            ObjectId contactId = Data.SaveContact(contactDataModel);

            return contactId;
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

        public virtual IList<ContactDataModel> ListContacts(ObjectId id)
        {
            return Data.ListContacts(id);
        }

        public virtual IList<ContactDataModel> Search(ContactDataModel contactEmptyViewModel)
        {
            return Data.Search(contactEmptyViewModel);
        }
    }
}
