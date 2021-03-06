﻿using Domain.Hepler;
using Moq;
using Domain.Resources;
using NoMeOlvides.WebApis;
using Microsoft.VisualStudio.TestTools.UnitTesting;
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
    [TestClass]
    public class TranslationsApiControllerTests
    {
        private TranslationsApiController sut;
        private Mock<ServerFileSystemHelper> serverFileSystemHelperMocker;

        #region Fixture

        private const string nullLanguage = null;
        private const int emptyItemsCount = 0;
        private const string emptyLanguage = "";
        private const string wrongLanguage = "wrong";
        private const string existentLanguage = "es";
        private const string existentLanguageWithWhiteSpaces = " es ";
        private readonly string partialResourcesPath = ConfigurationManager.AppSettings["PartialResourcesPath"];

        #endregion

        [TestInitialize]
        public void SetUp()
        {
            sut = new TranslationsApiController();
            serverFileSystemHelperMocker = new Mock<ServerFileSystemHelper>();

            Thread.CurrentThread.CurrentCulture = new CultureInfo("en");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("en");

            sut.ServerFileSystemHelper = serverFileSystemHelperMocker.Object;
        }

        #region TranslationsApiController CONSTRUCTOR

        [TestMethod]
        public void TranslationsApiController_WithoutParams_InitializeServerFileSystemHelper()
        {

            sut = new TranslationsApiController();

            Assert.IsNotNull(sut.ServerFileSystemHelper);
        }

        #endregion

        #region Get

        [TestMethod]
        public void Get_WithNullLanguage_ThrowsDeveloperControlledException()
        {

            //////Exception result = Assert.Catch(() => sut.Get(nullLanguage));
            // N U N I T
            //////Assert.IsInstanceOf<DevelopedControlledException>(result);
            //////Assert.AreEqual(Locale.nonexistentLanguage, result.Message);
            try
            {
                sut.Get(nullLanguage);
            }
            catch (Exception result)
            {
                Assert.IsInstanceOfType(result, typeof(DevelopedControlledException));
                Assert.AreEqual(Locale.nonexistentLanguage, result.Message);
            }
        }

        [TestMethod]
        public void Get_WithWrongLanguage_ThrowsDeveloperControlledException()
        {
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            //////Exception result = Assert.Catch(() => sut.Get(wrongLanguage));
            // N U N I T
            //////Assert.IsInstanceOf<DevelopedControlledException>(result);
            //////Assert.AreEqual(Locale.nonexistentLanguage, result.Message);
            try
            {
                sut.Get(wrongLanguage);
            }
            catch (Exception result)
            {
                Assert.IsInstanceOfType(result, typeof(DevelopedControlledException));
                Assert.AreEqual(Locale.nonexistentLanguage, result.Message);
            }
        }

        [TestMethod]
        public void Get_WidthEmptyLanguage_ReturnsDefaultJsonDictionaryResource()
        {
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(emptyLanguage);

            Assert.AreNotEqual(emptyItemsCount, result.Count);
            Assert.AreEqual(Locale.nonexistentLanguage, result["nonexistentLanguage"]);
            Assert.IsTrue(sut.LanguageFileFullPath.IndexOf(partialResourcesPath + "resx") >= 0);
        }

        [TestMethod]
        public void Get_WithExistentLanguage_InvokesMethodThatReturnsTheRootPathApplication()
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("es");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("es");
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(existentLanguage);

            serverFileSystemHelperMocker.Verify(o => o.GetAppRootFullPath());
        }

        [TestMethod]
        public void Get_WithExistentLanguage_ReturnsCorrectJsonDictionaryResource()
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("es");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("es");
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(existentLanguage);

            Assert.AreNotEqual(emptyItemsCount, result.Count);
            Assert.AreEqual(Locale.nonexistentLanguage, result["nonexistentLanguage"]);
            Assert.AreEqual(ConfigurationManager.AppSettings["AppRootFullPath"] + partialResourcesPath + existentLanguage + ".resx", sut.LanguageFileFullPath);
        }

        [TestMethod]
        public void Get_WithExistentLanguageWithWhiteSpaces_ReturnsCorrectJsonDictionaryResource()
        {
            Thread.CurrentThread.CurrentCulture = new CultureInfo("es");
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("es");
            serverFileSystemHelperMocker.Setup(o => o.GetAppRootFullPath()).Returns(ConfigurationManager.AppSettings["AppRootFullPath"]);

            Dictionary<string, string> result = sut.Get(existentLanguageWithWhiteSpaces);

            Assert.AreNotEqual(emptyItemsCount, result.Count);
            Assert.AreEqual(Locale.nonexistentLanguage, result["nonexistentLanguage"]);
            Assert.AreEqual(ConfigurationManager.AppSettings["AppRootFullPath"] + partialResourcesPath + existentLanguageWithWhiteSpaces.Trim() + ".resx", sut.LanguageFileFullPath);
        }

        #endregion
    }
}
