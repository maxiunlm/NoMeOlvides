using Domain.Data;
using Domain.Hepler;
using Domain.ViewModel;
using MongoDB.Bson;
using NoMeOlvides.Controllers;
using NoMeOlvides.WebApis;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TechTalk.SpecFlow;
using Domain.Resources;

namespace NoMeOlvides.Tests.BDD
{
    [Binding]
    public class ContactSteps
    {
        private ContactController sut;
        private ContactApiController webApiSut;
        private ContactData contactData = new ContactData();
        private ContactViewModel contactViewModel;
        private string email;
        private string alias;
        private string surname;
        private string name;
        private string phone;
        private string cellphone;
        private string newEmail;
        private string password;
        private string contactId;
        private ContactViewModel result;
        private ContactViewModel searcher;
        private List<ContactViewModel> resultContacts;
        private Exception exceptionResult;

        private const int emptyListCount = 0;

        [BeforeScenario]
        public void BeforeScenario()
        {
            sut = new ContactController();
            webApiSut = new ContactApiController();
            contactViewModel = new ContactViewModel();
            searcher = new ContactViewModel();
            result = null;
            email = null;
            alias = null;
            surname = null;
            name = null;
            phone = null;
            cellphone = null;
        }

        #region Auxiliar Methods

        private void DeleteContactByEmail()
        {
            email = email ?? "a@a.com";
            contactViewModel.Email = email;
            contactData.DeleteByEmail(contactViewModel.Email);
        }

        #endregion

        #region Given

        [Given(@"email '(.*)'"), Scope(Feature = "Contact")]
        public void GivenEmail(string email)
        {
            this.email = email;
        }

        [Given(@"email de usuario pre existente'(.*)'")]
        public void GivenEmailDeUsuarioPreExistente(string email)
        {
            contactViewModel = contactViewModel ?? new ContactViewModel();
            webApiSut = webApiSut ?? new ContactApiController();
            this.email = email;
            contactViewModel.Email = email;

            DeleteContactByEmail();
            webApiSut.Post(contactViewModel);
        }

        [Given(@"el nuevo email '(.*)'")]
        public void GivenElNuevoEmail(string email)
        {
            newEmail = email;
        }

        [Given(@"password '(.*)'"), Scope(Feature = "Contact")]
        public void GivenPassword(string password)
        {
            this.password = password;
        }

        [Given(@"Id de contacto")]
        public void GivenIdDeContacto()
        {
            this.DeleteContactByEmail();
            webApiSut.Post(contactViewModel);

            contactId = webApiSut.GetByEmail(contactViewModel.Email).Id;
        }

        [Given(@"Id de contacto habiendo un usuario pre existente para el nuevo email")]
        public void GivenIdDeContactoHabiendoUnUsuarioPreExistenteParaElNuevoEmail()
        {
            contactId = webApiSut.GetByEmail(contactViewModel.Email).Id;
        }

        [Given(@"alias '(.*)'")]
        public void GivenAlias(string alias)
        {
            this.alias = alias;
        }

        [Given(@"name '(.*)'")]
        public void GivenName(string name)
        {
            this.name = name;
        }

        [Given(@"surname '(.*)'")]
        public void GivenSurname(string surname)
        {
            this.surname = surname;
        }

        [Given(@"phone '(.*)'")]
        public void GivenPhone(string phone)
        {
            this.phone = phone;
        }

        [Given(@"cellphone '(.*)'")]
        public void GivenCellphone(string cellphone)
        {
            this.cellphone = cellphone;
        }

        #endregion

        #region When

        [When(@"el Usuario ingresa a la pantalla de contactos")]
        public void WhenElUsuarioIngresaALaPantallaDeContactos()
        {
            ViewResult result = (ViewResult)sut.Index();
            resultContacts = (List<ContactViewModel>)result.Model;
        }

        [When(@"presiono el boton Aceptar"), Scope(Feature = "Contact")]
        public void WhenPresionoElBotonAceptar()
        {
            contactViewModel.Password = password;
            this.DeleteContactByEmail();

            webApiSut.Post(contactViewModel);
        }

        [When(@"presiono el boton Aceptar habiendo un usuario pre existente")]
        public void WhenPresionoElBotonAceptarHabiendoUnUsuarioPreExistente()
        {
            contactViewModel.Password = password;
            try
            {
                webApiSut.Post(contactViewModel);
            }
            catch (Exception exception)
            {
                exceptionResult = exception;
            }
        }

        [When(@"el sistema necesita un contacto por su e-mail"), Scope(Feature = "Contact")]
        public void WhenElSistemaNecesitaUnContactoPorSuE_Mail()
        {
            contactViewModel.Email = email;

            result = webApiSut.GetByEmail(contactViewModel.Email);
        }

