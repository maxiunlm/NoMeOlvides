using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Resources;
using System.Web.Hosting;
using System.Web.Http;

namespace NoMeOlvides.WebApis
{
    [Route("WebApi/Translations")]
    public class TranslationsController : ApiController
    {
        public Dictionary<string, string> Get(string lang)
        {
            //string serverFileFullPath = HostingEnvironment.MapPath("~/") + "Resources/GeneralResource." + lang + ".resx";
            string serverFileFullPath = HostingEnvironment.MapPath("~/") + "Resources/Locale." + lang + ".resx";
            ResXResourceReader reader = new ResXResourceReader(serverFileFullPath);
            Dictionary<string, string> resourceObject = new Dictionary<string, string>();

            foreach (DictionaryEntry item in reader)
            {
                resourceObject.Add(item.Key.ToString(), item.Value.ToString());
            }

            return resourceObject;
        }
    }
}