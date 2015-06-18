﻿using Domain.Business;
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

        public virtual void SaveContact(ContactViewModel contactViewModel)
        {
            ContactDataModel contactDataModel = new ContactDataModel(contactViewModel);
            Business.SaveContact(contactDataModel);
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

        public virtual List<ContactViewModel> ListContacts(string id)
        {
            return Business.ListContacts(new ObjectId(id)).Select(o => new ContactViewModel(o)).ToList();
        }
    }
}
