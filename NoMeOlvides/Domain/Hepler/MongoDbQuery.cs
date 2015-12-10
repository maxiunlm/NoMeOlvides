using Domain.DataModel;
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

        public virtual List<ContactDataModel> Search(ContactDataModel contactFilter, IQueryable<ContactDataModel> contactDataModelCollection)
        {
            List<ContactDataModel> contacts = contactDataModelCollection
                .Where(o => AccomplishAnyFilter(contactFilter, o)).ToList();

            return contacts;
        }

        private static bool AccomplishAnyFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return AccomplishAdressFilter(contactFilter, contact)
                || AccomplishAliasFilter(contactFilter, contact)
                || AccomplishCellphoneFilter(contactFilter, contact)
                || AccomplishEmailFilter(contactFilter, contact)
                || AccomplishNameFilter(contactFilter, contact)
                || AccomplishPhoneFilter(contactFilter, contact)
                || AccomplishSurnameFilter(contactFilter, contact);
        }

        private static bool AccomplishSurnameFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return (string.IsNullOrWhiteSpace(contactFilter.Surname) || contact.Surname.Contains(contactFilter.Surname));
        }

        private static bool AccomplishPhoneFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return (string.IsNullOrWhiteSpace(contactFilter.Phone) || contact.Phone.Contains(contactFilter.Phone));
        }

        private static bool AccomplishNameFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return (string.IsNullOrWhiteSpace(contactFilter.Name) || contact.Name.Contains(contactFilter.Name));
        }

        private static bool AccomplishEmailFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return (string.IsNullOrWhiteSpace(contactFilter.Email) || contact.Email.Contains(contactFilter.Email));
        }

        private static bool AccomplishCellphoneFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return (string.IsNullOrWhiteSpace(contactFilter.Cellphone) || contact.Cellphone.Contains(contactFilter.Cellphone));
        }

        private static bool AccomplishAliasFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return (string.IsNullOrWhiteSpace(contactFilter.Alias) || contact.Alias.Contains(contactFilter.Alias));
        }

        private static bool AccomplishAdressFilter(ContactDataModel contactFilter, ContactDataModel contact)
        {
            return (string.IsNullOrWhiteSpace(contactFilter.Address) || contact.Address.Contains(contactFilter.Address));
        }
    }
}
