using System;
using NUnit.Framework;
using NoMeOlvides.WebApis;
using Moq;
using Domain.Service;
using Domain.ViewModel;
using Domain.DataModel;
using MongoDB.Bson;
using System.Web.Http;
using System.Net;
using System.Text;
using System.Net.Http;
using System.Web.Helpers;
using Domain.Resources;
using System.Collections.Generic;

namespace NoMeOlvides.Tests.WebApis
{
    [TestFixture]
    public class ContactApiControllerTests
    {
        private ContactApiController sut;
        private Mock<ContactService> mocker;


        #region Fixture

        private static readonly ObjectId objectId = ObjectId.GenerateNewId();
        private readonly string validId = objectId.ToString();
        private const string invalidId = "1";
        private const string emptyId = "";
        private const string nullId = null;
        private const string validEmail = "a@a.com";
        private const string invalidEmail = "aacom";
        private const string emptyEmail = "";
        private const string nullEmail = null;
        private const bool hasError = true;
        private const bool nonError = false;
        private readonly ContactViewModel contactEmptyViewModel = new ContactViewModel();
        private readonly ContactViewModel fullFiltersContactViewModel = new ContactViewModel
        {
            Address = "Address",
            Cellphone = "1234",
            Alias = "Alias",
            Email = "Email",
            Name = "Name",
            Phone = "Phone",
            Surname = "Surname"
        };
        private static readonly ContactViewModel contactViewModel = new ContactViewModel { Email = "a@a.com", Password = "123456" };
        private static readonly ContactViewModel contactExistentViewModel = new ContactViewModel { Id = ObjectId.GenerateNewId().ToString(), Email = "a@a.com", Password = "123456" };
        private static readonly ContactViewModel secondContactExistentViewModel = new ContactViewModel { Id = ObjectId.GenerateNewId().ToString(), Email = "b@b.com", Password = "7890" };
        private readonly Exception generalException = new Exception("TERMINAR!!!");
        private readonly IList<ContactViewModel> contactsX0 = new List<ContactViewModel>();
        private readonly IList<ContactViewModel> contactsX1 = new List<ContactViewModel> { contactExistentViewModel };
        private readonly IList<ContactViewModel> contactsX2 = new List<ContactViewModel> {
            contactExistentViewModel,
            secondContactExistentViewModel
        };

        #endregion

        [SetUp]
        public void SetUp()
        {
            mocker = new Mock<ContactService>();
            sut = new ContactApiController();

            sut.Service = mocker.Object;
        }


        #region CONSTRUCTOR

        [Test]
        public void ContactApiController_SinParametros_CreaInstanciaDelObjetoDeLaCapaService()
        {
            sut = new ContactApiController();

            Assert.IsNotNull(sut.Service);
        }

        #endregion

        #region Post

        [Test]
        public void Post_ConDatosDeContacto_InvocaMetodoDeCapaInferiorQueGuardaAlContacto()
        {
            mocker.Setup(o => o.SaveContact(contactViewModel));

            sut.Post(contactViewModel);

            mocker.Verify(o => o.SaveContact(contactViewModel));
        }

        [Test]
        public void Post_WithContactData_InvokeMethodFromTheNextLayerWichReturnsContactId()
        {
            mocker.Setup(o => o.SaveContact(contactViewModel)).Returns(validId);

            HttpResponseMessage httpResult = sut.Post(contactViewModel);
            string jsonResult = httpResult.Content.ToJson();
            ContactViewModel result = Json.Decode<ContactViewModel>(jsonResult);

            Assert.AreEqual(validId, result.Id);
        }

        [Test]
        public void Post_WithContactData_InvokeMethodFromTheNextLayerWichReturnsStatusCodeOK()
        {
            mocker.Setup(o => o.SaveContact(contactViewModel)).Returns(validId);

            HttpResponseMessage httpResult = sut.Post(contactViewModel);

            Assert.AreEqual(HttpStatusCode.OK, httpResult.StatusCode);
        }

        [Test]
        public void Post_WithContactData_InvokeMethodFromTheNextLayerWichReturnsNonErrorData()
        {
            mocker.Setup(o => o.SaveContact(contactViewModel)).Returns(validId);

            HttpResponseMessage httpResult = sut.Post(contactViewModel);
            string jsonResult = httpResult.Content.ToJson();
            ContactViewModel result = Json.Decode<ContactViewModel>(jsonResult);

            Assert.AreEqual(nonError, result.Errors.HasError);
        }

        [Test]
        public void Post_ConDatosDeContacto_InvocaMetodoDeCapaInferiorQueGuardaAlContactoQueArrojanException()
        {
            mocker.Setup(o => o.SaveContact(contactViewModel)).Throws(generalException);

            Exception exception = Assert.Catch(() => sut.Post(contactViewModel));
            var resultTask = ((((HttpResponseException)exception)).Response.Content).ReadAsStringAsync();
            string resultJsonString = resultTask.Result;
            ErrorResponseViewModel result = Json.Decode<ErrorResponseViewModel>(resultJsonString);

            Assert.That(exception, Is.InstanceOf<HttpResponseException>());
            Assert.AreEqual(hasError, result.Errors.HasError);
            Assert.AreEqual(Locale.generalErrorMessage, result.Errors.Messages[0]);
        }

        #endregion

        #region Put

        [Test]
        public void Put_ConDatosDeContacto_InvocaMetodoDeCapaInferiorQueGuardaAlContacto()
        {
            mocker.Setup(o => o.SaveContact(contactExistentViewModel));

            sut.Put(contactExistentViewModel);

            mocker.Verify(o => o.SaveContact(contactExistentViewModel));
        }

        #endregion

        #region Get [Search]

