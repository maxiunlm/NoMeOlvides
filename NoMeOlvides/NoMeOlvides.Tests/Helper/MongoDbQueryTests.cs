using Domain.Data;
using Domain.DataModel;
using Domain.Hepler;
using MongoDB.Bson;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Resources;

namespace NoMeOlvides.Tests.Helper
{
    [TestClass]
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
        private readonly DevelopedControlledException developedControlledException = new DevelopedControlledException(Locale.duplicatedEmailsBetweenContacts);
        private readonly List<ContactDataModel> contactsX0 = new List<ContactDataModel>();
        private readonly List<ContactDataModel> contactsX1 = new List<ContactDataModel> {
            new ContactDataModel { Id = objectId,
                Address = "Address1",
                Cellphone = "1234",
                Alias = "Alias1",
                Email = "a@a.com",
                Name = "Name1",
                Phone = "Phone1",
                Surname = "Surname1",
                Contacts = new List<ObjectId> { contactObjectId }
            }
        };
        private readonly List<ContactDataModel> contactsX2 = new List<ContactDataModel> {
            new ContactDataModel { Id = objectId,
                Address = "Address1",
                Cellphone = "12346",
                Alias = "Alias1",
                Email = "a@a.com",
                Name = "Name1",
                Phone = "Phone1",
                Surname = "Surname1",
                Contacts = new List<ObjectId> { contactObjectId }
            },
            new ContactDataModel { Id = objectId2,
                Address = "Address2",
                Cellphone = "12345",
                Alias = "Alias2",
                Email = "b@b.com",
                Name = "Name2",
                Phone = "Phone3",
                Surname = "Surname4",
                Contacts = new List<ObjectId> { contactObjectId }
            }
        };
        private readonly ContactDataModel contactEmptyDataModel = new ContactDataModel();
        private readonly ContactDataModel fullFiltersContactDataModelX0 = new ContactDataModel
        {
            Address = "Nada",
            Cellphone = "00000",
            Alias = "Nada",
            Email = "Nada.com",
            Name = "Nada",
            Phone = "Nada",
            Surname = "Nada"
        };
        private readonly ContactDataModel fullFiltersContactDataModelX1 = new ContactDataModel
        {
            Address = "Address1",
            Cellphone = "12346",
            Alias = "Alias1",
            Email = "a@a.com",
            Name = "Name1",
            Phone = "Phone1",
            Surname = "Surname1"
        };
        private readonly ContactDataModel fullFiltersContactDataModelX2 = new ContactDataModel
        {
            Address = "Address",
            Cellphone = "1234",
            Alias = "Alias",
            Email = ".com",
            Name = "Name",
            Phone = "Phone",
            Surname = "Surname"
        };

        #endregion

        [TestInitialize]
        public void SetUp()
        {
            sut = new MongoDbQuery();
        }

        #region GetContactByEmail

