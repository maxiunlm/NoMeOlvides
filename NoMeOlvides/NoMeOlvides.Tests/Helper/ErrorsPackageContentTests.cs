using Domain.Hepler;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.Helper
{
    [TestFixture]
    public class ErrorsPackageContentTests
    {
        private ErrorsPackageContent sut;

        private const int emptyElementsCount = 0;
        private const string message1 = "message1";
        private const string message2 = "message2";
        private readonly IList<string> emptyList = new List<string>();
        private readonly IList<string> listX1 = new List<string> { message1 };
        private readonly IList<string> listX2 = new List<string> { message1, message2 };

        [SetUp]
        public void SetUp()
        {
            sut = new ErrorsPackageContent();
        }

        #region HasError [GET]

        [Test]
        public void HasError_GET__WithoutPreviousAssignament_ReturnsFalse()
        {


            Assert.IsFalse(sut.HasError);
        }

        #endregion

        #region HasError [SET]

        [Test]
        public void HasError_SET__WithFalseValue_ReturnsFalse()
        {

            sut.HasError = false;

            Assert.IsFalse(sut.HasError);
        }

        [Test]
        public void HasError_SET__WithTrueValue_ReturnsTrue()
        {

            sut.HasError = true;

            Assert.IsTrue(sut.HasError);
        }

        #endregion

        #region Messages [GET]

        [Test]
        public void Messages_GET__WithoutAssignament_ReturnsEmptyErrorList()
        {


            Assert.IsNotNull(sut.Messages);
            Assert.AreEqual(emptyElementsCount, sut.Messages.Count);
        }

        #endregion

        #region Messages [SET]

        [Test]
        public void Messages_SET__WithNull_ReturnsEmptyErrorList()
        {

            sut.Messages = null;

            Assert.IsNotNull(sut.Messages);
            Assert.AreEqual(emptyElementsCount, sut.Messages.Count);
        }

        [Test]
        public void Messages_SET__WithAnEmptyList_ReturnsTheSameList()
        {

            sut.Messages = emptyList;

            Assert.AreSame(emptyList, sut.Messages);
        }

        [Test]
        public void Messages_SET__WithOneElementList_ReturnsTheSameList()
        {

            sut.Messages = listX1;
            
            Assert.AreSame(listX1, sut.Messages);
        }

        [Test]
        public void Messages_SET__WithTwoElementsList_ReturnsTheSameList()
        {

            sut.Messages = listX2;

            Assert.AreSame(listX2, sut.Messages);
        }

        #endregion
    }
}
