using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Hepler
{
    public abstract class ResultPackageBase
    {
        private ErrorsPackageContent errors;
        public ErrorsPackageContent Errors { get
            {
                if(errors == null)
                {
                    errors = new ErrorsPackageContent();
                }

                return errors;
            }
            set
            {
                errors = value;
            }
        }
    }
}
