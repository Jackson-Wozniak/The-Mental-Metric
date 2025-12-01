using System.Net;
using Backend.Core.Base;

namespace Backend.Core.Exceptions;

public class NotFoundException(string message) 
    : BaseException(message, HttpStatusCode.NotFound)
{
    
}