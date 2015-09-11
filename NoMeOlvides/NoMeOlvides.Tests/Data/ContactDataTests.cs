﻿using Domain.Data;
using Domain.DataModel;
using Domain.Hepler;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Resources;

namespace NoMeOlvides.Tests.Data
{
    [TestFixture]
    public class ContactDataTests
    {
        private ContactData sut;
        private Mock<MongoDbHelper> mongoDbHelperMocker;
        private Mock<MongoDbQuery> mongoDbQueryMocker;
        private Mock<MongoClient> mocker;
        private Mock<MongoDatabase> mongoDatabaseMocker;
        private Mock<MongoCollection<ContactDataModel>> contactsDataModelX0Mocker;
        private Mock<MongoCollection<ContactDataModel>> contactsDataModelX1Mocker;
        private Mock<MongoCollection<ContactDataModel>> contactsDataModelX2Mocker;

        #region Fixture

        private static readonly ObjectId contactObjectId = ObjectId.GenerateNewId();
        private readonly ObjectId validId = ObjectId.GenerateNewId();
        private readonly ObjectId emptyId = ObjectId.Empty;
        private const string contactTabelName = "contact";
        private readonly string dataBaseName = ConfigurationManager.ConnectionStrings["NoMeOlvides"].Name;
        private const string validEmail = "a@a.com";
        private const string invalidEmail = "aacom";
        private const string emptyEmail = "";
        private const string nullEmail = null;
        private readonly ContactDataModel contactEmptyDataModel = new ContactDataModel();
        private readonly DevelopedControlledException developedControlledException = new DevelopedControlledException(Locale.preExistentContact);
        private static readonly ObjectId objectId = ObjectId.GenerateNewId();
        private static readonly ObjectId objectId2 = ObjectId.GenerateNewId();
        private readonly ContactDataModel contactDataModel = new ContactDataModel { Id = ObjectId.GenerateNewId(), Email = "b@b.com", Password = "123456" };
        private readonly ContactDataModel newContactDataModel = new ContactDataModel { Email = "b@b.com", Password = "123456" };
        private readonly ContactDataModel newContactDataModel2 = new ContactDataModel { Email = "b@b.com", Password = "123456" };
        private readonly ContactDataModel newContactDataModel3 = new ContactDataModel { Email = "b@b.com", Password = "123456" };
        private readonly ContactDataModel preExistentContactDataModel = new ContactDataModel { Email = "a@a.com", Password = "123456" };
        private readonly ContactDataModel existentContactDataModel = new ContactDataModel { Id = ObjectId.GenerateNewId(), Email = "a@a.com", Password = "123456" };
        private readonly ContactDataModel contactDataModel1 = new ContactDataModel { Id = objectId, Name = "Name1" };
        private readonly ContactDataModel contactDataModel2 = new ContactDataModel { Id = objectId2, Name = "Name2" };
        private readonly IList<ContactDataModel> contactsDataModelX0 = new List<ContactDataModel>();
        private readonly IList<ContactDataModel> contactsDataModelX1 = new List<ContactDataModel>()
        {
            new ContactDataModel { Id = objectId, Name = "Name1", Email = "a@a.com" }
        };
        private readonly IList<ContactDataModel> contactsDataModelX2 = new List<ContactDataModel>()
        {
            new ContactDataModel { Id = objectId, Name = "Name1", Email = "a@a.com" },
            new ContactDataModel { Id = objectId2, Name = "Name2", Email = "b@b.com" }
        };
        private readonly IQueryable<ContactDataModel> emptyQueryable = new List<ContactDataModel>().AsQueryable();
        private readonly List<ContactDataModel> contactsX0 = new List<ContactDataModel>();
        private readonly List<ContactDataModel> contactsX1 = new List<ContactDataModel> { new ContactDataModel { Id = contactObjectId } };
        private readonly List<ContactDataModel> contactsX2 = new List<ContactDataModel> { 
            new ContactDataModel { Id = contactObjectId },
            new ContactDataModel { Id = ObjectId.GenerateNewId() }
        };

        #endregion

        #region SetUp

