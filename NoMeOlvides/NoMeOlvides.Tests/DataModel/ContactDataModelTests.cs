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
        private ContactDataModel sut;

        #region Fixture

        private static readonly ObjectId id = ObjectId.GenerateNewId();
        private const string alias = "alias";
        private const string name = "name";
        private const string surname = "surname";
        private const string email = "email";
        private const string phone = "phone";
        private const string cellphone = "cellphone";
        private const string address = "address";
        private const string password = "password";
        private readonly ContactViewModel contactViewModel = new ContactViewModel { Id = ObjectId.GenerateNewId().ToString(), Email = "a@a.com", Password = "123456" };
        private readonly ContactViewModel newContactViewModel = new ContactViewModel { Email = "a@a.com", Password = "123456" };
        private const int oneItemCount = 1;
        private const int twoItemsCount = 2;
        private const int firstItemIndex = 0;
        private const int secondItemIndex = 1;
        private static readonly ObjectId contact1 = ObjectId.GenerateNewId();
        private static readonly ObjectId contact2 = ObjectId.GenerateNewId();
        private readonly List<ObjectId> contactsNulled = null;
        private readonly List<ObjectId> contactsX0 = new List<ObjectId>();
        private readonly List<ObjectId> contactsX1 = new List<ObjectId> { contact1 };
        private readonly List<ObjectId> contactsX2 = new List<ObjectId> { contact1, contact2 };
        private readonly ContactDataModel contactDataModel = new ContactDataModel { Id = new ObjectId(), Email = "a@a.com", Password = "123456" };


        #endregion

        [SetUp]
        public void SetUp()
        {
            sut = new ContactDataModel();
        }

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

            Assert.IsEmpty(newContactViewModel.Id);
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

        #region Id [GET]

        [Test]
        public void Id_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(ObjectId.Empty, sut.Id);
        }

        #endregion
        #region Id [SET]

        [Test]
        public void Id_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Id = ObjectId.Empty;

            Assert.AreEqual(ObjectId.Empty, sut.Id);
        }

        [Test]
        public void Id_SET__InitializedWithAValidId_ReturnsTheSameId()
        {

            sut.Id = id;

            Assert.AreEqual(id, sut.Id);
        }

        #endregion

        #region Contacts GET

        [Test]
        public void Contacts_GET__SinInicializar_RetornaListaVacia()
        {

            List<ObjectId> result = sut.Contacts;

            Assert.IsEmpty(result);
        }

        #endregion
        #region Contacts SET

        [Test]
        public void Contacts_SET__ConListaVacia_RetornaListaVacia()
        {
            sut.Contacts = contactsX0;

            List<ObjectId> result = sut.Contacts;

            Assert.IsEmpty(result);
        }

        [Test]
        public void Contacts_SET__ConNulo_RetornaRetornaListaVacia()
        {
            sut.Contacts = contactsNulled;

            List<ObjectId> result = sut.Contacts;

            Assert.IsEmpty(result);
        }

        [Test]
        public void Contacts_SET__ConUnItem_RetornaListaConUnItem()
        {
            sut.Contacts = contactsX1;

            List<ObjectId> result = sut.Contacts;

            Assert.AreEqual(oneItemCount, result.Count);
            Assert.AreEqual(contact1, result[firstItemIndex]);
        }

        [Test]
        public void Contacts_SET__ConDosItems_RetornaListaConDosItems()
        {
            sut.Contacts = contactsX2;

            List<ObjectId> result = sut.Contacts;

            Assert.AreEqual(twoItemsCount, result.Count);
            Assert.AreEqual(contact1, result[firstItemIndex]);
            Assert.AreEqual(contact2, result[secondItemIndex]);
        }

        #endregion

        #region Alias [GET]

        [Test]
        public void Alias_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Alias);
        }

        #endregion
        #region Alias [SET]

        [Test]
        public void Alias_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Alias = null;

            Assert.AreEqual(string.Empty, sut.Alias);
        }

        [Test]
        public void Alias_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Alias = string.Empty;

            Assert.AreEqual(string.Empty, sut.Alias);
        }

        [Test]
        public void Alias_SET__InitializedWithAValidAlias_ReturnsTheSameAlias()
        {

            sut.Alias = alias;

            Assert.AreSame(alias, sut.Alias);
        }

        #endregion

        #region Name [GET]

        [Test]
        public void Name_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Name);
        }

        #endregion
        #region Name [SET]

        [Test]
        public void Name_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Name = null;

            Assert.AreEqual(string.Empty, sut.Name);
        }

        [Test]
        public void Name_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Name = string.Empty;

            Assert.AreEqual(string.Empty, sut.Name);
        }

        [Test]
        public void Name_SET__InitializedWithAValidName_ReturnsTheSameName()
        {

            sut.Name = name;

            Assert.AreSame(name, sut.Name);
        }

        #endregion

        #region Surname [GET]

        [Test]
        public void Surname_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Surname);
        }

        #endregion
        #region Surname [SET]

        [Test]
        public void Surname_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Surname = null;

            Assert.AreEqual(string.Empty, sut.Surname);
        }

        [Test]
        public void Surname_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Surname = string.Empty;

            Assert.AreEqual(string.Empty, sut.Surname);
        }

        [Test]
        public void Surname_SET__InitializedWithAValidSurname_ReturnsTheSameSurname()
        {

            sut.Surname = surname;

            Assert.AreSame(surname, sut.Surname);
        }

        #endregion

        #region Email [GET]

        [Test]
        public void Email_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Email);
        }

        #endregion
        #region Email [SET]

        [Test]
        public void Email_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Email = null;

            Assert.AreEqual(string.Empty, sut.Email);
        }

        [Test]
        public void Email_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Email = string.Empty;

            Assert.AreEqual(string.Empty, sut.Email);
        }

        [Test]
        public void Email_SET__InitializedWithAValidEmail_ReturnsTheSameEmail()
        {

            sut.Email = email;

            Assert.AreSame(email, sut.Email);
        }

        #endregion

        #region Phone [GET]

        [Test]
        public void Phone_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Phone);
        }

        #endregion
        #region Phone [SET]

        [Test]
        public void Phone_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Phone = null;

            Assert.AreEqual(string.Empty, sut.Phone);
        }

        [Test]
        public void Phone_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Phone = string.Empty;

            Assert.AreEqual(string.Empty, sut.Phone);
        }

        [Test]
        public void Phone_SET__InitializedWithAValidPhone_ReturnsTheSamePhone()
        {

            sut.Phone = phone;

            Assert.AreSame(phone, sut.Phone);
        }

        #endregion

        #region Cellphone [GET]

        [Test]
        public void Cellphone_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Cellphone);
        }

        #endregion
        #region Cellphone [SET]

        [Test]
        public void Cellphone_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Cellphone = null;

            Assert.AreEqual(string.Empty, sut.Cellphone);
        }

        [Test]
        public void Cellphone_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Cellphone = string.Empty;

            Assert.AreEqual(string.Empty, sut.Cellphone);
        }

        [Test]
        public void Cellphone_SET__InitializedWithAValidCellphone_ReturnsTheSameCellphone()
        {

            sut.Cellphone = cellphone;

            Assert.AreSame(cellphone, sut.Cellphone);
        }

        #endregion

        #region Address [GET]

        [Test]
        public void Address_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Address);
        }

        #endregion
        #region Address [SET]

        [Test]
        public void Address_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Address = null;

            Assert.AreEqual(string.Empty, sut.Address);
        }

        [Test]
        public void Address_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Address = string.Empty;

            Assert.AreEqual(string.Empty, sut.Address);
        }

        [Test]
        public void Address_SET__InitializedWithAValidAddress_ReturnsTheSameAddress()
        {

            sut.Address = address;

            Assert.AreSame(address, sut.Address);
        }

        #endregion

        #region Password [GET]

        [Test]
        public void Password_GET__WithoutInitialize_ReturnsAnEmptyString()
        {


            Assert.AreEqual(string.Empty, sut.Password);
        }

        #endregion
        #region Password [SET]

        [Test]
        public void Password_SET__InitializedWithNull_ReturnsAnEmptyString()
        {

            sut.Password = null;

            Assert.AreEqual(string.Empty, sut.Password);
        }

        [Test]
        public void Password_SET__InitializedWithAnEmptyString_ReturnsAnEmptyString()
        {

            sut.Password = string.Empty;

            Assert.AreEqual(string.Empty, sut.Password);
        }

        [Test]
        public void Password_SET__InitializedWithAValidPassword_ReturnsTheSamePassword()
        {

            sut.Password = password;

            Assert.AreSame(password, sut.Password);
        }

        #endregion
    }
}