        [Test]
        public void Get_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsTheListOfContacts()
        {
            mocker.Setup(o => o.Search(contactEmptyViewModel)).Returns(contactsX1);

            sut.Get(contactEmptyViewModel);

            mocker.Verify(o => o.Search(contactEmptyViewModel));
        }

        [Test]
        public void Get_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsEmptyListOfContacts()
        {
            mocker.Setup(o => o.Search(contactEmptyViewModel)).Returns(contactsX0);

            IList<ContactViewModel> result = (IList<ContactViewModel>)sut.Get(contactEmptyViewModel);

            Assert.AreSame(contactsX0, result);
        }

        [Test]
        public void Get_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsEmptyListOfContactsWithTwoResults()
        {
            mocker.Setup(o => o.Search(contactEmptyViewModel)).Returns(contactsX2);

            IList<ContactViewModel> result = (IList<ContactViewModel>)sut.Get(contactEmptyViewModel);

            Assert.AreSame(contactsX2, result);
        }

        [Test]
        public void Get_WithoutFilters_InvokeMethodFromTheNextLayerWichReturnsListOfContactsWithOneResult()
        {
            mocker.Setup(o => o.Search(contactEmptyViewModel)).Returns(contactsX1);

            IList<ContactViewModel> result = (IList<ContactViewModel>)sut.Get(contactEmptyViewModel);

            Assert.AreSame(contactsX1, result);
        }

        [Test]
        public void Get_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsTheListOfContacts()
        {
            mocker.Setup(o => o.Search(fullFiltersContactViewModel)).Returns(contactsX1);

            sut.Get(fullFiltersContactViewModel);

            mocker.Verify(o => o.Search(fullFiltersContactViewModel));
        }

        [Test]
        public void Get_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsEmptyListOfContacts()
        {
            mocker.Setup(o => o.Search(fullFiltersContactViewModel)).Returns(contactsX0);

            IList<ContactViewModel> result = (IList<ContactViewModel>)sut.Get(fullFiltersContactViewModel);

            Assert.AreSame(contactsX0, result);
        }

        [Test]
        public void Get_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsEmptyListOfContactsWithTwoResults()
        {
            mocker.Setup(o => o.Search(fullFiltersContactViewModel)).Returns(contactsX2);

            IList<ContactViewModel> result = (IList<ContactViewModel>)sut.Get(fullFiltersContactViewModel);

            Assert.AreSame(contactsX2, result);
        }

        [Test]
        public void Get_WithAllTheFilters_InvokeMethodFromTheNextLayerWichReturnsListOfContactsWithOneResult()
        {
            mocker.Setup(o => o.Search(fullFiltersContactViewModel)).Returns(contactsX1);

            IList<ContactViewModel> result = (IList<ContactViewModel>)sut.Get(fullFiltersContactViewModel);

            Assert.AreSame(contactsX1, result);
        }

        #endregion

        #region GetByEmail

        [Test]
        public void GetByEmail_ConEmailValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.GetContactByEmail(validEmail));

            sut.GetByEmail(validEmail);

            mocker.Verify(o => o.GetContactByEmail(validEmail));
        }

        [Test]
        public void GetByEmail_ConEmailValido_RetornaContacto()
        {
            mocker.Setup(o => o.GetContactByEmail(validEmail)).Returns(contactViewModel);

            ContactViewModel result = sut.GetByEmail(validEmail);

            Assert.AreSame(result, contactViewModel);
        }

        [Test]
        public void GetByEmail_ConEmailInvalido_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(invalidEmail)).Returns(contactEmptyViewModel);

            ContactViewModel result = sut.GetByEmail(invalidEmail);

            Assert.AreSame(result, contactEmptyViewModel);
        }

        [Test]
        public void GetByEmail_ConEmailNulo_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(nullEmail)).Returns(contactEmptyViewModel);

            ContactViewModel result = sut.GetByEmail(nullEmail);

            Assert.AreSame(result, contactEmptyViewModel);
        }

        [Test]
        public void GetByEmail_ConEmailVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactByEmail(emptyEmail)).Returns(contactEmptyViewModel);

            ContactViewModel result = sut.GetByEmail(emptyEmail);

            Assert.AreSame(result, contactEmptyViewModel);
        }

        #endregion

        #region Get [By Id]

        [Test]
        public void Get_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.GetContactById(validId));

            sut.Get(validId);

            mocker.Verify(o => o.GetContactById(validId));
        }

        [Test]
        public void Get_ConIdValido_RetornaContacto()
        {
            mocker.Setup(o => o.GetContactById(validId)).Returns(contactViewModel);

            ContactViewModel result = sut.Get(validId);

            Assert.AreSame(result, contactViewModel);
        }

        [Test]
        public void Get_ConIdInvalido_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactById(invalidId)).Returns(contactEmptyViewModel);

            ContactViewModel result = sut.Get(invalidId);

            Assert.AreSame(result, contactEmptyViewModel);
        }

        [Test]
        public void Get_ConIdNulo_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactById(nullId)).Returns(contactEmptyViewModel);

            ContactViewModel result = sut.Get(nullId);

            Assert.AreSame(result, contactEmptyViewModel);
        }

        [Test]
        public void Get_ConIdVacio_RetornaContactoVacio()
        {
            mocker.Setup(o => o.GetContactById(emptyId)).Returns(contactEmptyViewModel);

            ContactViewModel result = sut.Get(emptyId);

            Assert.AreSame(result, contactEmptyViewModel);
        }

        #endregion

        #region Delete

        [Test]
        public void Delete_ConIdValido_InvocaMetodoDeLaCapaInferiorQueRetornaElContacto()
        {
            mocker.Setup(o => o.Delete(validId));

            sut.Delete(validId);

            mocker.Verify(o => o.Delete(validId));
        }

        #endregion
    }
}
