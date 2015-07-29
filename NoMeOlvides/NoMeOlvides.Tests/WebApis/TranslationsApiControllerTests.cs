using Domain.Hepler;
using Moq;
using NoMeOlvides.Resources;
using NoMeOlvides.WebApis;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.WebApis
{
    [TestFixture]
    public class TranslationsApiControllerTests
    {
        private TranslationsApiController sut;
        private Mock<ServerFileSystemHelper> serverFileSystemHelperMocker;

        #region Fixture

        private const string nullLanguage = null;
        private const string emptyLanguage = "";
        private const string wrongLanguage = "wrong";
        private const string existentLanguage = "es";
        private const string existentLanguageWithWhiteSpaces = " es ";

        #endregion

        [SetUp]
        public void SetUp()
        {
            sut = new TranslationsApiController();
            serverFileSystemHelperMocker = new Mock<ServerFileSystemHelper>();

            Thread.CurrentThread.CurrentCulture = new CultureInfo("en");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("en");

            sut.ServerFileSystemHelper = serverFileSystemHelperMocker.Object;
        }

        #region TranslationsApiController CONSTRUCTOR

        [Test]
        public void TranslationsApiController_WithoutParams_InitializeServerFileSystemHelper()
        {

            sut = new TranslationsApiController();

            Assert.IsNotNull(sut.ServerFileSystemHelper);
        }

        #endregion

        #region Get

        [Test]
        public void Get_WithNullLanguage_ThrowsDeveloperControlledException()
        {

            Exception result = Assert.Catch(() => sut.Get(nullLanguage));

            Assert.IsInstanceOf<DevelopedControlledException>(result);
            Assert.AreEqual(Locale.nonexistentLanguage, result.Message);
        }

        [Test]
        public void Get_WithWrongLanguage_ThrowsDeveloperControlledException()
        {

            Exception result = Assert.Catch(() => sut.Get(wrongLanguage));

            Assert.IsInstanceOf<DevelopedControlledException>(result);
            Assert.AreEqual(Locale.nonexistentLanguage, result.Message);
        }

        [Test]
        public void Get_WidthEmptyLanguage_ReturnsDefaultJsonDictionaryResource()
        {
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(emptyLanguage);

            Assert.IsNotEmpty(result);
            Assert.AreEqual(Locale.nonexistentLanguage, result["nonexistentLanguage"]);
            Assert.IsTrue(sut.LanguageFileFullPath.IndexOf("Resources/Locale.resx") >= 0);
        }

        [Test]
        public void Get_WithExistentLanguage_InvokesMethodThatReturnsTheRootPathApplication()
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("es");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("es");
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(existentLanguage);

            serverFileSystemHelperMocker.Verify(o => o.GetAppRootFullPath());
        }

        [Test]
        public void Get_WithExistentLanguage_ReturnsCorrectJsonDictionaryResource()
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("es");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("es");
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(existentLanguage);

            Assert.IsNotEmpty(result);
            Assert.AreEqual(Locale.nonexistentLanguage, result["nonexistentLanguage"]);
            Assert.AreEqual(ConfigurationManager.AppSettings["AppRootFullPath"] + "Resources/Locale." + existentLanguage + ".resx", sut.LanguageFileFullPath);
        }

        [Test]
        public void Get_WithExistentLanguageWithWhiteSpaces_ReturnsCorrectJsonDictionaryResource()
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("es");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("es");
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(existentLanguageWithWhiteSpaces);

            Assert.IsNotEmpty(result);
            Assert.AreEqual(Locale.nonexistentLanguage, result["nonexistentLanguage"]);
            Assert.AreEqual(ConfigurationManager.AppSettings["AppRootFullPath"] + "Resources/Locale." + existentLanguageWithWhiteSpaces.Trim() + ".resx", sut.LanguageFileFullPath);
        }

        #endregion
    }
}
