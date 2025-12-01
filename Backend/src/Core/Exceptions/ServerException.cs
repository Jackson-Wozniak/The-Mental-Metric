using System.Net;
using Backend.Core.Base;

namespace Backend.Core.Exceptions;

public class ServerException(string message) 
    : BaseException(message, HttpStatusCode.InternalServerError)
{
    
}