using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;
using Domain.Resources;
using Domain.ViewModel;
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
        private Mock<ILog> ErrorLoggerMock;
        private Mock<ILog> AuditoryLoggerMock;

        #region Fixture

        private const int firstIndex = 0;
        private const int secondIndex = 1;
        private const string allLevelMessage = "ALL message";
        private const string traceLevelMessage = "TRACE message";
        private const string debugLevelMessage = "DEBUG message";
        private const string infoLevelMessage = "INFO message";
        private const string warmLevelMessage = "WARM message";
        private const string errorLevelMessage = "ERROR message";
        private const string fatalLevelMessage = "FATAL message";
        private const string noneLevelMessage = "NONE message";
        private readonly LogEntryViewModel[] dataNulled = null;
        private readonly LogEntryViewModel[] dataAllLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "ALL", Message = allLevelMessage } };
        private readonly LogEntryViewModel[] dataTraceLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "TRACE", Message = traceLevelMessage } };
        private readonly LogEntryViewModel[] dataDebugLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "DEBUG", Message = debugLevelMessage } };
        private readonly LogEntryViewModel[] dataInfoLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "INFO", Message = infoLevelMessage } };
        private readonly LogEntryViewModel[] dataWarmLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "WARM", Message = warmLevelMessage } };
        private readonly LogEntryViewModel[] dataErrorLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "ERROR", Message = errorLevelMessage } };
        private readonly LogEntryViewModel[] dataFatalLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "FATAL", Message = fatalLevelMessage } };
        private readonly LogEntryViewModel[] dataNoneLevel = new LogEntryViewModel[] { new LogEntryViewModel { Level = "NONE", Message = noneLevelMessage } };
        private LogEntryViewModel[] dataMessagesX1 = new LogEntryViewModel[] { new LogEntryViewModel { Level = "ALL", Message = allLevelMessage } };
        private LogEntryViewModel[] dataMessagesX2 = new LogEntryViewModel[] { 
            new LogEntryViewModel { Level = "ALL", Message = allLevelMessage },
            new LogEntryViewModel { Level = "NONE", Message = noneLevelMessage },
        };

        #endregion

        [SetUp]
        public void SetUp()
        {
            sut = new Log4javascriptController();
            ErrorLoggerMock = new Mock<ILog>();
            AuditoryLoggerMock = new Mock<ILog>();
            dataAllLevel[firstIndex].MessageLogType = MessageLogType.ServerSide;
            dataMessagesX1[firstIndex].MessageLogType = MessageLogType.ServerSide;
            dataMessagesX2[secondIndex].MessageLogType = MessageLogType.ServerSide;

            sut.ErrorLogger = ErrorLoggerMock.Object;
            sut.AuditoryLogger = AuditoryLoggerMock.Object;
        }

        #region CONSTRUCTOR

        [Test]
        public void Constructor_WithoutParameters_HasAnInstanceOfLoggerForErrors()
        {


            Assert.IsInstanceOf<ILog>(sut.ErrorLogger);
        }

        [Test]
        public void Constructor_WithoutParameters_HasAnInstanceOfLoggerForAuditory()
        {


            Assert.IsInstanceOf<ILog>(sut.AuditoryLogger);
        }

        #endregion

        #region ErrorLogger [GET]

        [Test]
        public void ErrorLogger_GET__WithoutPreviousAssignament_ReturnsAnInstanceLogger()
        {


            Assert.IsInstanceOf<ILog>(sut.ErrorLogger);
        }

        #endregion

        #region ErrorLogger [SET]

        [Test]
        public void ErrorLogger_GET__WithoutANullAssignament_ReturnsAnInstanceLogger()
        {
            sut.ErrorLogger = null;


            Assert.IsInstanceOf<ILog>(sut.ErrorLogger);
        }

        [Test]
        public void ErrorLogger_GET__WithoutACorrectAssignament_ReturnsAnInstanceLogger()
        {
            sut.ErrorLogger = LogManager.GetLogger("log4javascript");


            Assert.IsInstanceOf<ILog>(sut.ErrorLogger);
        }

        #endregion

        #region AuditoryLogger [GET]

        [Test]
        public void AuditoryLogger_GET__WithoutPreviousAssignament_ReturnsAnInstanceLogger()
        {


            Assert.IsInstanceOf<ILog>(sut.AuditoryLogger);
        }

        #endregion

        #region AuditoryLogger [SET]

        [Test]
        public void AuditoryLogger_GET__WithANullAssignament_ReturnsAnInstanceLogger()
        {
            sut.AuditoryLogger = null;


            Assert.IsInstanceOf<ILog>(sut.AuditoryLogger);
        }

        [Test]
        public void AuditoryLogger_GET__WithACorrectAssignament_ReturnsAnInstanceLogger()
        {
            sut.AuditoryLogger = LogManager.GetLogger("log4javascript");


            Assert.IsInstanceOf<ILog>(sut.AuditoryLogger);
        }

        #endregion

        #region Write

        [Test]
        public void Write_WithAnAllLevelLogMessage_InvokesAnInfoMethodOfLogger()
        {
            AuditoryLoggerMock.Setup(o => o.Info(dataAllLevel));

            sut.Write(dataAllLevel);

            AuditoryLoggerMock.Verify(o => o.Info(dataAllLevel));
        }
        
        [Test]
        public void Write_WithAnAllLevelLogMessage_InvokesAnErrorMethodOfLogger()
        {
            ErrorLoggerMock.Setup(o => o.Error(dataAllLevel));

            sut.Write(dataAllLevel);

            ErrorLoggerMock.Setup(o => o.Error(dataAllLevel));
        }

        [Test]
        public void Write_WithATraceLevelLogMessage_InvokesWarmMethodOfLogger()
        {
            AuditoryLoggerMock.Setup(o => o.Debug(dataTraceLevel));

            sut.Write(dataTraceLevel);

            AuditoryLoggerMock.Verify(o => o.Debug(dataTraceLevel));
        }

        [Test]
        public void Write_WithADebugLevelLogMessage_InvokesWarmMethodOfLogger()
        {
            AuditoryLoggerMock.Setup(o => o.Debug(dataDebugLevel));

            sut.Write(dataDebugLevel);

            AuditoryLoggerMock.Verify(o => o.Debug(dataDebugLevel));
        }

        [Test]
        public void Write_WithAnInfoLevelLogMessage_InvokesInfoMethodOfLogger()
        {
            AuditoryLoggerMock.Setup(o => o.Info(dataInfoLevel));

            sut.Write(dataInfoLevel);

            AuditoryLoggerMock.Verify(o => o.Info(dataInfoLevel));
        }

        [Test]
        public void Write_WithAWarmLevelLogMessage_InvokesWarmMethodOfLogger()
        {
            ErrorLoggerMock.Setup(o => o.Warn(dataWarmLevel));

            sut.Write(dataWarmLevel);

            ErrorLoggerMock.Verify(o => o.Warn(dataWarmLevel));
        }

        [Test]
        public void Write_WithAnErrorLevelLogMessage_InvokesErrorMethodOfLogger()
        {
            ErrorLoggerMock.Setup(o => o.Error(dataErrorLevel));

            sut.Write(dataErrorLevel);

            ErrorLoggerMock.Verify(o => o.Error(dataErrorLevel));
        }

        [Test]
        public void Write_WithAFatalLevelLogMessage_InvokesFatalMethodOfLogger()
        {
            ErrorLoggerMock.Setup(o => o.Fatal(dataFatalLevel));

            sut.Write(dataFatalLevel);

            ErrorLoggerMock.Verify(o => o.Fatal(dataFatalLevel));
        }

        [Test]
        public void Write_WithANoneLevelLogMessage_InvokesErrorMethodOfLogger()
        {
            ErrorLoggerMock.Setup(o => o.Error(dataNoneLevel));

            sut.Write(dataNoneLevel);

            ErrorLoggerMock.Verify(o => o.Error(dataNoneLevel));
        }

        [Test]
        public void Write_WithANulledMessage_InvokesErrorMethodOfLogger()
        {
            ErrorLoggerMock.Setup(o => o.Error(Locale.log4JavascriptNullMessage));

            sut.Write(dataNulled);

            ErrorLoggerMock.Verify(o => o.Error(Locale.log4JavascriptNullMessage));
        }

        [Test]
        public void Write_WithOneMessage_SetMessageLogTypeToClientSideValue()
        {
            AuditoryLoggerMock.Setup(o => o.Info(dataMessagesX1));

            sut.Write(dataMessagesX1);

            Assert.AreEqual(MessageLogType.ClientSide, dataMessagesX1[firstIndex].MessageLogType);
        }

        [Test]
        public void Write_WithTwoMessages_SetAllMessageLogTypesToClientSideValue()
        {
            AuditoryLoggerMock.Setup(o => o.Info(dataMessagesX2));

            sut.Write(dataMessagesX2);

            Assert.AreEqual(MessageLogType.ClientSide, dataMessagesX2[firstIndex].MessageLogType);
            Assert.AreEqual(MessageLogType.ClientSide, dataMessagesX2[secondIndex].MessageLogType);
        }

        #endregion
    }
}
