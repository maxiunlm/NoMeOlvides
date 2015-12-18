using Domain.Business;
using Domain.DataModel;
using Domain.ViewModel;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Service
{
    public class ContactService
    {
        public ContactBusiness Business { get; set; }


        public ContactService()
        {
            Business = new ContactBusiness();
        }

        public virtual string SaveContact(ContactViewModel contactViewModel)
        {
            ContactDataModel contactDataModel = new ContactDataModel(contactViewModel);
            Business.SaveContact(contactDataModel);

            throw new NotImplementedException("Retornar ID"); // 
        }

        public virtual ContactViewModel GetContactByEmail(string email)
        {
            ContactDataModel contactDataModel = Business.GetContactByEmail(email);

            return new ContactViewModel(contactDataModel);
        }

        public virtual ContactViewModel GetContactById(string id)
        {
            ContactDataModel contactDataModel = Business.GetContactById(new ObjectId(id));

            return new ContactViewModel(contactDataModel);
        }

        public virtual void Delete(string id)
        {
            Business.Delete(new ObjectId(id));
        }

        public virtual IList<ContactViewModel> ListContacts(string id)
        {
            return Business.ListContacts(new ObjectId(id)).Select(o => new ContactViewModel(o)).ToList();
        }

        public virtual IList<ContactViewModel> Search(ContactViewModel contactViewModel)
        {
            ContactDataModel contactDataModel = new ContactDataModel(contactViewModel);

            IList<ContactDataModel> result = Business.Search(contactDataModel);

            return result.Select(o => new ContactViewModel(o)).ToList();
        }
    }
}
