using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoMeOlvides.Tests
{
    /// <summary>
    /// http://thoai-nguyen.blogspot.com.ar/2012/06/how-i-mock-mongo-collection.html
    /// VER Nsustitute vs Moq
    /// http://programmaticallyspeaking.com/nsubstitute-vs-moq-a-quick-comparison.html
    /// </summary>
    public static class MongoTestHelpers
    {
        private static readonly MongoServerSettings ServerSettings;
        private static readonly MongoServer Server;
        private static readonly MongoDatabaseSettings DatabaseSettings;
        private static readonly MongoDatabase Database;

        static MongoTestHelpers()
        {
            ServerSettings = new MongoServerSettings
            {
                Servers = new List<MongoServerAddress>
            {
                new MongoServerAddress("unittest")
            }
            };
            Server = new MongoServer(ServerSettings);
            DatabaseSettings = new MongoDatabaseSettings("databaseName", new MongoCredentials("", ""), GuidRepresentation.Standard, SafeMode.True, true);
            Database = new MongoDatabase(Server, DatabaseSettings);
        }

        /// <summary>
        /// Creates a mock of mongo collection
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        /// <remarks></remarks>
        public static MongoCollection<T> CreateMockCollection<T>()
        {
            var collectionSetting = new MongoCollectionSettings<T>(Database, typeof(T).Name);
            var mocker = new Mock<MongoCollection<T>>(Database, collectionSetting);
            mocker.SetupGet(o => o.Database).Returns(Database);
            mocker.SetupGet(o => o.Settings).Returns(collectionSetting);
            return mocker.Object;
        }

        public static MongoCollection<T> ReturnsCollection<T>(this MongoCollection<T> collection, IEnumerable<T> enumerable)
        {
            var cursor = new Mock<MongoCursor<T>>(collection, new Mock<IMongoQuery>());
            cursor.Setup(o => o.GetEnumerator()).Returns(enumerable.GetEnumerator());
            cursor.When(x => x.GetEnumerator())
                  .Do(callInfo => enumerable.GetEnumerator().Reset());// Reset Enumerator, incase the method is called multiple times

            cursor.SetSortOrder(Arg.Any<IMongoSortBy>()).Returns(cursor);
            cursor.SetLimit(Arg.Any<int>()).Returns(cursor);
            cursor.SetFields(Arg.Any<IMongoFields>()).Returns(cursor);
            cursor.SetFields(Arg.Any<string[]>()).Returns(cursor);
            cursor.SetFields(Arg.Any<string>()).Returns(cursor);
            cursor.SetSkip(Arg.Any<int>()).Returns(cursor);

            collection.Find(Arg.Any<IMongoQuery>()).Returns(cursor);
            collection.FindAs<T>(Arg.Any<IMongoQuery>()).Returns(cursor);
            collection.FindAll().Returns(cursor);
            // You properly need to setup more methods of cursor here

            return collection;
        }
    }
}