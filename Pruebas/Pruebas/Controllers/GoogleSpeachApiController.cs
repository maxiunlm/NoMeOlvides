using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Pruebas.Controllers
{
    public class GoogleSpeachApiController : Controller
    {
        // GET: GoogleSpeachApi
        public ActionResult Index()
        {
            WebRequest request = WebRequest.Create(
                 "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=8&q=http%3A%2F%2Fnews.google.com%2Fnews%3Foutput%3Drss%26pz%3D1%26ned%3Den_us%26hl%3Den%26sort%3Dnewest");
            //request.Credentials = CredentialCache.DefaultCredentials;
            WebResponse response = request.GetResponse();
            Stream dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();
            ViewBag.GoogleNews = responseFromServer;
            return View();
        }
    }
}