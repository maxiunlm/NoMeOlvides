using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Log4Javascript.Web.Models;

namespace Pruebas.Controllers
{
    public class log4javascriptController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(string log)
        {
            return "value";
        }

        //////// POST api/<controller>
        //////public void Post([FromBody]string value)
        //////{
        //////}

        public void Write(LogEntry[] data)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}