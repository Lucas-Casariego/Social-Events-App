using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        // A static method that creates a successful Result<T> instance with the specified value.
        public static Result<T> Success(T value)
        {
            return new Result<T> { IsSuccess = true, Value = value };
        }
        // A static method that creates a failed Result<T> instance with the specified error message.
        public static Result<T> Failure(string error)
        {     
            return new Result<T> { IsSuccess = false, Error = error }; 
        }
    }
}
