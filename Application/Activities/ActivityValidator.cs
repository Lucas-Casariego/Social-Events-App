using Domain;
using FluentValidation;

namespace Application.Activities;

// this is a validator for the Activity class 
// it can be used in many places in the app
// like in Create.cs, Edit.cs, List.cs, etc.
public class ActivityValidator : AbstractValidator<Activity>
{
    public ActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Category).NotEmpty();
        RuleFor(x => x.City).NotEmpty();
        RuleFor(x => x.Venue).NotEmpty();
    }
}
