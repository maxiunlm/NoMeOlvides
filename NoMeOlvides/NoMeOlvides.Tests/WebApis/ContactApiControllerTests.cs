using System;
using NUnit.Framework;
using NoMeOlvides.WebApis;
using Moq;
using Domain.Service;
using Domain.ViewModel;
using Domain.DataModel;
using MongoDB.Bson;

namespace NoMeOlvides.Tests.WebApis
{
    [TestFixture]
    public class ContactApiControllerTests
    {
        private ContactApiController sut;
        private Mock<ContactService> mocker;


        #region Fixture

        private readonly string validId = ObjectId.GenerateNewId().ToString();
        private const string invalidId = "1";
        private const string emptyId = "";
        private const string nullId = null;
        private const string validEmail = "a@a.com";
        private const string invalidEmail = "aacom";
        private const string emptyEmail = "";
        private const string nullEmail = null;
        private readonly ContactViewModel contactEmptyViewModel = new ContactViewModel();
        private readonly ContactViewModel contactViewModel = new ContactViewModel { Email = "a@a.com", Password = "123456" };
        private static readonly ContactViewModel contactExistentViewModel = new ContactViewModel { Id = ObjectId.GenerateNewId().ToString(), Email = "a@a.com", Password = "123456" };

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

        #region Get

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
