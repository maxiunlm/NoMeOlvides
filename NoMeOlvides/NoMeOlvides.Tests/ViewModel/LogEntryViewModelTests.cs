using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.ViewModel;
using Log4Javascript.Web.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace NoMeOlvides.Tests.ViewModel
{
    [TestClass]
    public class LogEntryViewModelTests
    {
        private LogEntryViewModel sut;

        [TestInitialize]
        public void SetUp()
        {
            sut = new LogEntryViewModel();
        }

        #region CONSTRUCTOR

        [TestMethod]
        public void LogEntryViewModel_WithoutParameters_InheritFromLogEntryClass()
        {


            // N U N I T
            //////Assert.IsInstanceOf<LogEntry>(sut);
            Assert.IsInstanceOfType(sut, typeof(LogEntry));
        }

        #endregion

        #region MessageLogType GET

        [TestMethod]
        public void MessageLogType_GET__Uninitialized_ReturnsServerSideValue()
        {

            MessageLogType result = sut.MessageLogType;

            Assert.AreEqual(MessageLogType.ServerSide, result);
        }

        #endregion

        #region MessageLogType SET

        [TestMethod]
        public void MessageLogType_SET__WithServerSide_ReturnsServerSideValue()
        {
            sut.MessageLogType = MessageLogType.ServerSide;

            MessageLogType result = sut.MessageLogType;

            Assert.AreEqual(MessageLogType.ServerSide, result);
        }

        [TestMethod]
        public void MessageLogType_SET__WithClientSide_ReturnsClientSideValue()
        {
            sut.MessageLogType = MessageLogType.ClientSide;

            MessageLogType result = sut.MessageLogType;

            Assert.AreEqual(MessageLogType.ClientSide, result);
        }

        #endregion
    }
}
