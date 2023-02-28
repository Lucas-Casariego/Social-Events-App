using Application.Activities;
using Application.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    // the first parameter of an extension is the thing that we are extending
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
            });
        });

        services.AddMediatR(typeof(List.Handler));
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        // with automatic validation, FluentValidation plugs into the validation pipeline that's part of ASP.NET Core MVC
        // and allows models to be validated before a controller action is invoked (during model binding)
        services.AddFluentValidationAutoValidation();
        // Adds all validators in the assembly of the type specified by the generic parameter
        services.AddValidatorsFromAssemblyContaining<Create>();

        return services;
    }
}
