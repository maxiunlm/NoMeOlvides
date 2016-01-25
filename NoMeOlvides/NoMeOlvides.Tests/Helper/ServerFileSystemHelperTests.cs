using Domain.Hepler;
using Domain.Resources;
using Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace NoMeOlvides.Tests.Helper
{
    [TestClass]
    public class ServerFileSystemHelperTests
    {
        private ServerFileSystemHelper sut;

        
        [TestInitialize]
        public void SetUp()
        {
            sut = new ServerFileSystemHelper();
        }

        #region GetAppRootFullPath

        [TestMethod]
        public void GetAppRootFullPath_OutOfWebEnviroment_ThrowsNullReferenceException()
        {

            //////Exception result = Assert.Catch(() => sut.GetAppRootFullPath());
            // N U N I T
            //////Assert.IsInstanceOf<DevelopedControlledException>(result);
            //////Assert.AreEqual(Locale.cannotBeNull.Replace("{0}", Locale.appRootFullPath), result.Message);
            try
            {
                sut.GetAppRootFullPath();
            }
            catch (Exception result)
            {
                Assert.IsInstanceOfType(result, typeof(DevelopedControlledException));
                Assert.AreEqual(Locale.cannotBeNull.Replace("{0}", Locale.appRootFullPath), result.Message);
            }
        }

        #endregion
    }
}
