using Domain.DataModel;
using Domain.ViewModel;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.TestMethods.ViewModel
{
    [TestClass]
    public class ContactViewModelTestMethods
    {
        private ContactViewModel sut;

        #region Fixture

        private const string id = "id";
        private const string alias = "alias";
        private const string name = "name";
        private const string surname = "surname";
        private const string email = "email";
        private const string phone = "phone";
        private const string cellphone = "cellphone";
        private const string address = "address";
        private const string password = "password";
        private const int oneItemCount = 1;
        private const int twoItemsCount = 2;
        private const int emptyItemsCount = 0;
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

        [TestInitialize]
        public void SetUp()
        {
            sut = new ContactViewModel();
        }

        #region CONSTRUCTOR

        [TestMethod]
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

        [TestMethod]
        public void Contacts_GET__SinInicializar_RetornaListaVacia()
        {

            List<string> result = sut.Contacts;

            Assert.AreEqual(emptyItemsCount, result.Count);
        }

        #endregion
        #region Contacts SET

        [TestMethod]
        public void Contacts_SET__ConListaVacia_RetornaListaVacia()
        {
            sut.Contacts = contactsX0;

            List<string> result = sut.Contacts;

            Assert.AreEqual(emptyItemsCount, result.Count);
        }

        [TestMethod]
        public void Contacts_SET__ConNulo_RetornaRetornaListaVacia()
        {
            sut.Contacts = contactsNulled;

            List<string> result = sut.Contacts;

            Assert.AreEqual(emptyItemsCount, result.Count);
        }

        [TestMethod]
        public void Contacts_SET__ConUnItem_RetornaListaConUnItem()
        {
            sut.Contacts = contactsX1;

            List<string> result = sut.Contacts;

            Assert.AreEqual(oneItemCount, result.Count);
            Assert.AreEqual(contact1, result[firstItemIndex]);
        }

        [TestMethod]
        public void Contacts_SET__ConDosItems_RetornaListaConDosItems()
        {
            sut.Contacts = contactsX2;

            List<string> result = sut.Contacts;

            Assert.AreEqual(twoItemsCount, result.Count);
            Assert.AreEqual(contact1, result[firstItemIndex]);
            Assert.AreEqual(contact2, result[secondItemIndex]);
        }

        #endregion

        #region Id [GET]

        [TestMethod]
        public void Id_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Id);
        }

        #endregion
        #region Id [SET]

        [TestMethod]
        public void Id_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Id = null;

            Assert.AreEqual(string.Empty, sut.Id);
        }

        [TestMethod]
        public void Id_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Id = string.Empty;

            Assert.AreEqual(string.Empty, sut.Id);
        }

        [TestMethod]
        public void Id_SET__InitializedWithAValidId_ReturnsTheSameId()
        {

            sut.Id = id;

            Assert.AreSame(id, sut.Id);
        }

        #endregion

        #region Alias [GET]

        [TestMethod]
        public void Alias_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Alias);
        }

        #endregion
        #region Alias [SET]

        [TestMethod]
        public void Alias_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Alias = null;

            Assert.AreEqual(string.Empty, sut.Alias);
        }

        [TestMethod]
        public void Alias_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Alias = string.Empty;

            Assert.AreEqual(string.Empty, sut.Alias);
        }

        [TestMethod]
        public void Alias_SET__InitializedWithAValidAlias_ReturnsTheSameAlias()
        {

            sut.Alias = alias;

            Assert.AreSame(alias, sut.Alias);
        }

        #endregion

        #region Name [GET]

        [TestMethod]
        public void Name_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Name);
        }

        #endregion
        #region Name [SET]

        [TestMethod]
        public void Name_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Name = null;

            Assert.AreEqual(string.Empty, sut.Name);
        }

        [TestMethod]
        public void Name_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Name = string.Empty;

            Assert.AreEqual(string.Empty, sut.Name);
        }

        [TestMethod]
        public void Name_SET__InitializedWithAValidName_ReturnsTheSameName()
        {

            sut.Name = name;

            Assert.AreSame(name, sut.Name);
        }

        #endregion

        #region Surname [GET]

        [TestMethod]
        public void Surname_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Surname);
        }

        #endregion
        #region Surname [SET]

        [TestMethod]
        public void Surname_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Surname = null;

            Assert.AreEqual(string.Empty, sut.Surname);
        }

        [TestMethod]
        public void Surname_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Surname = string.Empty;

            Assert.AreEqual(string.Empty, sut.Surname);
        }

        [TestMethod]
        public void Surname_SET__InitializedWithAValidSurname_ReturnsTheSameSurname()
        {

            sut.Surname = surname;

            Assert.AreSame(surname, sut.Surname);
        }

        #endregion

        #region Email [GET]

        [TestMethod]
        public void Email_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Email);
        }

        #endregion
        #region Email [SET]

        [TestMethod]
        public void Email_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Email = null;

            Assert.AreEqual(string.Empty, sut.Email);
        }

        [TestMethod]
        public void Email_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Email = string.Empty;

            Assert.AreEqual(string.Empty, sut.Email);
        }

        [TestMethod]
        public void Email_SET__InitializedWithAValidEmail_ReturnsTheSameEmail()
        {

            sut.Email = email;

            Assert.AreSame(email, sut.Email);
        }

        #endregion

        #region Phone [GET]

        [TestMethod]
        public void Phone_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Phone);
        }

        #endregion
        #region Phone [SET]

        [TestMethod]
        public void Phone_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Phone = null;

            Assert.AreEqual(string.Empty, sut.Phone);
        }

        [TestMethod]
        public void Phone_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Phone = string.Empty;

            Assert.AreEqual(string.Empty, sut.Phone);
        }

        [TestMethod]
        public void Phone_SET__InitializedWithAValidPhone_ReturnsTheSamePhone()
        {

            sut.Phone = phone;

            Assert.AreSame(phone, sut.Phone);
        }

        #endregion

        #region Cellphone [GET]

        [TestMethod]
        public void Cellphone_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Cellphone);
        }

        #endregion
        #region Cellphone [SET]

        [TestMethod]
        public void Cellphone_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Cellphone = null;

            Assert.AreEqual(string.Empty, sut.Cellphone);
        }

        [TestMethod]
        public void Cellphone_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Cellphone = string.Empty;

            Assert.AreEqual(string.Empty, sut.Cellphone);
        }

        [TestMethod]
        public void Cellphone_SET__InitializedWithAValidCellphone_ReturnsTheSameCellphone()
        {

            sut.Cellphone = cellphone;

            Assert.AreSame(cellphone, sut.Cellphone);
        }

        #endregion

        #region Address [GET]

        [TestMethod]
        public void Address_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Address);
        }

        #endregion
        #region Address [SET]

        [TestMethod]
        public void Address_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Address = null;

            Assert.AreEqual(string.Empty, sut.Address);
        }

        [TestMethod]
        public void Address_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Address = string.Empty;

            Assert.AreEqual(string.Empty, sut.Address);
        }

        [TestMethod]
        public void Address_SET__InitializedWithAValidAddress_ReturnsTheSameAddress()
        {

            sut.Address = address;

            Assert.AreSame(address, sut.Address);
        }

        #endregion

        #region Password [GET]

        [TestMethod]
        public void Password_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Password);
        }

        #endregion
        #region Password [SET]

        [TestMethod]
        public void Password_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Password = null;

            Assert.AreEqual(string.Empty, sut.Password);
        }

        [TestMethod]
        public void Password_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Password = string.Empty;

            Assert.AreEqual(string.Empty, sut.Password);
        }

        [TestMethod]
        public void Password_SET__InitializedWithAValidPassword_ReturnsTheSamePassword()
        {

            sut.Password = password;

            Assert.AreSame(password, sut.Password);
        }

        #endregion
    }
}
