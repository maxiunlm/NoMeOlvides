using Domain.DataModel;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Hepler;
using Domain.Resources;

namespace Domain.Data
{
    public class ContactData
    {
        public MongoClient MongoClient { get; set; }
        public MongoServer MongoServer { get; set; }
        public MongoDatabase MongoDatabase { get; set; }
        public MongoDbHelper MongoDbHelper { get; set; }
        public MongoDbQuery MongoDbQuery { get; set; }

        private MongoCollection<ContactDataModel> contactDataModelCollection;


        public ContactData ()
        {
            CreateConnectionToDataBase();
            MongoDbHelper = new MongoDbHelper();
            MongoDbQuery = new MongoDbQuery();
        }

        public void CreateConnectionToDataBase()
        {
            MongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["NoMeOlvides"].ConnectionString);
            MongoServer = MongoClient.GetServer();
            MongoDatabase = (MongoDatabase)MongoServer.GetDatabase(ConfigurationManager.ConnectionStrings["NoMeOlvides"].Name);
        }

        public virtual void SaveContact(ContactDataModel contactDataModel)
        {
            MongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();
            VerifyNonPreExistentContact(contactDataModel, contactDataModelCollection);

            if (IsNewContact(contactDataModel))
            {
                GenerateObjectId(contactDataModel);
            }

            contactDataModelCollection.Save(contactDataModel);
        }

        private MongoCollection<ContactDataModel> GetContactCollection()
        {
            MongoCollection<ContactDataModel> ContactDataModelCollection = MongoDatabase.GetCollection<ContactDataModel>("contact", new MongoCollectionSettings());

            return ContactDataModelCollection;
        }

        private void VerifyNonPreExistentContact(ContactDataModel contactDataModel, MongoCollection<ContactDataModel> contactDataModelCollection)
        {
            IQueryable<ContactDataModel> contactQueyrableCollection = MongoDbHelper.GetIQueryableFromMongoCollection<ContactDataModel>(contactDataModelCollection);
            ContactDataModel preExistentContact = MongoDbQuery.GetContactByEmail(contactDataModel.Email, contactQueyrableCollection);

            if (IsPreExistentContact(contactDataModel, preExistentContact))
            {
                throw new DevelopedControlledException(Locale.preExistentContact);
            }
        }

        private bool IsPreExistentContact(ContactDataModel contactDataModel, ContactDataModel preExistentContact)
        {
            return preExistentContact.Id != contactDataModel.Id && preExistentContact.Email == contactDataModel.Email;
        }

        private void GenerateObjectId(ContactDataModel contactDataModel)
        {
            contactDataModel.Id = MongoDbHelper.GenerateNewId();
        }

        private bool IsNewContact(ContactDataModel contactDataModel)
        {
            return contactDataModel.Id == ObjectId.Empty;
        }

        public virtual ContactDataModel GetContactByEmail(string email)
        {
            contactDataModelCollection = GetContactCollection();
            IQueryable<ContactDataModel> contactQueyrableCollection = MongoDbHelper.GetIQueryableFromMongoCollection<ContactDataModel>(contactDataModelCollection);
            ContactDataModel contact = MongoDbQuery.GetContactByEmail(email, contactQueyrableCollection);

            return contact;
        }

        public virtual ContactDataModel GetContactById(ObjectId id)
        {
            MongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();
            IQueryable<ContactDataModel> contactQueyrableCollection = MongoDbHelper.GetIQueryableFromMongoCollection<ContactDataModel>(contactDataModelCollection);
            ContactDataModel contact = MongoDbQuery.GetContactById(id, contactQueyrableCollection);

            return contact;
        }

        public virtual void Delete(ObjectId id)
        {
            MongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();

            contactDataModelCollection.Remove(new QueryDocument("_id", id));
        }

        public void DeleteByEmail(string email)
        {
            ContactDataModel contact = GetContactByEmail(email);

            contactDataModelCollection.Remove(new QueryDocument("_id", contact.Id));
        }

        public virtual List<ContactDataModel> ListContacts(ObjectId id)
        {
            MongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();
            IQueryable<ContactDataModel> contactQueyrableCollection = MongoDbHelper.GetIQueryableFromMongoCollection<ContactDataModel>(contactDataModelCollection);
            List<ContactDataModel> contacts = MongoDbQuery.ListContacts(id, contactQueyrableCollection);

            return contacts;
        }
    }
}
