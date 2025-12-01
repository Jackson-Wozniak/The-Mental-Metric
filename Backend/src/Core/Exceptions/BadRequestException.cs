using System.Net;
using Backend.Core.Base;

namespace Backend.Core.Exceptions;

public class BadRequestException(string message) 
    : BaseException(message, HttpStatusCode.BadRequest)
{
    
}