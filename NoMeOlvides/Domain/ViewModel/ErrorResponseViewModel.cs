using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class ErrorResponseViewModel
    {
        public bool HasError { get; set; }

        private List<string> messages;
        public List<string> Messages
        {
            get
            {
                if (messages == null)
                {
                    messages = new List<string>();
                }
                return messages;
            }
            set { messages = value; }
        }
    }
}