        [SetUp]
        public void SetUp()
        {
            mocker = new Mock<MongoClient>();
            mongoDatabaseMocker = GetMockedMongoDb();
            mongoDbHelperMocker = new Mock<MongoDbHelper>();
            mongoDbQueryMocker = new Mock<MongoDbQuery>();
            contactsDataModelX0Mocker = CreateMockCollection<ContactDataModel>((MongoDatabase)mongoDatabaseMocker.Object, "contact");
            contactsDataModelX2Mocker = CreateMockCollection<ContactDataModel>((MongoDatabase)mongoDatabaseMocker.Object, "contact");
            contactsDataModelX1Mocker = CreateMockCollection<ContactDataModel>((MongoDatabase)mongoDatabaseMocker.Object, "contact");
            sut = new ContactData();

            sut.MongoClient = mocker.Object;
            sut.MongoDatabase = mongoDatabaseMocker.Object;
            sut.MongoDbHelper = mongoDbHelperMocker.Object;
            sut.MongoDbQuery = mongoDbQueryMocker.Object;

            //ContactsDataModelX1Mocker.Object.Insert(contactDataModel1);
            //ContactsDataModelX2Mocker.Object.Insert(contactDataModel1);
            //ContactsDataModelX2Mocker.Object.Insert(contactDataModel2);
        }

        public MongoServer GetMockedMongoDbServer()
        {
            var serverSettings = new MongoServerSettings
            {
                Servers = new List<MongoServerAddress>
                    {
                        new MongoServerAddress("unittest")
                    }
            };
            var server = new MongoServer(serverSettings);
            return server;
        }

        private Mock<MongoDatabase> GetMockedMongoDb()
        {
            var databaseSettings = new MongoDatabaseSettings()
            {
                GuidRepresentation = GuidRepresentation.Standard,
                ReadEncoding = new UTF8Encoding(),
                ReadPreference = new ReadPreference(ReadPreferenceMode.Primary),
                WriteConcern = new WriteConcern(),
                WriteEncoding = new UTF8Encoding()
            };

            var database = new Mock<MongoDatabase>(GetMockedMongoDbServer(), dataBaseName, databaseSettings);

            var message = String.Empty;

            //need to mock the following stuff
            database.Setup(x => x.Name).Returns(dataBaseName);
            database.Setup(db => db.Settings).Returns(databaseSettings);
            database.Setup(db => db.IsCollectionNameValid(It.IsAny<string>(), out message)).Returns(true);

            return database;
        }

        private Mock<MongoCollection<T>> CreateMockCollection<T>(MongoDatabase database, string name)
        {
            var collectionSetting = new MongoCollectionSettings();
            var m = new Mock<MongoCollection<T>>(database, name, collectionSetting);
            m.Setup(x => x.Database).Returns(database);
            m.Setup(x => x.Settings).Returns(collectionSetting);

            return m;
        }

        #endregion

        #region CONSTRUCTOR

        [Test]
        public void ContactData_SinParametros_CreaInstanciaLosObjetoNesesariosParaTrabajar()
        {
            sut = new ContactData();

            Assert.IsNotNull(sut.MongoClient);
            Assert.IsNotNull(sut.MongoServer);
            Assert.IsNotNull(sut.MongoDatabase);
            Assert.IsNotNull(sut.MongoDbHelper);
            Assert.IsNotNull(sut.MongoDbQuery);
        }

        //[Test]
        //public void ContactData_SinParametros_InvocaMetodoDeMongoDbQueObtieneElServerDeLaBd()
        //{
        //    mocker.Setup(o => o.GetDatabase(It.IsAny<string>(), It.IsAny<MongoDatabaseSettings>()));

        //    new ContactData(); /// IMPOSIBLE ???!!!

        //    mocker.Verify(o => o.GetDatabase(It.IsAny<string>(), It.IsAny<MongoDatabaseSettings>()));
        //}

        #endregion

        #region SaveContact

        [Test]
        public void SaveContact_ConDatosDeContacto_InvocaMetodoDeMongoDbQueObtieneLaCollectionDeLaBd()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            contactsDataModelX1Mocker.Setup(o => o.Save(newContactDataModel));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactEmptyDataModel);

