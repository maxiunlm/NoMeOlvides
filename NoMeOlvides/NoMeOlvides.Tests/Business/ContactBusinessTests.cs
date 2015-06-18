using Domain.Business;
using Domain.Data;
using Domain.DataModel;
using MongoDB.Bson;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.Business
{
    [TestFixture]
    public class ContactBusinessTests
    {
        private ContactBusiness sut;
        private Mock<ContactData> mocker;


        #region Fixture

        private static readonly ObjectId contactObjectId = ObjectId.GenerateNewId();
        private readonly ObjectId emptyId = ObjectId.Empty;
        private const string validEmail = "a@a.com";
        private const string invalidEmail = "aacom";
        private const string emptyEmail = "";
        private const string nullEmail = null;
        private readonly ContactDataModel contactEmptyDataModel = new ContactDataModel();
        private readonly ContactDataModel contactDataModel = new ContactDataModel { Email = "a@a.com", Password = "123456" };
        private readonly List<ContactDataModel> contactsX0 = new List<ContactDataModel>();
        private readonly List<ContactDataModel> contactsX1 = new List<ContactDataModel> { new ContactDataModel { Id = contactObjectId } };
        private readonly List<ContactDataModel> contactsX2 = new List<ContactDataModel> { 
            new ContactDataModel { Id = contactObjectId },
            new ContactDataModel { Id = ObjectId.GenerateNewId() }
        };

        #endregion

        [SetUp]
        public void SetUp()
        {
            mocker = new Mock<ContactData>();
            sut = new ContactBusiness();

            sut.Data = mocker.Object;
        }


        #region CONSTRUCTOR

        [Test]
        public void ContactBusiness_SinParametros_CreaInstanciaDelObjetoDeLaCapaInferior()
        {
            sut = new ContactBusiness();

            Assert.IsNotNull(sut.Data);
        }

        #endregion

        #region SaveContact

        [Test]
        public void Post_ConDatosDeContacto_InvocaMetodoDeCapaInferiorQueGuardaAlContacto()
        {
            mocker.Setup(o => o.SaveContact(contactDataModel));

            sut.SaveContact(contactDataModel);

            mocker.Verify(o => o.SaveContact(contactDataModel));
        }

        #endregion

        #region GetContactByEmail

        [Test]
        public void GetContactByEmail_ConEmailValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.GetContactByEmail(validEmail)).Returns(contactDataModel);

            sut.GetContactByEmail(validEmail);

            mocker.Verify(o => o.GetContactByEmail(validEmail));
        }

        [Test]
        public void GetContactByEmail_ConEmailValido_RetornaContacto()
        {
            mocker.Setup(o => o.GetContactByEmail(validEmail)).Returns(contactDataModel);

            ContactDataModel result = sut.GetContactByEmail(validEmail);

            Assert.AreEqual(result.Id, contactDataModel.Id);
            Assert.AreEqual(result.Email, contactDataModel.Email);
        }

        [Test]
        public void GetContactByEmail_ConEmailInvalido_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(invalidEmail)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactByEmail(invalidEmail);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        }

        [Test]
        public void GetContactByEmail_ConEmailNulo_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(nullEmail)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactByEmail(nullEmail);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        }

        [Test]
        public void GetContactByEmail_ConEmailVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(emptyEmail)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactByEmail(emptyEmail);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        }

        #endregion

        #region GetContactById

        [Test]
        public void GetContactById_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.GetContactById(contactObjectId)).Returns(contactDataModel);

            sut.GetContactById(contactObjectId);

            mocker.Verify(o => o.GetContactById(contactObjectId));
        }

        [Test]
        public void GetContactById_ConIdValido_RetornaContacto()
        {
            mocker.Setup(o => o.GetContactById(contactObjectId)).Returns(contactDataModel);

            ContactDataModel result = sut.GetContactById(contactObjectId);

            Assert.AreEqual(result.Id, contactDataModel.Id);
            Assert.AreEqual(result.Id, contactDataModel.Id);
        }

        [Test]
        public void GetContactById_ConIdVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactById(emptyId)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactById(emptyId);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
        }

        #endregion

        #region Delete

        [Test]
        public void Delete_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.Delete(contactObjectId));

            sut.Delete(contactObjectId);

            mocker.Verify(o => o.Delete(contactObjectId));
        }

        #endregion

        #region ListContacts

        [Test]
        public void ListContacts_ConContactId_InvocaMetodoDeLaCapaInferiorQueRetornaLaListaDeLosContactosDelUsuario()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX1);

            sut.ListContacts(contactObjectId);

            mocker.Verify(o => o.ListContacts(contactObjectId));
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioVacia()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX0);

            List<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.IsEmpty(result);
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConUnContacto()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX1);

            List<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.AreEqual(result.Count, contactsX1.Count);
            Assert.AreEqual(result[0].Id, contactsX1[0].Id);
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConDosContactos()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX2);

            List<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.AreEqual(result.Count, contactsX2.Count);
            Assert.AreEqual(result[0].Id, contactsX2[0].Id);
            Assert.AreEqual(result[1].Id, contactsX2[1].Id);
        }

        #endregion
    }
}
