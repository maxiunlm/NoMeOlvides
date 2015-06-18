﻿using Domain.Business;
using Domain.DataModel;
using Domain.Service;
using Domain.ViewModel;
using MongoDB.Bson;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.Service
{
    [TestFixture]
    public class ContactServiceTests
    {
        private ContactService sut;
        private Mock<ContactBusiness> mocker;


        #region Fixture

        private static readonly string validContactId = ObjectId.GenerateNewId().ToString();
        private readonly string emptyId = ObjectId.Empty.ToString();
        private readonly ObjectId emptyObjectId = ObjectId.Empty;
        private static readonly ObjectId contactObjectId = ObjectId.GenerateNewId();
        private const string validEmail = "a@a.com";
        private const string invalidEmail = "aacom";
        private const string emptyEmail = "";
        private const string nullEmail = null;
        private readonly ContactDataModel contactEmptyDataModel = new ContactDataModel();
        private readonly ContactViewModel contactEmptyViewModel = new ContactViewModel();
        private readonly ContactViewModel contactViewModel = new ContactViewModel { Id = validContactId, Email = "a@a.com", Password = "123456" };
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
            mocker = new Mock<ContactBusiness>();
            sut = new ContactService();

            sut.Business = mocker.Object;
        }


        #region CONSTRUCTOR

        [Test]
        public void ContactService_SinParametros_CreaInstanciaDelObjetoDeLaCapaInferior()
        {

            sut = new ContactService();

            Assert.IsNotNull(sut.Business);
        }

        #endregion

        #region SaveContact

        [Test]
        public void SaveContact_ConDatosDeContacto_InvocaMetodoDeCapaInferiorQueGuardaAlContacto()
        {
            mocker.Setup(o => o.SaveContact(It.IsAny<ContactDataModel>()));

            sut.SaveContact(contactViewModel);

            mocker.Verify(o => o.SaveContact(It.IsAny<ContactDataModel>()));
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

            ContactViewModel result = sut.GetContactByEmail(validEmail);

            Assert.AreEqual(result.Id, contactDataModel.Id.ToString());
            Assert.AreEqual(result.Email, contactDataModel.Email);
        }

        [Test]
        public void GetContactByEmail_ConEmailInvalido_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(invalidEmail)).Returns(contactEmptyDataModel);

            ContactViewModel result = sut.GetContactByEmail(invalidEmail);

            Assert.AreEqual(contactEmptyDataModel.Id.ToString(), result.Id);
            Assert.AreEqual(contactEmptyDataModel.Email, result.Email);
        }

        [Test]
        public void GetContactByEmail_ConEmailNulo_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(nullEmail)).Returns(contactEmptyDataModel);

            ContactViewModel result = sut.GetContactByEmail(nullEmail);

            Assert.AreEqual(contactEmptyDataModel.Id.ToString(), result.Id);
            Assert.AreEqual(contactEmptyDataModel.Email, result.Email);
        }

        [Test]
        public void GetContactByEmail_ConEmailVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(emptyEmail)).Returns(contactEmptyDataModel);

            ContactViewModel result = sut.GetContactByEmail(emptyEmail);

            Assert.AreEqual(contactEmptyDataModel.Id.ToString(), result.Id);
            Assert.AreEqual(contactEmptyDataModel.Email, result.Email);
        }

        #endregion

        #region GetContactById

        [Test]
        public void GetContactById_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.GetContactById(It.IsAny<ObjectId>())).Returns(contactDataModel);

            sut.GetContactById(validContactId);

            mocker.Verify(o => o.GetContactById(It.IsAny<ObjectId>()));
        }

        [Test]
        public void GetContactById_ConIdValido_RetornaContacto()
        {
            mocker.Setup(o => o.GetContactById(It.IsAny<ObjectId>())).Returns(contactDataModel);

            ContactViewModel result = sut.GetContactById(validContactId);

            Assert.AreEqual(result.Id, contactDataModel.Id.ToString());
            Assert.AreEqual(result.Email, contactDataModel.Email);
        }

        [Test]
        public void GetContactById_ConIdVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactById(emptyObjectId)).Returns(contactEmptyDataModel);

            ContactViewModel result = sut.GetContactById(emptyId);

            Assert.AreEqual(contactEmptyDataModel.Id.ToString(), result.Id);
            Assert.AreEqual(contactEmptyDataModel.Email, result.Email);
        }

        #endregion

        #region Delete

        [Test]
        public void Delete_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.Delete(It.IsAny<ObjectId>()));

            sut.Delete(validContactId);

            mocker.Verify(o => o.Delete(It.IsAny<ObjectId>()));
        }

        #endregion

        #region ListContacts

        [Test]
        public void ListContacts_ConContactId_InvocaMetodoDeLaCapaInferiorQueRetornaLaListaDeLosContactosDelUsuario()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<ObjectId>())).Returns(contactsX1);

            sut.ListContacts(validContactId);

            mocker.Verify(o => o.ListContacts(It.IsAny<ObjectId>()));
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioVacia()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<ObjectId>())).Returns(contactsX0);

            List<ContactViewModel> result = sut.ListContacts(validContactId);

            Assert.IsEmpty(result);
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConUnContacto()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<ObjectId>())).Returns(contactsX1);

            List<ContactViewModel> result = sut.ListContacts(validContactId);

            Assert.AreEqual(result.Count, contactsX1.Count);
            Assert.AreEqual(result[0].Id, contactsX1[0].Id.ToString());
        }

        [Test]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConDosContactos()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<ObjectId>())).Returns(contactsX2);

            List<ContactViewModel> result = sut.ListContacts(validContactId);

            Assert.AreEqual(result.Count, contactsX2.Count);
            Assert.AreEqual(result[0].Id, contactsX2[0].Id.ToString());
            Assert.AreEqual(result[1].Id, contactsX2[1].Id.ToString());
        }

        #endregion
    }
}
