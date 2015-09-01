using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Resources;
using System.Web.Http;
using Domain.Resources;
using Log4Javascript.Web.Models;
using log4net;

namespace NoMeOlvides.WebApis
{
    public class Log4javascriptController : ApiController
    {
        private ILog javascriptErrorLogger;
        internal ILog JavascriptErrorLogger
        {
            get
            {
                if (javascriptErrorLogger == null)
                {
                    javascriptErrorLogger = LogManager.GetLogger("clientErrorFile");
                }

                return javascriptErrorLogger;
            }
            set
            {
                javascriptErrorLogger = value;
            }
        }

        private ILog javascriptAuditoryLogger;
        internal ILog JavascriptAuditoryLogger
        {
            get
            {
                if (javascriptAuditoryLogger == null)
                {
                    javascriptAuditoryLogger = LogManager.GetLogger("clientAuditoryFile");
                }

                return javascriptAuditoryLogger;
            }
            set
            {
                javascriptAuditoryLogger = value;
            }
        }

        public Log4javascriptController()
        {
        }

        public void Write(LogEntry[] dataMessage)
        {
            if (IsNoDataMessage(dataMessage))
            {
                JavascriptErrorLogger.Error(Locale.log4JavascriptNullMessage);
            }
            else
            {
                LogEntry firstDataMessage = dataMessage.First();

                LogDataMessage(dataMessage, firstDataMessage);
            }
        }

        private void LogDataMessage(LogEntry[] dataMessage, LogEntry firstDataMessage)
        {
            if (IsDebugLevel(firstDataMessage))
            {
                JavascriptAuditoryLogger.Debug(dataMessage);
            }
            else if (IsWarmLevel(firstDataMessage))
            {
                JavascriptErrorLogger.Warn(dataMessage);
            }
            else if (IsFatalLevel(firstDataMessage))
            {
                JavascriptErrorLogger.Fatal(dataMessage);
            }
            else
            {
                LogBothDataMessageLevels(dataMessage, firstDataMessage);
            }
        }

        private void LogBothDataMessageLevels(LogEntry[] dataMessage, LogEntry firstDataMessage)
        {
            LogInfoLevelMessage(dataMessage, firstDataMessage);
            LogErrorLevelMessage(dataMessage, firstDataMessage);
        }

        private void LogErrorLevelMessage(LogEntry[] dataMessage, LogEntry firstDataMessage)
        {
            if (IsErrorLevel(firstDataMessage))
            {
                JavascriptErrorLogger.Error(dataMessage);
            }
        }

        private void LogInfoLevelMessage(LogEntry[] dataMessage, LogEntry firstDataMessage)
        {
            if (IsInfoLevel(firstDataMessage))
            {
                JavascriptAuditoryLogger.Info(dataMessage);
            }
        }

        private static bool IsNoDataMessage(LogEntry[] dataMessage)
        {
            return dataMessage == null;
        }

        private bool IsErrorLevel(LogEntry firstDataMessage)
        {
            return firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptErrorLevel"]
                || firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptAllLevel"]
                || firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptNoneLevel"];
        }

        private bool IsInfoLevel(LogEntry firstDataMessage)
        {
            return firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptAllLevel"]
                || firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptInfoLevel"];
        }

        private bool IsFatalLevel(LogEntry firstDataMessage)
        {
            return firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptFatalLevel"];
        }

        private bool IsWarmLevel(LogEntry firstDataMessage)
        {
            return firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptWarmLevel"];
        }

        private bool IsDebugLevel(LogEntry firstDataMessage)
        {
            return firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptTraceLevel"]
                || firstDataMessage.Level == ConfigurationManager.AppSettings["log4JavascriptDebugLevel"];
        }
    }
}