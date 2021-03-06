﻿using Domain.Business;
using Domain.Data;
using Domain.DataModel;
using MongoDB.Bson;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.Business
{
    [TestClass]
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
        private const int emptyItemsCount = 0;
        private readonly ContactDataModel contactEmptyDataModel = new ContactDataModel();
        private readonly ContactDataModel contactDataModel = new ContactDataModel { Email = "a@a.com", Password = "123456" };
        private readonly List<ContactDataModel> contactsX0 = new List<ContactDataModel>();
        private readonly List<ContactDataModel> contactsX1 = new List<ContactDataModel> { new ContactDataModel { Id = contactObjectId } };
        private readonly List<ContactDataModel> contactsX2 = new List<ContactDataModel> { 
            new ContactDataModel { Id = contactObjectId },
            new ContactDataModel { Id = ObjectId.GenerateNewId() }
        };
        private readonly ContactDataModel fullFiltersContactDataModel = new ContactDataModel
        {
            Address = "Address",
            Cellphone = "1234",
            Alias = "Alias",
            Email = "Email",
            Name = "Name",
            Phone = "Phone",
            Surname = "Surname"
        };

        #endregion

        [TestInitialize]
        public void SetUp()
        {
            mocker = new Mock<ContactData>();
            sut = new ContactBusiness();

            sut.Data = mocker.Object;
        }


        #region CONSTRUCTOR

        [TestMethod]
        public void ContactBusiness_SinParametros_CreaInstanciaDelObjetoDeLaCapaInferior()
        {
            sut = new ContactBusiness();

            Assert.IsNotNull(sut.Data);
        }

        #endregion

        #region SaveContact

        [TestMethod]
        public void Post_ConDatosDeContacto_InvocaMetodoDeCapaInferiorQueGuardaAlContacto()
        {
            mocker.Setup(o => o.SaveContact(contactDataModel));

            sut.SaveContact(contactDataModel);

            mocker.Verify(o => o.SaveContact(contactDataModel));
        }

        [TestMethod]
        public void SaveContact_WithContactData_InvokesMethodFromNextLayerWhichReturnsTheContactId()
        {
            mocker.Setup(o => o.SaveContact(It.IsAny<ContactDataModel>())).Returns(contactObjectId);

            ObjectId result = sut.SaveContact(contactDataModel);

            Assert.AreSame(contactObjectId, result);
        }

        #endregion

        #region GetContactByEmail

        [TestMethod]
        public void GetContactByEmail_ConEmailValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.GetContactByEmail(validEmail)).Returns(contactDataModel);

            sut.GetContactByEmail(validEmail);

            mocker.Verify(o => o.GetContactByEmail(validEmail));
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailValido_RetornaContacto()
        {
            mocker.Setup(o => o.GetContactByEmail(validEmail)).Returns(contactDataModel);

            ContactDataModel result = sut.GetContactByEmail(validEmail);

            Assert.AreEqual(result.Id, contactDataModel.Id);
            Assert.AreEqual(result.Email, contactDataModel.Email);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailInvalido_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(invalidEmail)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactByEmail(invalidEmail);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailNulo_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(nullEmail)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactByEmail(nullEmail);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        }

        [TestMethod]
        public void GetContactByEmail_ConEmailVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(emptyEmail)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactByEmail(emptyEmail);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Email, contactEmptyDataModel.Email);
        }

        #endregion

        #region GetContactById

        [TestMethod]
        public void GetContactById_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.GetContactById(contactObjectId)).Returns(contactDataModel);

            sut.GetContactById(contactObjectId);

            mocker.Verify(o => o.GetContactById(contactObjectId));
        }

        [TestMethod]
        public void GetContactById_ConIdValido_RetornaContacto()
        {
            mocker.Setup(o => o.GetContactById(contactObjectId)).Returns(contactDataModel);

            ContactDataModel result = sut.GetContactById(contactObjectId);

            Assert.AreEqual(result.Id, contactDataModel.Id);
            Assert.AreEqual(result.Id, contactDataModel.Id);
        }

        [TestMethod]
        public void GetContactById_ConIdVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactById(emptyId)).Returns(contactEmptyDataModel);

            ContactDataModel result = sut.GetContactById(emptyId);

            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
            Assert.AreEqual(result.Id, contactEmptyDataModel.Id);
        }

        #endregion

        #region Delete

        [TestMethod]
        public void Delete_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.Delete(contactObjectId));

            sut.Delete(contactObjectId);

            mocker.Verify(o => o.Delete(contactObjectId));
        }

        #endregion

        #region ListContacts

        [TestMethod]
        public void ListContacts_ConContactId_InvocaMetodoDeLaCapaInferiorQueRetornaLaListaDeLosContactosDelUsuario()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX1);

            sut.ListContacts(contactObjectId);

            mocker.Verify(o => o.ListContacts(contactObjectId));
        }

        [TestMethod]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioVacia()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX0);

            IList<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.AreEqual(emptyItemsCount, result.Count);
        }

        [TestMethod]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConUnContacto()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX1);

            IList<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.AreEqual(result.Count, contactsX1.Count);
            Assert.AreEqual(result[0].Id, contactsX1[0].Id);
        }

        [TestMethod]
        public void ListContacts_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConDosContactos()
        {
            mocker.Setup(o => o.ListContacts(contactObjectId)).Returns(contactsX2);

            IList<ContactDataModel> result = sut.ListContacts(contactObjectId);

            Assert.AreEqual(result.Count, contactsX2.Count);
            Assert.AreEqual(result[0].Id, contactsX2[0].Id);
            Assert.AreEqual(result[1].Id, contactsX2[1].Id);
        }

        #endregion

        #region Search

        [TestMethod]
        public void Search_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsTheListOfContacts()
        {
            mocker.Setup(o => o.Search(contactEmptyDataModel)).Returns(contactsX1);

            sut.Search(contactEmptyDataModel);

            mocker.Verify(o => o.Search(contactEmptyDataModel));
        }

        [TestMethod]
        public void Search_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsEmptyListOfContacts()
        {
            mocker.Setup(o => o.Search(contactEmptyDataModel)).Returns(contactsX0);

            IList<ContactDataModel> result = sut.Search(contactEmptyDataModel);

            Assert.AreSame(contactsX0, result);
        }

        [TestMethod]
        public void Search_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsListOfContactsWithTwoResults()
        {
            mocker.Setup(o => o.Search(contactEmptyDataModel)).Returns(contactsX2);

            IList<ContactDataModel> result = sut.Search(contactEmptyDataModel);

            Assert.AreSame(contactsX2, result);
        }

        [TestMethod]
        public void Search_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsListOfContactsWithOneResult()
        {
            mocker.Setup(o => o.Search(contactEmptyDataModel)).Returns(contactsX1);

            IList<ContactDataModel> result = sut.Search(contactEmptyDataModel);

            Assert.AreSame(contactsX1, result);
        }

        [TestMethod]
        public void Search_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsTheListOfContacts()
        {
            mocker.Setup(o => o.Search(fullFiltersContactDataModel)).Returns(contactsX1);

            sut.Search(fullFiltersContactDataModel);

            mocker.Verify(o => o.Search(fullFiltersContactDataModel));
        }

        [TestMethod]
        public void Search_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsEmptyListOfContacts()
        {
            mocker.Setup(o => o.Search(fullFiltersContactDataModel)).Returns(contactsX0);

            IList<ContactDataModel> result = sut.Search(fullFiltersContactDataModel);

            Assert.AreSame(contactsX0, result);
        }

        [TestMethod]
        public void Search_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsListOfContactsWithTwoResults()
        {
            mocker.Setup(o => o.Search(fullFiltersContactDataModel)).Returns(contactsX2);

            IList<ContactDataModel> result = sut.Search(fullFiltersContactDataModel);

            Assert.AreSame(contactsX2, result);
        }

        [TestMethod]
        public void Search_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsListOfContactsWithOneResult()
        {
            mocker.Setup(o => o.Search(fullFiltersContactDataModel)).Returns(contactsX1);

            IList<ContactDataModel> result = sut.Search(fullFiltersContactDataModel);

            Assert.AreSame(contactsX1, result);
        }

        #endregion
    }
}
