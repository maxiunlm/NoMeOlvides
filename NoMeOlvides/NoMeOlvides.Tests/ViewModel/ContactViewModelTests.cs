using Domain.DataModel;
using Domain.ViewModel;
using MongoDB.Bson;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.ViewModel
{
    [TestFixture]
    public class ContactViewModelTests
    {
        private ContactViewModel sut;

        #region Fixture

        private const int oneItemCount = 1;
        private const int twoItemsCount = 2;
        private const int firstItemIndex = 0;
        private const int secondItemIndex = 1;
        private const string contact1 = "contact 1";
        private const string contact2 = "contact 2";
        private readonly List<string> contactsNulled = null;
        private readonly List<string> contactsX0 = new List<string>();
        private readonly List<string> contactsX1 = new List<string> { contact1 };
        private readonly List<string> contactsX2 = new List<string> { contact1, contact2 };
        private readonly ContactDataModel contactDataModel = new ContactDataModel { Id = new ObjectId(), Email = "a@a.com", Password = "123456" };

        #endregion

        [SetUp]
        public void SetUp()
        {
            sut = new ContactViewModel();
        }

        #region CONSTRUCTOR

        [Test]
        public void ContactDataModel_ConUnViewModel_CopiaLosAtributos()
        {

            ContactViewModel sut = new ContactViewModel(contactDataModel);

            Assert.AreEqual(contactDataModel.Id.ToString(), sut.Id);
            Assert.AreEqual(contactDataModel.Alias, sut.Alias);
            Assert.AreEqual(contactDataModel.Name, sut.Name);
            Assert.AreEqual(contactDataModel.Surname, sut.Surname);
            Assert.AreEqual(contactDataModel.Email, sut.Email);
            Assert.AreEqual(contactDataModel.Phone, sut.Phone);
            Assert.AreEqual(contactDataModel.Cellphone, sut.Cellphone);
            Assert.AreEqual(contactDataModel.Address, sut.Address);
            Assert.AreEqual(contactDataModel.Password, sut.Password);
            Assert.AreEqual(contactDataModel.Contacts.Count, sut.Contacts.Count);
        }

        #endregion

        #region Contacts GET

        [Test]
        public void Contacts_GET__SinInicializar_RetornaListaVacia()
        {

            List<string> result = sut.Contacts;

            Assert.IsEmpty(result);
        }

        #endregion

        #region Contacts SET

        [Test]
        public void Contacts_SET__ConListaVacia_RetornaListaVacia()
        {
            sut.Contacts = contactsX0;

            List<string> result = sut.Contacts;

            Assert.IsEmpty(result);
        }

        [Test]
        public void Contacts_SET__ConNulo_RetornaRetornaListaVacia()
        {
            sut.Contacts = contactsNulled;

            List<string> result = sut.Contacts;

            Assert.IsEmpty(result);
        }

        [Test]
        public void Contacts_SET__ConUnItem_RetornaListaConUnItem()
        {
            sut.Contacts = contactsX1;

            List<string> result = sut.Contacts;

            Assert.AreEqual(oneItemCount, result.Count);
            Assert.AreEqual(contact1, result[firstItemIndex]);
        }

        [Test]
        public void Contacts_SET__ConDosItems_RetornaListaConDosItems()
        {
            sut.Contacts = contactsX2;

            List<string> result = sut.Contacts;

            Assert.AreEqual(twoItemsCount, result.Count);
            Assert.AreEqual(contact1, result[firstItemIndex]);
            Assert.AreEqual(contact2, result[secondItemIndex]);
        }

        #endregion
    }
}
