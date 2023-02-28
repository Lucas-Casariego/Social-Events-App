import { Box, Container, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../App/stores/store";

const ServerError = () => {
  const { commonStore } = useStore();
  const errorDePrueba: string = "at API.Controllers.BuggyController.GetServerError() at lambda_method73(Closure, Object, Object[]) at Microsoft.AspNetCore.Mvc.Infrastructure.ActionMethodExecutor.SyncActionResultExecutor.Execute(ActionContext actionContext, IActionResultTypeMapper mapper, ObjectMethodExecutor executor, Object controller, Object[] arguments) at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeActionMethodAsync() at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted) at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeNextActionFilterAsync() --- End of stack trace from previous location --- at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Rethrow(ActionExecutedContextSealed context) at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted) at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeInnerFilterAsync() --- End of stack trace from previous location --- at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeFilterPipelineAsync>g__Awaited|20_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted) at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeAsync>g__Logged|17_1(ResourceInvoker invoker) at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeAsync>g__Logged|17_1(ResourceInvoker invoker) at Microsoft.AspNetCore.Routing.EndpointMiddleware.<Invoke>g__AwaitRequestTask|6_0(Endpoint endpoint, Task requestTask, ILogger logger) at Microsoft.AspNetCore.Authorization.AuthorizationMiddleware.Invoke(HttpContext context) at Swashbuckle.AspNetCore.SwaggerUI.SwaggerUIMiddleware.Invoke(HttpContext httpContext) at Swashbuckle.AspNetCore.Swagger.SwaggerMiddleware.Invoke(HttpContext httpContext, ISwaggerProvider swaggerProvider) at Application.Middleware.ExceptionMiddleware.InvokeAsync(HttpContext context) in C:\Users\PC\Desktop\Reactivities\Reactivities\Application\Middleware\ExceptionMiddleware.cs:line 28"
  return (
    <Container>
      <Typography variant="h4" color="initial" my={3}>Server Error</Typography>
      <Typography variant="subtitle1" color="red" my={2}> This is a server error </Typography>{ /*{commonStore.error?.message} */ }
      {commonStore.error?.details && (
        <Paper elevation={1} style={{padding: "1em"}}>
          <Typography variant="h6" color="teal"> Stack trace </Typography>
          <code style={{marginTop: "10px"}}>{errorDePrueba}</code>
        </Paper>
      )}
    </Container>
  );
};

export default observer(ServerError);