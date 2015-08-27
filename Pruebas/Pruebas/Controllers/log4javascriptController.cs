using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using Log4Javascript.Web.Models;
using log4net;
using log4net.Core;
using Newtonsoft.Json;

namespace Pruebas.Controllers
{
    public class log4javascriptController : ApiController
    {
        private static ILog logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        private static ILog javascriptLogger = LogManager.GetLogger("log4javascript");
        
        //////// POST api/<controller>
        public void Write(LogEntry[] data)
        {
            if(data != null)
            {
                javascriptLogger.Debug(JsonConvert.SerializeObject(data));
            }
        }
    }
}