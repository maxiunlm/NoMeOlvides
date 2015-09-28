using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Resources;
using System.Web.Http;
using Domain.Resources;
using Domain.ViewModel;
using Log4Javascript.Web.Models;
using log4net;

namespace NoMeOlvides.WebApis
{
    [Route("WebApi/Log4javascript")]
    public class Log4javascriptController : ApiController
    {
        private ILog errorLogger;
        internal ILog ErrorLogger
        {
            get
            {
                if (errorLogger == null)
                {
                    errorLogger = LogManager.GetLogger("errorsLog");
                }

                return errorLogger;
            }
            set
            {
                errorLogger = value;
            }
        }

        private ILog auditoryLogger;
        internal ILog AuditoryLogger
        {
            get
            {
                if (auditoryLogger == null)
                {
                    auditoryLogger = LogManager.GetLogger("auditoryLog");
                }

                return auditoryLogger;
            }
            set
            {
                auditoryLogger = value;
            }
        }

        public Log4javascriptController()
        {
        }

        public void Write(LogEntryViewModel[] dataMessage)
        {
            if (IsNoDataMessage(dataMessage))
            {
                ErrorLogger.Error(Locale.log4JavascriptNullMessage);
            }
            else
            {
                SetAllMessageLogTypesToClientSideValue(dataMessage);

                LogEntry firstDataMessage = dataMessage.First();

                LogDataMessage(dataMessage, firstDataMessage);
            }
        }

        private void SetAllMessageLogTypesToClientSideValue(LogEntryViewModel[] dataMessage)
        {
            foreach (var message in dataMessage)
            {
                message.MessageLogType = MessageLogType.ClientSide;
            }
        }

        private void LogDataMessage(LogEntry[] dataMessage, LogEntry firstDataMessage)
        {
            if (IsDebugLevel(firstDataMessage))
            {
                AuditoryLogger.Debug(dataMessage);
            }
            else if (IsWarmLevel(firstDataMessage))
            {
                ErrorLogger.Warn(dataMessage);
            }
            else if (IsFatalLevel(firstDataMessage))
            {
                ErrorLogger.Fatal(dataMessage);
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
                ErrorLogger.Error(dataMessage);
            }
        }

        private void LogInfoLevelMessage(LogEntry[] dataMessage, LogEntry firstDataMessage)
        {
            if (IsInfoLevel(firstDataMessage))
            {
                AuditoryLogger.Info(dataMessage);
            }
        }

        private bool IsNoDataMessage(LogEntry[] dataMessage)
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