using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;


public class MockData<T>
{
    public T ObjectToMock { get; set; }
    public string MethodToMock { get; set; }
    public object Returns { get; set; }
    public Exception Exception { get; set; }
    public int Invoked { get; set; }
}

public class MiniMock
{
    private static Dictionary<string, object> metadata;
    public static Dictionary<string, object> Metadata
    {
        get
        {
            if (metadata == null)
            {
                metadata = new Dictionary<string, object>();
            }

            return metadata;
        }
    }

    private MiniMock() { }

    public static void Setup<TypeObjectToMock>(object objectToMock, string methodToMock, object returns, Exception exception) where TypeObjectToMock : class
    {
        string method = GetMethod<TypeObjectToMock>(methodToMock);
        MockData<TypeObjectToMock> data = new MockData<TypeObjectToMock>
        {
            ObjectToMock = (TypeObjectToMock)objectToMock,
            MethodToMock = methodToMock,
            Returns = returns,
            Exception = exception,
            Invoked = 0
        };

        if (Metadata.ContainsKey(method))
        {
            Metadata[method] = data;
        }
        else
        {
            Metadata.Add(method, data);
        }
    }

    public static void Setup<T>(object objectToMock, string methodToMock, object returns) where T : class
    {
        MiniMock.Setup<T>(objectToMock, methodToMock, returns, null);
    }

    public static void Setup<T>(object objectToMock, string methodToMock, Exception exception) where T : class
    {
        MiniMock.Setup<T>(objectToMock, methodToMock, null, exception);
    }

    public static void Setup<T>(object objectToMock, string methodToMock) where T : class
    {
        MiniMock.Setup<T>(objectToMock, methodToMock, null, null);
    }

    public static TypeResult GetResult<TypeObjectToMock, TypeResult>(string methodToMock)
    {
        string method = GetMethod<TypeObjectToMock>(methodToMock);

        return (TypeResult)((MockData<TypeObjectToMock>)Metadata[method]).Returns;
    }

    public static object GetResult<TypeObjectToMock>(string methodToMock)
    {
        return GetResult<TypeObjectToMock, object>(methodToMock);
    }

    public static TypeException GetException<TypeObjectToMock, TypeException>(string methodToMock)
    {
        string method = GetMethod<TypeObjectToMock>(methodToMock);

        return (TypeException)(object)((MockData<TypeObjectToMock>)Metadata[method]).Exception;
    }

    public static Exception GetException<TypeObjectToMock>(string methodToMock)
    {
        return GetException<TypeObjectToMock, Exception>(methodToMock);
    }

    public static void VerifiesThrowException<TypeObjectToMock>(string methodToMock)
    {
        string method = GetMethod<TypeObjectToMock>(methodToMock);

        Exception exception = ((MockData<TypeObjectToMock>)Metadata[method]).Exception;
        if (exception != null)
        {
            throw exception;
        }
    }

    public static void MustHaveBeenInvoked<TypeObjectToMock>(string methodToMock, int times)
    {
        string method = GetMethod<TypeObjectToMock>(methodToMock);

        int invokedTimes = ((MockData<TypeObjectToMock>)Metadata[method]).Invoked;
        Assert.IsTrue(invokedTimes == times,
            "El Método '" + method + "' no ha sido llamado '" + times
            + "' veces, fue llamado '" + invokedTimes + "' "
            + (invokedTimes == 1 ? "vez" : "veces") + ".");
    }

    public static void MustHaveBeenInvoked<TypeObjectToMock>(string methodToMock)
    {
        string method = GetMethod<TypeObjectToMock>(methodToMock);

        Assert.IsTrue(((MockData<TypeObjectToMock>)Metadata[method]).Invoked > 0,
            "El Método '" + method + "' no ha sido llamado.");
    }

    public static void IncreaseInvoked<TypeObjectToMock>(string methodToMock)
    {
        string method = GetMethod<TypeObjectToMock>(methodToMock);

        ((MockData<TypeObjectToMock>)Metadata[method]).Invoked++;
    }

    private static string GetMethod<TypeObjectToMock>(string methodToMock)
    {
        return typeof(TypeObjectToMock).ToString() + "." + methodToMock;
    }
}

public sealed class AudioTrack
{
    private IList<string> artistName;
    public IList<string> ArtistName
    {
        get
        {
            return artistName;
        }
        set
        {
            artistName = value;
        }
    }

    public string ArtistsName
    {
        get
        {
            return StringUtil.MergeArtistName(artistName);
        }
    }

    public IStringUtil StringUtil { get; set; }


