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

        #region Fixture

        private readonly ContactDataModel contactDataModel = new ContactDataModel { Id = new ObjectId(), Email = "a@a.com", Password = "123456" };

        #endregion

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
            Assert.AreEqual(contactDataModel.CellPhone, sut.CellPhone);
            Assert.AreEqual(contactDataModel.Address, sut.Address);
            Assert.AreEqual(contactDataModel.Password, sut.Password);
            Assert.AreEqual(contactDataModel.Contacts.Count, sut.Contacts.Count);
        }

        #endregion
    }
}
