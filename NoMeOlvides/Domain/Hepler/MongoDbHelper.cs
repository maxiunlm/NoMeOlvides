using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Hepler
{
    public class MongoDbHelper
    {
        public virtual ObjectId GenerateNewId()
        {
            return ObjectId.GenerateNewId();
        }

        public virtual IQueryable<T> GetIQueryableFromMongoCollection<T>(MongoCollection collection)
        {
            return collection.AsQueryable<T>();
        }
    }
}
