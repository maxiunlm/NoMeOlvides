using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;
using Domain.Resources;
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
        private Mock<ILog> javascriptErrorLoggerMock;
        private Mock<ILog> javascriptAuditoryLoggerMock;

        #region Fixture
        
        private const string allLevelMessage = "ALL message";
        private const string traceLevelMessage = "TRACE message";
        private const string debugLevelMessage = "DEBUG message";
        private const string infoLevelMessage = "INFO message";
        private const string warmLevelMessage = "WARM message";
        private const string errorLevelMessage = "ERROR message";
        private const string fatalLevelMessage = "FATAL message";
        private const string noneLevelMessage = "NONE message";
        private readonly LogEntry[] dataNulled = null;
        private readonly LogEntry[] dataAllLevel = new LogEntry[] { new LogEntry { Level = "ALL", Message = allLevelMessage } };
        private readonly LogEntry[] dataTraceLevel = new LogEntry[] { new LogEntry { Level = "TRACE", Message = traceLevelMessage } };
        private readonly LogEntry[] dataDebugLevel = new LogEntry[] { new LogEntry { Level = "DEBUG", Message = debugLevelMessage } };
        private readonly LogEntry[] dataInfoLevel = new LogEntry[] { new LogEntry { Level = "INFO", Message = infoLevelMessage } };
        private readonly LogEntry[] dataWarmLevel = new LogEntry[] { new LogEntry { Level = "WARM", Message = warmLevelMessage } };
        private readonly LogEntry[] dataErrorLevel = new LogEntry[] { new LogEntry { Level = "ERROR", Message = errorLevelMessage } };
        private readonly LogEntry[] dataFatalLevel = new LogEntry[] { new LogEntry { Level = "FATAL", Message = fatalLevelMessage } };
        private readonly LogEntry[] dataNoneLevel = new LogEntry[] { new LogEntry { Level = "NONE", Message = noneLevelMessage } };

        #endregion

        [SetUp]
        public void SetUp()
        {
            sut = new Log4javascriptController();
            javascriptErrorLoggerMock = new Mock<ILog>();
            javascriptAuditoryLoggerMock = new Mock<ILog>();

            sut.JavascriptErrorLogger = javascriptErrorLoggerMock.Object;
            sut.JavascriptAuditoryLogger = javascriptAuditoryLoggerMock.Object;
        }

        #region CONSTRUCTOR

        [Test]
        public void Constructor_WithoutParameters_HasAnInstanceOfLoggerForErrors()
        {


            Assert.IsInstanceOf<ILog>(sut.JavascriptErrorLogger);
        }

        [Test]
        public void Constructor_WithoutParameters_HasAnInstanceOfLoggerForAuditory()
        {


            Assert.IsInstanceOf<ILog>(sut.JavascriptAuditoryLogger);
        }

        #endregion

        #region JavascriptErrorLogger [GET]

        [Test]
        public void JavascriptErrorLogger_GET__WithoutPreviousAssignament_ReturnsAnInstanceLogger()
        {


            Assert.IsInstanceOf<ILog>(sut.JavascriptErrorLogger);
        }

        #endregion

        #region JavascriptErrorLogger [SET]

        [Test]
        public void JavascriptErrorLogger_GET__WithoutANullAssignament_ReturnsAnInstanceLogger()
        {
            sut.JavascriptErrorLogger = null;


            Assert.IsInstanceOf<ILog>(sut.JavascriptErrorLogger);
        }

        [Test]
        public void JavascriptErrorLogger_GET__WithoutACorrectAssignament_ReturnsAnInstanceLogger()
        {
            sut.JavascriptErrorLogger = LogManager.GetLogger("log4javascript");


            Assert.IsInstanceOf<ILog>(sut.JavascriptErrorLogger);
        }

        #endregion

        #region JavascriptAuditoryLogger [GET]

        [Test]
        public void JavascriptAuditoryLogger_GET__WithoutPreviousAssignament_ReturnsAnInstanceLogger()
        {


            Assert.IsInstanceOf<ILog>(sut.JavascriptAuditoryLogger);
        }

        #endregion

        #region JavascriptAuditoryLogger [SET]

        [Test]
        public void JavascriptAuditoryLogger_GET__WithANullAssignament_ReturnsAnInstanceLogger()
        {
            sut.JavascriptAuditoryLogger = null;


            Assert.IsInstanceOf<ILog>(sut.JavascriptAuditoryLogger);
        }

        [Test]
        public void JavascriptAuditoryLogger_GET__WithACorrectAssignament_ReturnsAnInstanceLogger()
        {
            sut.JavascriptAuditoryLogger = LogManager.GetLogger("log4javascript");


            Assert.IsInstanceOf<ILog>(sut.JavascriptAuditoryLogger);
        }

        #endregion

        #region Write

        [Test]
        public void Write_WithAnAllLevelLogMessage_InvokesAnInfoMethodOfLogger()
        {
            javascriptAuditoryLoggerMock.Setup(o => o.Info(dataAllLevel));

            sut.Write(dataAllLevel);

            javascriptAuditoryLoggerMock.Verify(o => o.Info(dataAllLevel));
        }
        
        [Test]
        public void Write_WithAnAllLevelLogMessage_InvokesAnErrorMethodOfLogger()
        {
            javascriptErrorLoggerMock.Setup(o => o.Error(dataAllLevel));

            sut.Write(dataAllLevel);

            javascriptErrorLoggerMock.Setup(o => o.Error(dataAllLevel));
        }

        [Test]
        public void Write_WithATraceLevelLogMessage_InvokesWarmMethodOfLogger()
        {
            javascriptAuditoryLoggerMock.Setup(o => o.Debug(dataTraceLevel));

            sut.Write(dataTraceLevel);

            javascriptAuditoryLoggerMock.Verify(o => o.Debug(dataTraceLevel));
        }

        [Test]
        public void Write_WithADebugLevelLogMessage_InvokesWarmMethodOfLogger()
        {
            javascriptAuditoryLoggerMock.Setup(o => o.Debug(dataDebugLevel));

            sut.Write(dataDebugLevel);

            javascriptAuditoryLoggerMock.Verify(o => o.Debug(dataDebugLevel));
        }

        [Test]
        public void Write_WithAnInfoLevelLogMessage_InvokesInfoMethodOfLogger()
        {
            javascriptAuditoryLoggerMock.Setup(o => o.Info(dataInfoLevel));

            sut.Write(dataInfoLevel);

            javascriptAuditoryLoggerMock.Verify(o => o.Info(dataInfoLevel));
        }

        [Test]
        public void Write_WithAWarmLevelLogMessage_InvokesWarmMethodOfLogger()
        {
            javascriptErrorLoggerMock.Setup(o => o.Warn(dataWarmLevel));

            sut.Write(dataWarmLevel);

            javascriptErrorLoggerMock.Verify(o => o.Warn(dataWarmLevel));
        }

        [Test]
        public void Write_WithAnErrorLevelLogMessage_InvokesErrorMethodOfLogger()
        {
            javascriptErrorLoggerMock.Setup(o => o.Error(dataErrorLevel));

            sut.Write(dataErrorLevel);

            javascriptErrorLoggerMock.Verify(o => o.Error(dataErrorLevel));
        }

        [Test]
        public void Write_WithAFatalLevelLogMessage_InvokesFatalMethodOfLogger()
        {
            javascriptErrorLoggerMock.Setup(o => o.Fatal(dataFatalLevel));

            sut.Write(dataFatalLevel);

            javascriptErrorLoggerMock.Verify(o => o.Fatal(dataFatalLevel));
        }

        [Test]
        public void Write_WithANoneLevelLogMessage_InvokesErrorMethodOfLogger()
        {
            javascriptErrorLoggerMock.Setup(o => o.Error(dataNoneLevel));

            sut.Write(dataNoneLevel);

            javascriptErrorLoggerMock.Verify(o => o.Error(dataNoneLevel));
        }

        [Test]
        public void Write_WithANulledMessage_InvokesErrorMethodOfLogger()
        {
            javascriptErrorLoggerMock.Setup(o => o.Error(Locale.log4JavascriptNullMessage));

            sut.Write(dataNulled);

            javascriptErrorLoggerMock.Verify(o => o.Error(Locale.log4JavascriptNullMessage));
        }

        #endregion
    }
}
