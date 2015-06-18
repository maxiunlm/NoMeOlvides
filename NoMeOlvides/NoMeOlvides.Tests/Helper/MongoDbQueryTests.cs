using Domain.Data;
using Domain.DataModel;
using Domain.Hepler;
using MongoDB.Bson;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.Helper
{
    [TestFixture]
    public class MongoDbQueryTests
    {
        private MongoDbQuery sut;

        #region Fixture

        private static readonly ObjectId contactObjectId = ObjectId.GenerateNewId();
        private readonly ObjectId emptyId = ObjectId.Empty;
        private const string email = "a@a.com";
        private const string invalidEmail = "aacom";
        private const string emptyEmail = "";
        private const string nullEmail = null;
        private static readonly ObjectId objectId = ObjectId.GenerateNewId();
        private static readonly ObjectId objectId2 = ObjectId.GenerateNewId();
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

        private readonly IList<ContactDataModel> contactsDataModelX2EmailDuplicated = new List<ContactDataModel>()
        {
            new ContactDataModel { Id = objectId, Name = "Name1", Email = "a@a.com" },
            new ContactDataModel { Id = objectId2, Name = "Name2", Email = "a@a.com" }
        };
        private readonly IQueryable<ContactDataModel> emptyQueryable = new List<ContactDataModel>().AsQueryable();
        private readonly DevelopedControlledException developedControlledException = new DevelopedControlledException(ConfigurationManager.AppSettings["DuplicatedEmailsBetweenContacts"]);
        private readonly List<ContactDataModel> contactsX0 = new List<ContactDataModel>();
        private readonly List<ContactDataModel> contactsX1 = new List<ContactDataModel> { 
            new ContactDataModel { Id = objectId, Contacts = new List<ObjectId> { contactObjectId } }
        };
        private readonly List<ContactDataModel> contactsX2 = new List<ContactDataModel> { 
            new ContactDataModel { Id = objectId, Contacts = new List<ObjectId> { contactObjectId } },
            new ContactDataModel { Id = objectId2, Contacts = new List<ObjectId> { contactObjectId } }
        };

        #endregion

        [SetUp]
        public void SetUp()
        {
            sut = new MongoDbQuery();
        }

        #region GetContactByEmail

        [Test]
        public void GetContactByEmail_ConEmailValidoEIqueyrableConUnElemento_RetornaElContactoDelEmail()
        {

            ContactDataModel result = sut.GetContactByEmail(email, contactsDataModelX1.AsQueryable());

            Assert.AreSame(contactsDataModelX1[0], result);
        }

        [Test]
        public void GetContactByEmail_ConEmailValidoEIqueyrableSinElementos_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(email, contactsDataModelX0.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [Test]
        public void GetContactByEmail_ConEmailValidoEIqueyrableConDosElementos_RetornaElContactoDelEmail()
        {

            ContactDataModel result = sut.GetContactByEmail(email, contactsDataModelX2.AsQueryable());

            Assert.AreSame(contactsDataModelX2[0], result);
        }

        [Test]
        public void GetContactByEmail_ConEmailInvalidoEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(invalidEmail, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [Test]
        public void GetContactByEmail_ConEmailVacioEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(emptyEmail, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [Test]
        public void GetContactByEmail_ConEmailNuloEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(nullEmail, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [Test]
        public void GetContactByEmail_ConEmailDeContactosExistentesConDistintoID_ArrojaExcepcionControlada()
        {

            Exception result = Assert.Catch(() => sut.GetContactByEmail(email, contactsDataModelX2EmailDuplicated.AsQueryable()));

            Assert.That(result, Is.InstanceOf<DevelopedControlledException>());
            Assert.AreEqual(developedControlledException.Message, result.Message);
        }

        #endregion

        #region GetContactById

        [Test]
        public void GetContactById_ConIdValidoEIqueyrableConUnElemento_RetornaElContactoDelId()
        {

            ContactDataModel result = sut.GetContactById(objectId, contactsDataModelX1.AsQueryable());

            Assert.AreSame(contactsDataModelX1[0], result);
        }

        [Test]
        public void GetContactById_ConIdValidoEIqueyrableSinElementos_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactById(objectId, contactsDataModelX0.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [Test]
        public void GetContactById_ConIdValidoEIqueyrableConDosElementos_RetornaElContactoDelId()
        {

            ContactDataModel result = sut.GetContactById(objectId, contactsDataModelX2.AsQueryable());

            Assert.AreSame(contactsDataModelX2[0], result);
        }

        [Test]
        public void GetContactById_ConIdVacioEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactById(emptyId, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        #endregion

        #region ListContacts

        [Test]
        public void ListContacts_ConContactIdVacio_RetornaListaVacia()
        {

            List<ContactDataModel> result = sut.ListContacts(emptyId, contactsX1.AsQueryable());

            Assert.IsEmpty(result);
        }

        [Test]
        public void ListContacts_ConContactIdValido_RetornaLaListaDeLosContactosDelUsuarioVacia()
        {

            List<ContactDataModel> result = sut.ListContacts(contactObjectId, contactsX0.AsQueryable());

            Assert.IsEmpty(result);
        }

        [Test]
        public void ListContacts_ConContactIdValido_RetornaLaListaDeLosContactosDelUsuarioConUnContacto()
        {

            List<ContactDataModel> result = sut.ListContacts(contactObjectId, contactsX1.AsQueryable());

            Assert.AreEqual(result.Count, contactsX1.Count);
            Assert.AreEqual(result[0].Id, contactsX1[0].Id);
        }

        [Test]
        public void ListContacts_ConContactIdValido_RetornaLaListaDeLosContactosDelUsuarioConDosContactos()
        {

            List<ContactDataModel> result = sut.ListContacts(contactObjectId, contactsX2.AsQueryable());

            Assert.AreEqual(result.Count, contactsX2.Count);
            Assert.AreEqual(result[0].Id, contactsX2[0].Id);
            Assert.AreEqual(result[1].Id, contactsX2[1].Id);
        }

        #endregion
    }
}