            sut.SaveContact(newContactDataModel);

            mongoDatabaseMocker.Verify(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>()));//, It.IsAny<MongoCollectionSettings>()
        }

        [Test]
        public void SaveContact_ConDatosDeContacto_InvocaMetodoDeMongoDbHelperQueGeneraElObjectId()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            contactsDataModelX1Mocker.Setup(o => o.Save(newContactDataModel));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactEmptyDataModel);

            sut.SaveContact(newContactDataModel);

            mongoDbHelperMocker.Verify(o => o.GenerateNewId());
        }

        [Test]
        public void SaveContact_ConDatosDeContacto_InvocaMetodoDeMongoDbQueGeneraCreaElContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            contactsDataModelX1Mocker.Setup(o => o.Save(newContactDataModel));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactEmptyDataModel);

            sut.SaveContact(newContactDataModel);

            contactsDataModelX1Mocker.Verify(o => o.Save(newContactDataModel));
        }

        [Test]
        public void SaveContact_ConDatosDeContactoExistente_InvocaMetodoDeMongoDbQueGuardaModificacionElContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            contactsDataModelX1Mocker.Setup(o => o.Save(contactDataModel));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactEmptyDataModel);

            sut.SaveContact(contactDataModel);

            contactsDataModelX1Mocker.Verify(o => o.Save(contactDataModel));
        }

        [Test]
        public void SaveContact_ConDatosDeContactoNuevoYConEmailValido_InvocaMetodoDeMongoDbQueObtieneAlContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            contactsDataModelX1Mocker.Setup(o => o.Save(newContactDataModel3));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactEmptyDataModel);

            sut.SaveContact(newContactDataModel3);

            mongoDbQueryMocker.Verify(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>()));
        }

        [Test]
        public void SaveContact_ConDatosDeContacto_NoInvocaMetodoDeMongoDbHelperQueCreaElIQueyrable()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            contactsDataModelX1Mocker.Setup(o => o.Save(newContactDataModel2));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactEmptyDataModel);

            sut.SaveContact(newContactDataModel2);

            mongoDbHelperMocker.Verify(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>()));
        }

        [Test]
        public void SaveContact_ConDatosDeContactoExistente_NoInvocaMetodoDeMongoDbHelperQueCreaElIdDelObjeto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            contactsDataModelX1Mocker.Setup(o => o.Save(contactDataModel));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactEmptyDataModel);

            sut.SaveContact(contactDataModel);

            mongoDbHelperMocker.Verify(o => o.GenerateNewId(), Times.Never);
        }

        [Test]
        public void SaveContact_ConDatosDeContactoExistenteConDistintoID_ArrojaExcepcionControlada()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GenerateNewId()).Returns(objectId);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            contactsDataModelX1Mocker.Setup(o => o.Save(preExistentContactDataModel));
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(It.IsAny<string>(), It.IsAny<IQueryable<ContactDataModel>>())).Returns(existentContactDataModel);

            Exception result = Assert.Catch(() => sut.SaveContact(preExistentContactDataModel));

            Assert.That(result, Is.InstanceOf<DevelopedControlledException>());
            Assert.AreEqual(developedControlledException.Message, result.Message);
        }

        #endregion

        #region GetContactByEmail

        [Test]
        public void GetContactByEmail_ConEmailValido_InvocaMetodoDeMongoDbQueObtieneLaCollectionDeLaBd()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            sut.GetContactByEmail(validEmail);

            mongoDatabaseMocker.Verify(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>()));//, It.IsAny<MongoCollectionSettings>()
        }

        [Test]
        public void GetContactByEmail_ConEmailValido_InvocaMetodoDeMongoDbHelperQueCreaElIQueyrable()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            sut.GetContactByEmail(validEmail);

            mongoDbHelperMocker.Verify(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>()));
        }

        [Test]
        public void GetContactByEmail_ConEmailValido_InvocaMetodoDeMongoDbQueObtieneAlContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            sut.GetContactByEmail(validEmail);

            mongoDbQueryMocker.Verify(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>()));
        }

        [Test]
        public void GetContactByEmail_ConEmailValido_RetornaContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            ContactDataModel result = sut.GetContactByEmail(validEmail);

            Assert.AreEqual(result.Id, contactDataModel.Id);
            Assert.AreEqual(result.Email, contactDataModel.Email);
        }

        // DUPLICADO: GetContactByEmail_ConEmailValido_InvocaMetodoDeMongoDbQueObtieneAlContacto
        //[Test]
        //public void GetContactByEmail_ConEmailValido_InvocaMetodoDeMongoDbQueryQueRetornaElContacto()
        //{
        //    mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
        //    mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
        //    mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

        //    sut.GetContactByEmail(validEmail);

        //    mongoDbQueryMocker.Verify(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>()));
        //}

        // Trasladados al helper de querys !!!!!!!!!!!!!!!
        //[Test]
        //public void GetContactByEmail_ConEmailInvalido_RetornaContactoVacio()
        //{
        //    mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
        //    mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
        //    mongoDbQueryMocker.Setup(o => o.GetContactByEmail(invalidEmail, It.IsAny<IQueryable<ContactDataModel>>()));

        //    ContactDataModel result = sut.GetContactByEmail(invalidEmail);

        //    Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
        //    Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        //}

        //[Test]
        //public void GetContactByEmail_ConEmailInexistente_RetornaContactoVacio()
        //{
        //    mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
        //    mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
        //    mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>()));

        //    ContactDataModel result = sut.GetContactByEmail(validEmail);

        //    Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
        //    Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        //}

        //[Test]
        //public void GetContactByEmail_ConEmailNulo_RetornaContactoVacio()
        //{
        //    mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
        //    mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
        //    mongoDbQueryMocker.Setup(o => o.GetContactByEmail(nullEmail, It.IsAny<IQueryable<ContactDataModel>>()));

        //    ContactDataModel result = sut.GetContactByEmail(nullEmail);

        //    Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
        //    Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        //}

        //[Test]
        //public void GetContactByEmail_ConEmailVacio_RetornaContactoVacio()
        //{
        //    mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
        //    mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
        //    mongoDbQueryMocker.Setup(o => o.GetContactByEmail(emptyEmail, It.IsAny<IQueryable<ContactDataModel>>()));

        //    ContactDataModel result = sut.GetContactByEmail(emptyEmail);

        //    Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
        //    Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        //}

        #endregion

        #region GetContactById

        [Test]
        public void GetContactById_ConIdValido_InvocaMetodoDeMongoDbQueObtieneLaCollectionDeLaBd()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactById(validId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            sut.GetContactById(validId);

            mongoDatabaseMocker.Verify(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>()));//, It.IsAny<MongoCollectionSettings>()
        }

        [Test]
        public void GetContactById_ConIdValido_InvocaMetodoDeMongoDbQueObtieneAlContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactById(validId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            sut.GetContactById(validId);

            mongoDbQueryMocker.Verify(o => o.GetContactById(validId, It.IsAny<IQueryable<ContactDataModel>>()));
        }

        [Test]
        public void GetContactById_ConIdValido_InvocaMetodoDeMongoDbHelperQueCreaElIQueyrable()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactById(validId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            sut.GetContactById(validId);

            mongoDbHelperMocker.Verify(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>()));
        }

        [Test]
        public void GetContactById_ConIdValido_RetornaContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactById(validId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);

            ContactDataModel result = sut.GetContactById(validId);

            Assert.AreEqual(result.Id, contactDataModel.Id);
            Assert.AreEqual(result.Id, contactDataModel.Id);
        }

        #endregion

        #region Delete

        [Test]
        public void Delete_ConIdValido_InvocaMetodoDeMongoDbQueObtieneLaCollectionDeLaBd()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            contactsDataModelX1Mocker.Setup(o=>o.Remove(It.IsAny<IMongoQuery>()));

            sut.Delete(validId);

            mongoDatabaseMocker.Verify(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>()));//, It.IsAny<MongoCollectionSettings>()
        }

        [Test]
        public void Delete_ConIdValido_InvocaMetodoDeMongoDbQueEliminaAlContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            contactsDataModelX1Mocker.Setup(o => o.Remove(It.IsAny<IMongoQuery>()));

            sut.Delete(validId);

            contactsDataModelX1Mocker.Verify(o => o.Remove(It.IsAny<IMongoQuery>()));
        }

        #endregion

        #region DeleteByEmail

        [Test]
        public void DeleteByEmail_ConEmailValido_InvocaMetodoDeMongoDbQueObtieneLaCollectionDeLaBd()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);
            contactsDataModelX1Mocker.Setup(o => o.Remove(It.IsAny<IMongoQuery>()));

            sut.DeleteByEmail(validEmail);

            mongoDatabaseMocker.Verify(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>()));//, It.IsAny<MongoCollectionSettings>()
        }

        [Test]
        public void DeleteByEmail_ConEmailValido_InvocaMetodoDeMongoDbHelperQueCreaElIQueyrable()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);
            contactsDataModelX1Mocker.Setup(o => o.Remove(It.IsAny<IMongoQuery>()));

            sut.DeleteByEmail(validEmail);

            mongoDbHelperMocker.Verify(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>()));
        }

        [Test]
        public void DeleteByEmail_ConEmailValido_InvocaMetodoDeMongoDbQueObtieneAlContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);
            contactsDataModelX1Mocker.Setup(o => o.Remove(It.IsAny<IMongoQuery>()));

            sut.DeleteByEmail(validEmail);

            mongoDbQueryMocker.Verify(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>()));
        }

        [Test]
        public void DeleteByEmail_ConEmailValido_InvocaMetodoDeMongoDbQueEliminaAlContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.GetContactByEmail(validEmail, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactDataModel);
            contactsDataModelX1Mocker.Setup(o => o.Remove(It.IsAny<IMongoQuery>()));

            sut.DeleteByEmail(validEmail);

            contactsDataModelX1Mocker.Verify(o => o.Remove(It.IsAny<IMongoQuery>()));
        }

        #endregion

        #region ListContacts

        [Test]
        public void ListContacts_ConContactId_InvocaMetodoDeMongoDbQueObtieneLaCollectionDeLaBd()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.ListContacts(contactObjectId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactsX1);

            sut.ListContacts(contactObjectId);

            mongoDatabaseMocker.Verify(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>()));//, It.IsAny<MongoCollectionSettings>()
        }

        [Test]
        public void ListContacts_ConContactId_InvocaMetodoDeMongoDbHelperQueCreaElIQueyrable()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.ListContacts(contactObjectId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactsX1);

            sut.ListContacts(contactObjectId);

            mongoDbHelperMocker.Verify(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>()));
        }

        [Test]
        public void ListContacts_ConContactId_InvocaMetodoDeMongoDbQueObtieneLosContactos()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.ListContacts(contactObjectId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactsX1);

            sut.ListContacts(contactObjectId);

            mongoDbQueryMocker.Verify(o => o.ListContacts(contactObjectId, It.IsAny<IQueryable<ContactDataModel>>()));
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioVacia()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.ListContacts(contactObjectId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactsX0);

            List<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.IsEmpty(result);
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConUnContacto()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.ListContacts(contactObjectId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactsX1);

            List<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.AreEqual(result.Count, contactsX1.Count);
            Assert.AreEqual(result[0].Id, contactsX1[0].Id);
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConDosContactos()
        {
            mongoDatabaseMocker.Setup(o => o.GetCollection<ContactDataModel>(contactTabelName, It.IsAny<MongoCollectionSettings>())).Returns((MongoCollection<ContactDataModel>)contactsDataModelX1Mocker.Object);
            mongoDbHelperMocker.Setup(o => o.GetIQueryableFromMongoCollection<ContactDataModel>(It.IsAny<MongoCollection<ContactDataModel>>())).Returns(contactsDataModelX1.AsQueryable());
            mongoDbQueryMocker.Setup(o => o.ListContacts(contactObjectId, It.IsAny<IQueryable<ContactDataModel>>())).Returns(contactsX2);

            List<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.AreEqual(result.Count, contactsX2.Count);
            Assert.AreEqual(result[0].Id, contactsX2[0].Id);
            Assert.AreEqual(result[1].Id, contactsX2[1].Id);
        }

        #endregion
    }
}
