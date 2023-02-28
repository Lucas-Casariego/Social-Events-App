using Application.Activities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace Application.Middleware;

public class ExceptionMiddleware
{
    public RequestDelegate _next { get; }
    public ILogger<ExceptionMiddleware> _logger { get; }
    public IHostEnvironment _env { get; }
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    // this name cannot be changed, when our app recives a request, it's going to look for this method inside our middleware
    // and this is where we process that logic
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        } 
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json"; // (*)
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = _env.IsDevelopment()
                ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new AppException(context.Response.StatusCode, "Internal Server Error");

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }

}


// (*)
// we're doing this bc we are not in the context of an api controller
// an api controller by default is gonna return our response as app/json 
// but when we're outside we need to specify this information