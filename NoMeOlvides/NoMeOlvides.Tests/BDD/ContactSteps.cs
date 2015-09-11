using Domain.Data;
using Domain.Hepler;
using Domain.ViewModel;
using MongoDB.Bson;
using NoMeOlvides.Controllers;
using NoMeOlvides.WebApis;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Configuration;
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
        private string newEmail;
        private string password;
        private string contactId;
        private ContactViewModel result;
        private List<ContactViewModel> resultContacts;
        private Exception exceptionResult;


        [BeforeScenario]
        public void BeforeScenario()
        {
            sut = new ContactController();
            webApiSut = new ContactApiController();
            contactViewModel = new ContactViewModel();
            result = null;
            email = null;
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

        #endregion

        #region Then

        [Then(@"el Sistema carga la lista completa de contactos")]
        public void ThenElSistemaCargaLaListaCompletaDeContactos()
        {
            Assert.IsNotEmpty(resultContacts);
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

        #endregion
    }
}
