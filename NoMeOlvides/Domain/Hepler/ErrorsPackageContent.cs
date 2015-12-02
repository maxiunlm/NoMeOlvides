using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Hepler
{
    public class ErrorsPackageContent
    {
        public bool HasError
        {
            get
            {
                return Messages.Count > 0;
            }
        }

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
            set
            {
                messages = value;
            }
        }
    }
}