    public AudioTrack()
    {
        StringUtil = new StringUtil();
    }
}

public interface IStringUtil
{
    string MergeArtistName(IList<string> artists);
}

public sealed class StringUtil : IStringUtil
{
    public static string ArtistNameMerge(IList<string> artists)
    {
        lock (artists)
        {
            StringBuilder artistsUniqueLine = new StringBuilder();

            for (int i = 0; i < artists.Count; i++)
            {
                artistsUniqueLine.Append(artists[i].Replace("&amp;", "&"));
                if (i != artists.Count - 1)
                {
                    artistsUniqueLine.Append(", ");
                }
            }
            return artistsUniqueLine.ToString();
        }
    }
    public string MergeArtistName(IList<string> artists)
    {
        return StringUtil.ArtistNameMerge(artists);
    }
}


public class StringUtilFake : IStringUtil
{
    public bool MergeArtistNameInvoked { get; set; }
    public string MergeArtistNameResult { get; set; }
    public Exception MergeArtistNameException { get; set; }

    public string MergeArtistName(IList<string> artists)
    {
        MiniMock.IncreaseInvoked<StringUtilFake>("MergeArtistName");
        MiniMock.VerifiesThrowException<StringUtilFake>("MergeArtistName");

        return MiniMock.GetResult<StringUtilFake, string>("MergeArtistName");
    }
}

[TestClass]
public class UnitTest1
{
    private AudioTrack sut;
    private IStringUtil stringUtil;

    #region Fixture

    private const string mergeArtistNameResult = "Jan Parez";
    private readonly IList<string> artistName = new List<string> { "Juan", "Perez" };
    private readonly Exception exception = new Exception("My Exception");

    #endregion

    [TestInitialize]
    public void TestInitialize()
    {
        sut = new AudioTrack();
    }

    #region ToString

    [TestMethod]
    public void ToString_SinParametrosNiCargaInicial_RetornaNULL()
    {

        string result = sut.ToString();

        Assert.AreNotEqual(null, result);
        Assert.IsInstanceOfType(result, typeof(string));
    }

    #endregion

    #region ArtistsName

    [TestMethod]
    public void ArtistsName_SinParametros_InvocaMedotoQueArmaElNombre()
    {
        //stringUtil = (StringUtil)A.Fake<IStringUtil>();
        stringUtil = new StringUtilFake();
        MiniMock.Setup<StringUtilFake>(stringUtil, "MergeArtistName", mergeArtistNameResult);
        //A.CallTo(() => stringUtil.MergeArtistName(artistName)).Returns(mergeArtistNameResult);
        sut.StringUtil = stringUtil;
        sut.ArtistName = artistName;

        string result = sut.ArtistsName;

        MiniMock.MustHaveBeenInvoked<StringUtilFake>("MergeArtistName");
        //A.CallTo(() => stringUtil.MergeArtistName(artistName)).MustHaveHappened();
    }


    //[TestMethod]
    //public void ArtistsName_SinParametros_ArmaElNombre()
    //{
    //    //stringUtil = (StringUtil)A.Fake<IStringUtil>();
    //    stringUtil = new StringUtilFake(mergeArtistNameResult, null);
    //    //A.CallTo(() => stringUtil.MergeArtistName(artistName)).Returns(mergeArtistNameResult);
    //    sut.ArtistName = artistName;
    //    sut.StringUtil = stringUtil;

    //    string result = sut.ArtistsName;

    //    Assert.AreEqual(((StringUtilFake)stringUtil).MergeArtistNameResult, result);
    //} 
    [TestMethod]
    public void ArtistsName_SinParametros_ArmaElNombre()
    {
        stringUtil = new StringUtilFake();
        MiniMock.Setup<StringUtilFake>(stringUtil, "MergeArtistName", mergeArtistNameResult);
        sut.ArtistName = artistName;
        sut.StringUtil = stringUtil;

        string result = sut.ArtistsName;

        Assert.AreEqual(MiniMock.GetResult<StringUtilFake>("MergeArtistName"), result);
    }

    [TestMethod]
    public void ArtistsName_SinParametros_InvocaMedotoQueArrojaExcepcion()
    {
        stringUtil = new StringUtilFake();
        MiniMock.Setup<StringUtilFake>(stringUtil, "MergeArtistName", exception);
        sut.ArtistName = artistName;
        sut.StringUtil = stringUtil;

        try
        {
            string result = sut.ArtistsName;
        }
        catch (Exception ex)
        {
            Assert.IsInstanceOfType(ex, typeof(Exception));
        }
    }

    #endregion
}