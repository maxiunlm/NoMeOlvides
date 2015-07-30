using Domain.Hepler;
using Domain.Resources;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Hosting;

namespace NoMeOlvides.Tests.Helper
{
    [TestFixture]
    public class ServerFileSystemHelperTests
    {
        private ServerFileSystemHelper sut;

        
        [SetUp]
        public void SetUp()
        {
            sut = new ServerFileSystemHelper();
        }

        #region GetAppRootFullPath

        [Test]
        public void GetAppRootFullPath_OutOfWebEnviroment_ThrowsNullReferenceException()
        {

            Exception result = Assert.Catch(() => sut.GetAppRootFullPath());

            Assert.IsInstanceOf<DevelopedControlledException>(result);
            Assert.AreEqual(Locale.cannotBeNull.Replace("{0}", Locale.appRootFullPath), result.Message);
        }

        #endregion
    }
}