        [TestMethod]
        public void GetContactByEmail_ConEmailValidoEIqueyrableConUnElemento_RetornaElContactoDelEmail()
        {

            ContactDataModel result = sut.GetContactByEmail(email, contactsDataModelX1.AsQueryable());

            Assert.AreSame(contactsDataModelX1[0], result);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailValidoEIqueyrableSinElementos_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(email, contactsDataModelX0.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailValidoEIqueyrableConDosElementos_RetornaElContactoDelEmail()
        {

            ContactDataModel result = sut.GetContactByEmail(email, contactsDataModelX2.AsQueryable());

            Assert.AreSame(contactsDataModelX2[0], result);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailInvalidoEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(invalidEmail, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailVacioEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(emptyEmail, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailNuloEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactByEmail(nullEmail, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailDeContactosExistentesConDistintoID_ArrojaExcepcionControlada()
        {

            //////Exception result = Assert.Catch(() => sut.GetContactByEmail(email, contactsDataModelX2EmailDuplicated.AsQueryable()));
            // N U N I T
            //////Assert.That(result, Is.InstanceOf<DevelopedControlledException>());
            //////Assert.AreEqual(developedControlledException.Message, result.Message);
            try
            {
                sut.GetContactByEmail(email, contactsDataModelX2EmailDuplicated.AsQueryable());
            }
            catch (Exception result)
            {
                Assert.IsInstanceOfType(result, typeof(DevelopedControlledException));
                Assert.AreEqual(developedControlledException.Message, result.Message);
            }
        }

        #endregion

        #region GetContactById

        [TestMethod]
        public void GetContactById_ConIdValidoEIqueyrableConUnElemento_RetornaElContactoDelId()
        {

            ContactDataModel result = sut.GetContactById(objectId, contactsDataModelX1.AsQueryable());

            Assert.AreSame(contactsDataModelX1[0], result);
        }

        [TestMethod]
        public void GetContactById_ConIdValidoEIqueyrableSinElementos_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactById(objectId, contactsDataModelX0.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        [TestMethod]
        public void GetContactById_ConIdValidoEIqueyrableConDosElementos_RetornaElContactoDelId()
        {

            ContactDataModel result = sut.GetContactById(objectId, contactsDataModelX2.AsQueryable());

            Assert.AreSame(contactsDataModelX2[0], result);
        }

        [TestMethod]
        public void GetContactById_ConIdVacioEIqueyrableConUnElemento_RetornaContactoVacio()
        {

            ContactDataModel result = sut.GetContactById(emptyId, contactsDataModelX1.AsQueryable());

            Assert.AreEqual(ObjectId.Empty, result.Id);
        }

        #endregion

        #region ListContacts

        [TestMethod]
        public void ListContacts_ConContactIdVacio_RetornaListaVacia()
        {

            List<ContactDataModel> result = sut.ListContacts(emptyId, contactsX1.AsQueryable());

            Assert.AreEqual(contactsX0.Count, result.Count);
        }

        [TestMethod]
        public void ListContacts_ConContactIdValido_RetornaLaListaDeLosContactosDelUsuarioVacia()
        {

            List<ContactDataModel> result = sut.ListContacts(contactObjectId, contactsX0.AsQueryable());

            Assert.AreEqual(contactsX0.Count, result.Count);
        }

        [TestMethod]
        public void ListContacts_ConContactIdValido_RetornaLaListaDeLosContactosDelUsuarioConUnContacto()
        {

            List<ContactDataModel> result = sut.ListContacts(contactObjectId, contactsX1.AsQueryable());

            Assert.AreEqual(contactsX1.Count, result.Count);
            Assert.AreEqual(contactsX1[0].Id, result[0].Id);
        }

        [TestMethod]
        public void ListContacts_ConContactIdValido_RetornaLaListaDeLosContactosDelUsuarioConDosContactos()
        {

            List<ContactDataModel> result = sut.ListContacts(contactObjectId, contactsX2.AsQueryable());

            Assert.AreEqual(contactsX2.Count, result.Count);
            Assert.AreEqual(contactsX2[0].Id, result[0].Id);
            Assert.AreEqual(contactsX2[1].Id, result[1].Id);
        }

        #endregion

        #region Search

        [TestMethod]
        public void Search_WithoutAnyFilter_ReturnsFullListOfContacts()
        {

            List<ContactDataModel> result = sut.Search(contactEmptyDataModel, contactsX2.AsQueryable());

            Assert.AreEqual(contactsX2.Count, result.Count);
            Assert.AreEqual(contactsX2[0].Id, result[0].Id);
            Assert.AreEqual(contactsX2[1].Id, result[1].Id);
        }

        [TestMethod]
        public void Search_WithAllTheFilter_ReturnsAnEmptyListOfContacts()
        {

            List<ContactDataModel> result = sut.Search(fullFiltersContactDataModelX0, contactsX2.AsQueryable());

            Assert.AreEqual(result.Count, contactsX0.Count);
        }

        [TestMethod]
        public void Search_WithAllTheFilter_ReturnsListOfContactsWithOneResult()
        {

            List<ContactDataModel> result = sut.Search(fullFiltersContactDataModelX1, contactsX2.AsQueryable());

            Assert.AreEqual(contactsX1.Count, result.Count);
            Assert.AreEqual(contactsX2[0].Id, result[0].Id);
        }

        [TestMethod]
        public void Search_WithAllTheFilter_ReturnsListOfContactsWithTwoResults()
        {

            List<ContactDataModel> result = sut.Search(fullFiltersContactDataModelX2, contactsX2.AsQueryable());

            Assert.AreEqual(contactsX2.Count, result.Count);
            Assert.AreEqual(contactsX2[0].Id, result[0].Id);
            Assert.AreEqual(contactsX2[1].Id, result[1].Id);
        }

        #endregion
    }
}
