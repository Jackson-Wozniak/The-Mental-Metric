using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Core.Base;

public class BaseException : Exception
{
    public HttpStatusCode Status { get; set; }

    protected BaseException(string message, HttpStatusCode status) : base(message)
    {
        Status = status;
    }

    public JsonResult Json()
    {
        return new JsonResult(this);
    }
}