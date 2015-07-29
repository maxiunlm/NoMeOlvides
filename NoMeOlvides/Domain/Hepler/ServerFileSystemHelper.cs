using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace Domain.Hepler
{
    public class ServerFileSystemHelper
    {
        public virtual string GetAppRootFullPath()
        {
            return HostingEnvironment.MapPath("~/"); // TODO: FALTA TDD !!! COMO????
        }
    }
}
