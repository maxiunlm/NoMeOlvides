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
        //public MongoServer MongoServer { get; set; }
        public IMongoDatabase MongoDatabase { get; set; }
        public MongoDbHelper MongoDbHelper { get; set; }
        public MongoDbQuery MongoDbQuery { get; set; }

        private IMongoCollection<ContactDataModel> contactDataModelCollection;


        public ContactData()
        {
            CreateConnectionToDataBase();
            MongoDbHelper = new MongoDbHelper();
            MongoDbQuery = new MongoDbQuery();
        }

        // TODO: TDD ???!!!!
        public void CreateConnectionToDataBase()
        {
            MongoClient = new MongoClient(ConfigurationManager.ConnectionStrings["NoMeOlvides"].ConnectionString);
            //MongoServer = MongoClient.GetServer();
            MongoDatabase = MongoClient.GetDatabase(ConfigurationManager.ConnectionStrings["NoMeOlvides"].Name);
        }

        public virtual ObjectId SaveContact(ContactDataModel contactDataModel)
        {
            IMongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();
            VerifyNonPreExistentContact(contactDataModel, contactDataModelCollection);

            if (IsNewContact(contactDataModel))
            {
                GenerateObjectId(contactDataModel);
            }

            // TDD ??? !!! 
            UpdateOptions options = new UpdateOptions { IsUpsert = true };
            contactDataModelCollection.ReplaceOne(o => o.Id == contactDataModel.Id, contactDataModel, options);// TDD !!! 

            return contactDataModel.Id;
        }

        private IMongoCollection<ContactDataModel> GetContactCollection()
        {
            IMongoCollection<ContactDataModel> ContactDataModelCollection = MongoDatabase.GetCollection<ContactDataModel>("contact", new MongoCollectionSettings());

            return ContactDataModelCollection;
        }

        private void VerifyNonPreExistentContact(ContactDataModel contactDataModel, IMongoCollection<ContactDataModel> contactDataModelCollection)
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
            IMongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();
            IQueryable<ContactDataModel> contactQueyrableCollection = MongoDbHelper.GetIQueryableFromMongoCollection<ContactDataModel>(contactDataModelCollection);
            ContactDataModel contact = MongoDbQuery.GetContactById(id, contactQueyrableCollection);

            return contact;
        }

        public virtual void Delete(ObjectId id)
        {
            IMongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();

            contactDataModelCollection.DeleteOne(new QueryDocument("_id", id));
        }

        public void DeleteByEmail(string email)
        {
            ContactDataModel contact = GetContactByEmail(email);

            contactDataModelCollection.DeleteOne(new QueryDocument("_id", contact.Id));
        }

        public virtual List<ContactDataModel> ListContacts(ObjectId id)
        {
            IMongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();
            IQueryable<ContactDataModel> contactQueyrableCollection = MongoDbHelper.GetIQueryableFromMongoCollection<ContactDataModel>(contactDataModelCollection);
            List<ContactDataModel> contacts = MongoDbQuery.ListContacts(id, contactQueyrableCollection);

            return contacts;
        }

        public virtual List<ContactDataModel> Search(ContactDataModel contactEmptyDataModel)
        {
            IMongoCollection<ContactDataModel> contactDataModelCollection = GetContactCollection();
            IQueryable<ContactDataModel> contactQueyrableCollection = MongoDbHelper.GetIQueryableFromMongoCollection<ContactDataModel>(contactDataModelCollection);
            List<ContactDataModel> contacts = MongoDbQuery.Search(contactEmptyDataModel, contactQueyrableCollection);

            return contacts;
        }
    }
}
