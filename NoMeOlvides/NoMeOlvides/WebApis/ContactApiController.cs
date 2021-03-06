﻿using Domain.Service;
using Domain.ViewModel;
using NoMeOlvides.Controllers;
using Domain.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Resources;
using System.Web.Hosting;
using System.Web.Http;

namespace NoMeOlvides.WebApis
{
    [Route("WebApi/ContactApi")]
    public class ContactApiController : ApiController
    {
        public ContactService Service { internal get; set; }

        public ContactApiController()
        {
            Service = new ContactService();
        }

        // GET api/<controller>
        public IEnumerable<ContactViewModel> Get(ContactViewModel search)
        {
            return Service.Search(search);
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
        public HttpResponseMessage Post(ContactViewModel contact)
        {
            try
            {
                ContactViewModel result = new ContactViewModel();
                result.Id = Service.SaveContact(contact);

                HttpResponseMessage respose = new HttpResponseMessage(HttpStatusCode.OK);
                respose.Content = new StringContent(System.Web.Helpers.Json.Encode(result));
                return respose;
            }
            catch (Exception)
            {
                HttpResponseMessage respose = new HttpResponseMessage(HttpStatusCode.NotFound);
                ErrorResponseViewModel error = new ErrorResponseViewModel();
                //error.Messages.Add(ex.Message);
                error.Errors.Messages.Add(Locale.generalErrorMessage);
                respose.Content = new StringContent(System.Web.Helpers.Json.Encode(error));

                throw new HttpResponseException(respose);
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