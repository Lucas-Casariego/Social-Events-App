using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers;

public class ActivitiesController : BaseApiController
{

    [HttpGet] // api/activities
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")] // api/activities/fdfkd3ffdfd394jgwed
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        // we're sending a query to the Mediator 
        // and the mediator will send the query to the handler, then the handler will return the activity with the given id
        return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        // we use the object initializer syntax to create a new object and set the Id property
        return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    }
}