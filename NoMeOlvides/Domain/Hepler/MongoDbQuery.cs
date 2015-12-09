﻿using Domain.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using MongoDB.Bson;
using Domain.Resources;

namespace Domain.Hepler
{
    public class MongoDbQuery
    {
        public virtual ContactDataModel GetContactByEmail(string email, IQueryable<ContactDataModel> contactDataModelCollection)
        {
            try
            {
                ContactDataModel contact = contactDataModelCollection.SingleOrDefault<ContactDataModel>(o => o.Email == email);
                
                if (contact == null)
                {
                    contact = new ContactDataModel();
                }

                return contact;
            }
            catch (InvalidOperationException)
            {
                throw new DevelopedControlledException(Locale.duplicatedEmailsBetweenContacts);
            }
        }

        public virtual ContactDataModel GetContactById(ObjectId id, IQueryable<ContactDataModel> contactDataModelCollection)
        {
            ContactDataModel contact = contactDataModelCollection.SingleOrDefault<ContactDataModel>(o => o.Id == id);

            if (contact == null)
            {
                contact = new ContactDataModel();
            }

            return contact;
        }

        public virtual List<ContactDataModel> ListContacts(ObjectId id, IQueryable<ContactDataModel> contactDataModelCollection)
        {
            List<ContactDataModel> contacts = contactDataModelCollection.Where(o => o.Contacts.Contains(id)).ToList<ContactDataModel>();

            return contacts;
        }

        public virtual List<ContactDataModel> Search(ContactDataModel contactEmptyDataModel, IQueryable<ContactDataModel> queryable)
        {
            throw new NotImplementedException();
        }
    }
}
