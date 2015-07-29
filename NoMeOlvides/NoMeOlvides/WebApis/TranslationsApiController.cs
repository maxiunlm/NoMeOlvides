using Domain.Hepler;
using Newtonsoft.Json.Linq;
using NoMeOlvides.Resources;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Resources;
using System.Web.Hosting;
using System.Web.Http;

namespace NoMeOlvides.WebApis
{
    [Route("WebApi/TranslationsApi")]
    public class TranslationsApiController : ApiController
    {
        public string LanguageFileFullPath { get; private set; }
        public ServerFileSystemHelper ServerFileSystemHelper { get; set; }

        public TranslationsApiController()
        {
            ServerFileSystemHelper = new ServerFileSystemHelper();
        }

        [HttpGet]
        public Dictionary<string, string> Get(string lang)
        {
            try
            {
                return ConvertResxResourcesToJsonResources(lang);
            }
            catch (FileNotFoundException)
            {
                throw new DevelopedControlledException(Locale.nonexistentLanguage);
            }
        }

        private Dictionary<string, string> ConvertResxResourcesToJsonResources(string lang)
        {
            ValidateLanguage(lang);

            ResXResourceReader reader = LoadResxResources(lang.Trim());

            Dictionary<string, string> resourceObject = new Dictionary<string, string>();
            AddResxItemsToJsonDictionary(reader, resourceObject);

            return resourceObject;
        }

        private static void ValidateLanguage(string lang)
        {
            if (lang == null)
            {
                throw new DevelopedControlledException(Locale.nonexistentLanguage);
            }
        }

        private ResXResourceReader LoadResxResources(string lang)
        {
            ChooseCorrectLanguage(lang);
            ResXResourceReader reader = new ResXResourceReader(LanguageFileFullPath);

            return reader;
        }

        private void ChooseCorrectLanguage(string lang)
        {
            string fileBasePath = ServerFileSystemHelper.GetAppRootFullPath() + "Resources/Locale.";

            if (lang == string.Empty)
            {
                LanguageFileFullPath = fileBasePath + "resx";
                return;
            }

            LanguageFileFullPath = fileBasePath +  lang + ".resx";
        }

        private void AddResxItemsToJsonDictionary(ResXResourceReader reader, Dictionary<string, string> resourceObject)
        {
            foreach (DictionaryEntry item in reader)
            {
                resourceObject.Add(item.Key.ToString(), item.Value.ToString());
            }
        }
    }
}