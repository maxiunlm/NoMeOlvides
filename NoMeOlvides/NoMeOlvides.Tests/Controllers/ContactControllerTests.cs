using Domain.Service;
using Domain.ViewModel;
using Moq;
using NoMeOlvides.Controllers;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace NoMeOlvides.Tests.Controllers
{
    [TestFixture]
    public class ContactControllerTests
    {
        private ContactController sut;
        private Mock<ContactService> mocker;

        #region Fixture

        private const string contactId = "1";

        private readonly List<ContactViewModel> contactsX0 = new List<ContactViewModel> ();
        private readonly List<ContactViewModel> contactsX1 = new List<ContactViewModel> { new ContactViewModel { Id = contactId } };
        private readonly List<ContactViewModel> contactsX2 = new List<ContactViewModel> { 
            new ContactViewModel { Id = contactId },
            new ContactViewModel { Id = "2" }
        };

        #endregion

        [SetUp]
        public void SetUp()
        {
            mocker = new Mock<ContactService>();
            sut = new ContactController();

            sut.ContactService = mocker.Object;
        }

        #region CONSTRUCTOR

        [Test]
        public void ContactController_SinParametros_CreaInstanciaDelObjetoDeLaCapaService()
        {
            sut = new ContactController();

            Assert.IsNotNull(sut.ContactService);
        }

        #endregion

        #region Index

        [Test]
        public void Index_ConContactId_InvocaMetodoDeLaCapaInferiorQueRetornaLaListaDeLosContactosDelUsuario()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<string>())).Returns(contactsX1);

            sut.Index();

            mocker.Verify(o => o.ListContacts(It.IsAny<string>()));
        }

        [Test]
        public void Index_ConContactId_RetornaLaListaDeLosContactosDelUsuarioVacia()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<string>())).Returns(contactsX0);

            ViewResult resultView = (ViewResult)sut.Index();
            List<ContactViewModel> result = (List<ContactViewModel>)resultView.Model;

            Assert.IsEmpty(result);
        }

        [Test]
        public void Index_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConUnContacto()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<string>())).Returns(contactsX1);

            ViewResult resultView = (ViewResult)sut.Index();
            List<ContactViewModel> result = (List<ContactViewModel>)resultView.Model;

            Assert.AreEqual(result.Count, contactsX1.Count);
            Assert.AreEqual(result[0].Id, contactsX1[0].Id);
        }

        [Test]
        public void Index_ConContactId_RetornaLaListaDeLosContactosDelUsuarioConDosContactos()
        {
            mocker.Setup(o => o.ListContacts(It.IsAny<string>())).Returns(contactsX2);

            ViewResult resultView = (ViewResult)sut.Index();
            List<ContactViewModel> result = (List<ContactViewModel>)resultView.Model;

            Assert.AreEqual(result.Count, contactsX2.Count);
            Assert.AreEqual(result[0].Id, contactsX2[0].Id);
            Assert.AreEqual(result[1].Id, contactsX2[1].Id);
        }

        #endregion
    }
}
