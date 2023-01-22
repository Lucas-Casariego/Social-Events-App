using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Details
    {
        // The type parameter is the return type of the handler
        // the object Query represents the request that we are going to make
        // in this case we are gonna make a request for a single activity with a given id
        public class Query : IRequest<Activity>
        {
            // we'll have access to this Id in the handler
            public Guid Id { get; set; }
        }

        // The handler is the class that will handle the query
        // the first parameter is the type of the request, the second is the type of the response
        // Query: the request type
        // Activity: the response type
        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            // the Handle method is the one that will be called when the query is sent
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}
