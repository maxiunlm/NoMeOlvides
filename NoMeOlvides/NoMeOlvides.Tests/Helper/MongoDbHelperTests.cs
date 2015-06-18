using Domain.Data;
using Domain.Hepler;
using MongoDB.Bson;
using MongoDB.Driver;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.Helper
{
    [TestFixture]
    public class MongoDbHelperTests
    {
        private MongoDbHelper sut;

        private static readonly ContactData contactData = new ContactData();
        private readonly MongoCollection collection = contactData.MongoDatabase.GetCollection("system.indexes");

        [SetUp]
        public void SetUp()
        {
            sut = new MongoDbHelper();
        }

        #region GenerateNewId

        [Test]
        public void GenerateNewId_SinParametros_RetornaUnNuevoObjectId()
        {
            
            ObjectId result = sut.GenerateNewId();

            Assert.IsNotNull(result);
        }

        #endregion

        #region GetIQueryableFromMongoCollection

        [Test]
        public void GetIQueryableFromMongoCollection_ConUnaMongoCollection_RetornaUnIQueryable()
        {

            IQueryable result = sut.GetIQueryableFromMongoCollection<object>(collection);

            Assert.IsNotNull(result);
        }

        #endregion
    }
}
