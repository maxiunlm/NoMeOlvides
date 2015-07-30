using Domain.Resources;
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
            try
            {
                return HostingEnvironment.MapPath("~/").Trim();
            }
            catch (NullReferenceException)
            {
                throw new DevelopedControlledException(Locale.cannotBeNull.Replace("{0}", Locale.appRootFullPath));
            }
        }
    }
}
