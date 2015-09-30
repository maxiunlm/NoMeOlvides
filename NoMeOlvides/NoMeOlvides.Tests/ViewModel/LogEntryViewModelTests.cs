using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.ViewModel;
using Log4Javascript.Web.Models;
using NUnit.Framework;

namespace NoMeOlvides.Tests.ViewModel
{
    [TestFixture]
    public class LogEntryViewModelTests
    {
        private LogEntryViewModel sut;

        [SetUp]
        public void SetUp()
        {
            sut = new LogEntryViewModel();
        }

        #region CONSTRUCTOR

        [Test]
        public void LogEntryViewModel_WithoutParameters_InheritFromLogEntryClass()
        {


            Assert.IsInstanceOf<LogEntry>(sut);
        }

        #endregion

        #region MessageLogType GET

        [Test]
        public void MessageLogType_GET__Uninitialized_ReturnsServerSideValue()
        {

            MessageLogType result = sut.MessageLogType;

            Assert.AreEqual(MessageLogType.ServerSide, result);
        }

        #endregion

        #region MessageLogType SET

        [Test]
        public void MessageLogType_SET__WithServerSide_ReturnsServerSideValue()
        {
            sut.MessageLogType = MessageLogType.ServerSide;

            MessageLogType result = sut.MessageLogType;

            Assert.AreEqual(MessageLogType.ServerSide, result);
        }

        [Test]
        public void MessageLogType_SET__WithClientSide_ReturnsClientSideValue()
        {
            sut.MessageLogType = MessageLogType.ClientSide;

            MessageLogType result = sut.MessageLogType;

            Assert.AreEqual(MessageLogType.ClientSide, result);
        }

        #endregion
    }
}
