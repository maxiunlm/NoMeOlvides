using Domain.Service;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NoMeOlvides.Controllers
{
    public class ContactController : Controller
    {
        private string contactId;

        public ContactService ContactService { get; set; }

        public ContactController()
        {
            ContactService = new ContactService();
        }

        // GET: Contact
        public ActionResult Index()
        {
            #region SOLO PARA PRUEBAS SIN LOGIN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
#warning ELIMINAR LUEGO DEL LOGIN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            ContactService service = new ContactService();
            ContactViewModel contact = service.GetContactByEmail("maxiunlm@gmail.com");
            contactId = contact.Id;
            #endregion

            IList<ContactViewModel> contacts = ContactService.ListContacts(contactId);

            return View(contacts);
            //return View(new ContactViewModel());
        }
    }
}
