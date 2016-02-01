using Domain.Data;
using Domain.Hepler;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests.Helper
{
    [TestClass]
    public class MongoDbHelperTests
    {
        private MongoDbHelper sut;

        private static readonly ContactData contactData = new ContactData();
        // TODO: Antes no era IMongoCollection<object>... era MongoCollection !!!!!!!!!!!!!!!!!!!!??????????????????
        private readonly IMongoCollection<object> collection = contactData.MongoDatabase.GetCollection<object>("system.indexes");

        [TestInitialize]
        public void SetUp()
        {
            sut = new MongoDbHelper();
        }

        #region GenerateNewId

        [TestMethod]
        public void GenerateNewId_SinParametros_RetornaUnNuevoObjectId()
        {
            
            ObjectId result = sut.GenerateNewId();

            Assert.IsNotNull(result);
        }

        #endregion

        #region GetIQueryableFromMongoCollection

        [TestMethod]
        public void GetIQueryableFromMongoCollection_ConUnaMongoCollection_RetornaUnIQueryable()
        {

            IQueryable result = sut.GetIQueryableFromMongoCollection<object>(collection);

            Assert.IsNotNull(result);
        }

        #endregion
    }
}
