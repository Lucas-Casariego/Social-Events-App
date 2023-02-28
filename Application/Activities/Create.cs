using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    // with a command we want to modify the database
    // so we do not need to return anything (no generic in IRequest)
    // but here we'll return whether the request was successful or not
    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; }
    }

    // validation at the application layer (these are the rules that we wanna apply to our command)
    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }
    
    // once again we are not returning anything, so we just have a single type parameter
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            // we are not accessing the db at this point of our code, just adding the activity in memory
            _context.Activities.Add(request.Activity);
            
            // save to db
            
            var result = await _context.SaveChangesAsync() > 0;
            // if the number of changes is == 0, nothing was saved to the db
            if (!result) return Result<Unit>.Failure("Failed to create activity");

            // a task of type unit tells our api that our request has finished
            return Result<Unit>.Success(Unit.Value);

        }
    }
}
