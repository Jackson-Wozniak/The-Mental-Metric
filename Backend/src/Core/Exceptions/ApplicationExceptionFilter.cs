using Backend.Core.Base;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Core.Exceptions;

public class ApplicationExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {

        if (context.Exception is BaseException ex)
        {
            context.Result = ex.Json();
        }
        else
        {
            context.Result = new ServerException(context.Exception.Message).Json();
        }

        context.ExceptionHandled = true;
    }
}