        [When(@"el sistema necesita un contacto por su Id")]
        public void WhenElSistemaNecesitaUnContactoPorSuId()
        {
            result = webApiSut.Get(contactId);
        }

        [When(@"el usuario presiona el boton Aceptar de la Modificaicon")]
        public void WhenElUsuarioPresionaElBotonAceptarDeLaModificaicon()
        {
            contactViewModel.Id = contactId;
            contactViewModel.Email = newEmail;

            webApiSut.Put(contactViewModel);
        }

        [When(@"el usuario presiona el boton Aceptar de la Modificaicon habiendo un usuario pre existente")]
        public void WhenElUsuarioPresionaElBotonAceptarDeLaModificaiconHabiendoUnUsuarioPreExistente()
        {
            contactViewModel.Id = contactId;
            contactViewModel.Email = newEmail;

            try
            {
                webApiSut.Put(contactViewModel);
            }
            catch (Exception exception)
            {
                exceptionResult = exception;
            }
        }

        [When(@"el usuario presiona el boton Aceptar de la Baja")]
        public void WhenElUsuarioPresionaElBotonAceptarDeLaBaja()
        {
            webApiSut.Delete(contactId);
            result = webApiSut.Get(contactId);
        }

        [When(@"el usuario presiona el boton de Busqueda")]
        public void WhenElUsuarioPresionaElBotonDeBusqueda()
        {
            searcher.Id = contactId;
            resultContacts = (List<ContactViewModel>)webApiSut.Get(searcher);
        }

        [When(@"el usuario presiona el boton de Busqueda con filtros")]
        public void WhenElUsuarioPresionaElBotonDeBusquedaConFiltros()
        {
            searcher.Id = contactId;
            searcher.Email = email;
            searcher.Alias = alias;
            searcher.Name = name;
            searcher.Surname = surname;
            searcher.Phone = phone;
            searcher.Cellphone = cellphone;

            resultContacts = (List<ContactViewModel>)webApiSut.Get(searcher);
        }

        #endregion

        #region Then

        [Then(@"el Sistema carga la lista completa de contactos")]
        public void ThenElSistemaCargaLaListaCompletaDeContactos()
        {
            Assert.AreNotEqual(emptyListCount, resultContacts.Count);
        }

        [Then(@"el sistema da de alta al nuevo contacto"), Scope(Feature = "Contact")]
        public void ThenElSistemaDaDeAltaAlNuevoContacto()
        {
            result = webApiSut.GetByEmail(contactViewModel.Email);

            Assert.AreEqual(contactViewModel.Email, result.Email);
            Assert.AreEqual(contactViewModel.Password, result.Password);
        }

        [Then(@"el sistema obetiene el contacto")]
        public void ThenElSistemaObetieneElContactoPorSuId()
        {
            Assert.AreEqual(contactViewModel.Email, result.Email);
        }

        [Then(@"el sistema guarda los cambios sel contacto")]
        public void ThenElSistemaGuardaLosCambiosSelContacto()
        {
            Assert.AreEqual(newEmail, contactViewModel.Email);
            Assert.AreNotEqual(email, contactViewModel.Email);

            webApiSut.Delete(contactId);
        }

        [Then(@"el sistema elimina al contacto")]
        public void ThenElSistemaEliminaAlContacto()
        {
            Assert.AreEqual(ObjectId.Empty.ToString(), result.Id);
            Assert.AreNotEqual(contactViewModel.Id, result.Id);
        }
        
        [Then(@"el sistema arroja exepcion controlada de usuario pre existente")]
        public void ThenElSistemaArrojaExepcionControladaDeUsuarioPreExistente()
        {
            Assert.IsInstanceOf<DevelopedControlledException>(exceptionResult);
            Assert.AreEqual(Locale.preExistentContact, exceptionResult.Message);
        }

        [Then(@"lista de sus contactos los contactos que corresponden a la busqueda")]
        public void ThenListaDeSusContactosLosContactosQueCorrespondenALaBusqueda()
        {
            Assert.IsTrue(resultContacts.Count > emptyListCount);
            Assert.IsTrue(resultContacts.Any(o=> 
                o.Email.Contains(searcher.Email)
                || o.Alias.Contains(searcher.Alias)
                || o.Name.Contains(searcher.Name)
                || o.Surname.Contains(searcher.Surname)
                || o.Phone.Contains(searcher.Phone)
                || o.Cellphone.Contains(searcher.Cellphone)
            ));
        }

        #endregion
    }
}
