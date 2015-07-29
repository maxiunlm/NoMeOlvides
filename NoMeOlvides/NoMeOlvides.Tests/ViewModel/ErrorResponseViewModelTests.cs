using Domain.ViewModel;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.ViewModel
{
    [TestFixture]
    public class ErrorResponseViewModelTests
    {
        private ErrorResponseViewModel sut;

        private const int oneItemCount = 1;
        private const int twoItemsCount = 2; 
        private const int firstItemIndex = 0;
        private const int secondItemIndex = 1;
        private const string message1 = "message 1";
        private const string message2 = "message 2";
        private readonly List<string> messagesNulled = null;
        private readonly List<string> messagesX0 = new List<string>();
        private readonly List<string> messagesX1 = new List<string> { message1 };
        private readonly List<string> messagesX2 = new List<string> { message1, message2 };

        [SetUp]
        public void SetUp()
        {
            sut = new ErrorResponseViewModel();
        }

        #region Messages GET

        [Test]
        public void Messages_GET__SinInicializar_RetornaListaVacia()
        {

            List<string> result = sut.Messages;

            Assert.IsEmpty(result);
        }

        #endregion

        #region Messages SET

        [Test]
        public void Messages_SET__ConListaVacia_RetornaListaVacia()
        {
            sut.Messages = messagesX0;

            List<string> result = sut.Messages;

            Assert.IsEmpty(result);
        }

        [Test]
        public void Messages_SET__ConNulo_RetornaRetornaListaVacia()
        {
            sut.Messages = messagesNulled;

            List<string> result = sut.Messages;

            Assert.IsEmpty(result);
        }

        [Test]
        public void Messages_SET__ConUnItem_RetornaListaConUnItem()
        {
            sut.Messages = messagesX1;

            List<string> result = sut.Messages;

            Assert.AreEqual(oneItemCount, result.Count);
            Assert.AreEqual(message1, result[firstItemIndex]);
        }

        [Test]
        public void Messages_SET__ConDosItems_RetornaListaConDosItems()
        {
            sut.Messages = messagesX2;

            List<string> result = sut.Messages;

            Assert.AreEqual(twoItemsCount, result.Count);
            Assert.AreEqual(message1, result[firstItemIndex]);
            Assert.AreEqual(message2, result[secondItemIndex]);
        }

        #endregion
    }
}
