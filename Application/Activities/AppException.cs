using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class AppException
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }

        public AppException(int StatusCode, string Message, string details = null)
        {
            this.StatusCode = StatusCode;
            this.Message = Message;
            this.Details = details;
        }
       
    }
}
