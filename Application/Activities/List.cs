using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using SQLitePCL;
using System.Runtime.CompilerServices;

namespace Application.Activities;

// the aplication layer instead of returning a activities to the Controller, it will return a result object
public class List
{
    public class Query : IRequest<Result<List<Activity>>> { }

    public class Handler : IRequestHandler<Query, Result<List<Activity>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }
        
        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);
            // in this case we are not doing any error handling logic inside here, so we can just return the result
            return Result<List<Activity>>.Success(activities);
        }
    }
}