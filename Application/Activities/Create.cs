using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        // with a command we want to modify the database
        // so we do not need to return anything (no generic in IRequest)
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }
        
        // once again we are not returning anything, so we just have a single type parameter
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // we are not accessing the db at this point of our code, just adding the activity in memory
                _context.Activities.Add(request.Activity);
                
                // save to db
                await _context.SaveChangesAsync();

                // even though commands don't return anything, we still need to return a task of type unit
                // it tells our api that our request has finished
                return Unit.Value;

            }
        }
    }
}
