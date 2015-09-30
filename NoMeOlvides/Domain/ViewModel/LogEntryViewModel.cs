using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Log4Javascript.Web.Models;

namespace Domain.ViewModel
{
    public enum MessageLogType
    {
        ServerSide,
        ClientSide
    }

    public class LogEntryViewModel : LogEntry
    {
        private MessageLogType messageLogType;
        public MessageLogType MessageLogType
        {
            get
            {
                return messageLogType;
            }
            set 
            {
                messageLogType = value;
            }
        }
    }
}
