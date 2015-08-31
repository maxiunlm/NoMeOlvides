using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Log4Javascript.Web.Models;
using log4net;
using Moq;
using NoMeOlvides.WebApis;
using NUnit.Framework;

namespace NoMeOlvides.Tests.WebApis
{
    [TestFixture]
    public class Log4javascriptControllerTests
    {
        private Log4javascriptController sut;
        private Mock<ILog> javascriptLoggerMock;

        #region Fixture

        private const string warmMessage = "WARM message";
        private readonly LogEntry[] dataWarm = new LogEntry[] { new LogEntry { Level = "WARM", Message = warmMessage } };

        #endregion

        [SetUp]
        public void SetUp()
        {
            sut = new Log4javascriptController();
            javascriptLoggerMock = new Mock<ILog>();

            sut.JavascriptLogger = javascriptLoggerMock.Object;
        }

        #region CONSTRUCTOR

        [Test]
        public void Constructor_WithoutParameters_HasAnInstanceLogger()
        {


            Assert.IsInstanceOf<ILog>(sut.JavascriptLogger);
        }

        #endregion

        #region JavascriptLogger [GET]

        [Test]
        public void JavascriptLogger_GET__WithoutPreviousAssignament_ReturnsAnInstanceLogger()
        {


            Assert.IsInstanceOf<ILog>(sut.JavascriptLogger);
        }

        #endregion

        #region JavascriptLogger [SET]

        [Test]
        public void JavascriptLogger_GET__WithoutANullAssignament_ReturnsAnInstanceLogger()
        {
            sut.JavascriptLogger = null;


            Assert.IsInstanceOf<ILog>(sut.JavascriptLogger);
        }

        [Test]
        public void JavascriptLogger_GET__WithoutACorrectAssignament_ReturnsAnInstanceLogger()
        {
            sut.JavascriptLogger = LogManager.GetLogger("log4javascript");


            Assert.IsInstanceOf<ILog>(sut.JavascriptLogger);
        }

        #endregion

        #region Write

        [Test]
        public void Write_WithALogMessageLevelWarm_InvokesWarmMethodOfLogger()
        {
            javascriptLoggerMock.Setup(o => o.Warn(dataWarm));

            sut.Write(dataWarm);

            javascriptLoggerMock.Verify(o => o.Warn(dataWarm));
        }

        #endregion
    }
}
