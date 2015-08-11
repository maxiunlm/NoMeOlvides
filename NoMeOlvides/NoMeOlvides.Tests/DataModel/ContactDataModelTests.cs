using Domain.DataModel;
using Domain.ViewModel;
using MongoDB.Bson;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.DataModel
{
    [TestFixture]
    public class ContactDataModelTests
    {

        #region Fixture

        private readonly ContactViewModel contactViewModel = new ContactViewModel { Id = ObjectId.GenerateNewId().ToString(), Email = "a@a.com", Password = "123456" };
        private readonly ContactViewModel newContactViewModel = new ContactViewModel { Email = "a@a.com", Password = "123456" };
        
        #endregion

        #region CONSTRUCTOR

        [Test]
        public void ContactDataModel_ConUnViewModel_CopiaLosAtributos()
        {

            ContactDataModel sut = new ContactDataModel(contactViewModel);

            Assert.AreEqual(contactViewModel.Id, sut.Id.ToString());
            Assert.AreEqual(contactViewModel.Alias, sut.Alias);
            Assert.AreEqual(contactViewModel.Name, sut.Name);
            Assert.AreEqual(contactViewModel.Surname, sut.Surname);
            Assert.AreEqual(contactViewModel.Email, sut.Email);
            Assert.AreEqual(contactViewModel.Phone, sut.Phone);
            Assert.AreEqual(contactViewModel.Cellphone, sut.Cellphone);
            Assert.AreEqual(contactViewModel.Address, sut.Address);
            Assert.AreEqual(contactViewModel.Password, sut.Password);
            Assert.AreEqual(contactViewModel.Contacts.Count, sut.Contacts.Count);
        }

        [Test]
        public void ContactDataModel_ConUnViewModelConIdNulo_CopiaLosAtributosSinExcepciones()
        {

            ContactDataModel sut = new ContactDataModel(newContactViewModel);

            Assert.IsNull(newContactViewModel.Id);
            Assert.AreEqual(newContactViewModel.Alias, sut.Alias);
            Assert.AreEqual(newContactViewModel.Name, sut.Name);
            Assert.AreEqual(newContactViewModel.Surname, sut.Surname);
            Assert.AreEqual(newContactViewModel.Email, sut.Email);
            Assert.AreEqual(newContactViewModel.Phone, sut.Phone);
            Assert.AreEqual(newContactViewModel.Cellphone, sut.Cellphone);
            Assert.AreEqual(newContactViewModel.Address, sut.Address);
            Assert.AreEqual(newContactViewModel.Password, sut.Password);
            Assert.AreEqual(contactViewModel.Contacts.Count, sut.Contacts.Count);
        }

        #endregion
    }
}
