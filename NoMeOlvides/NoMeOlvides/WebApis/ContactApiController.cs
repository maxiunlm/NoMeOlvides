using Domain.Service;
using Domain.ViewModel;
using NoMeOlvides.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace NoMeOlvides.WebApis
{
    public class ContactApiController : ApiController
    {
        public ContactService Service { internal get; set; }

        public ContactApiController()
        {
            Service = new ContactService();
        }

        // GET api/<controller>
        public IEnumerable<ContactViewModel> Get()
        {
            return new ContactViewModel[] { new ContactViewModel { Id = "1", Email = "a@a.com"} };
        }

        // GET api/<controller>/5
        public ContactViewModel Get(string id)
        {
            return Service.GetContactById(id);
        }

        [NonAction]
        internal ContactViewModel GetByEmail(string email)
        {
            return Service.GetContactByEmail(email);
        }

        // POST api/<controller>
        public void Post(ContactViewModel contact)
        {
            Service.SaveContact(contact);
        }

        // PUT api/<controller>/5
        public void Put(ContactViewModel contact)
        {
            Service.SaveContact(contact);
        }

        // DELETE api/<controller>/5
        public void Delete(string id)
        {
            Service.Delete(id);
        }
    }
}