using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers;

public class ActivitiesController : BaseApiController
{

    [HttpGet] // api/activities
    public async Task<IActionResult> GetActivities()
    {
        var activitiesResult = await Mediator.Send(new List.Query());
        return HandleResult(activitiesResult);
    }

    [HttpGet("{id}")] // api/activities/guid
    public async Task<IActionResult> GetActivity(Guid id)
    {
        // we're sending a query to the Mediator 
        // and the mediator will send the query to the handler, then the handler will return the result object (activity or error) that corresponds with the id
        var activityResult = await Mediator.Send(new Details.Query { Id = id });

        // method from the base api controller 
        return HandleResult(activityResult);
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        var activityResult = await Mediator.Send(new Create.Command { Activity = activity });
        return HandleResult(activityResult);
    }

    [HttpPut("{id}")] 
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        var editResult = await Mediator.Send(new Edit.Command { Activity = activity });
        return HandleResult(editResult);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        // we use the object initializer syntax to create a new object and set the Id property

        var deleteResult = await Mediator.Send(new Delete.Command { Id = id });
        return HandleResult(deleteResult);
    }
}