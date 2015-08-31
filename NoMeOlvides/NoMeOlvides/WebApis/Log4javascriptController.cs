using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using log4net;

namespace NoMeOlvides.WebApis
{
    public class Log4javascriptController : ApiController
    {
        private const int firstMessage = 0;
        private ILog javascriptLogger;
        public ILog JavascriptLogger
        {
            get
            {
                if (javascriptLogger == null)
                {
                    javascriptLogger = LogManager.GetLogger("log4javascript");
                }

                return javascriptLogger;
            }
            set
            {
                javascriptLogger = value;
            }
        }

        public Log4javascriptController()
        {
        }

        public void Write(Log4Javascript.Web.Models.LogEntry[] dataWarm)
        {
            if(dataWarm[firstMessage].Level == ConfigurationManager.AppSettings["log4JavascriptWarmLevel"])
            {
                JavascriptLogger.Warn(dataWarm);
            }
        }
    }
}