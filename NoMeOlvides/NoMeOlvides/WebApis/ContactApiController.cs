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
            try
            {                
                Service.SaveContact(contact);
            }
            catch (Exception ex)
            {
                HttpResponseMessage respose = new HttpResponseMessage(HttpStatusCode.NotFound);
                ErrorResponseViewModel error = new ErrorResponseViewModel();
                error.HasError = true;
                error.Messages.Add("ERROR: " + ex.Message);
                respose.Content = new StringContent(System.Web.Helpers.Json.Encode(error));

                throw new HttpResponseException(respose); ;
            }
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