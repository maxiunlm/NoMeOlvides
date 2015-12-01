using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Hepler
{
    public class ErrorsPackageContent
    {
        public bool HasError { get; set; }

        private IList<string> messages;
        public IList<string> Messages
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
