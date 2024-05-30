using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text;

namespace Explorer.API.Controllers
{
<<<<<<< Updated upstream:src/Explorer.API/Controllers/BaseApiController.cs
    protected ActionResult CreateErrorResponse(List<IError> errors)
    {
        var code = 500;
        if (ContainsErrorCode(errors, 400)) code = 400;
        if (ContainsErrorCode(errors, 403)) code = 403;
        if (ContainsErrorCode(errors, 404)) code = 404;
        if (ContainsErrorCode(errors, 409)) code = 409;
        return CreateErrorObject(errors, code);
    }

    private static bool ContainsErrorCode(List<IError> errors, int code)
    {
        return errors.Any(e =>
=======
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected readonly ILogger<BaseApiController> _logger;

        public BaseApiController(ILogger<BaseApiController> logger)
>>>>>>> Stashed changes:explorer/src/Explorer.API/Controllers/BaseApiController.cs
        {
            _logger = logger;
        }

        protected string encounterApi = $"http://{Environment.GetEnvironmentVariable("ENCOUNTER_HOST") ?? "localhost"}:{Environment.GetEnvironmentVariable("ENCOUNTER_PORT") ?? "8089"}/api/";
        protected string tourApi = $"http://{Environment.GetEnvironmentVariable("TOUR_HOST") ?? "localhost"}:{Environment.GetEnvironmentVariable("TOUR_PORT") ?? "8080"}/";
        protected string followerApi = $"http://{Environment.GetEnvironmentVariable("FOLLOW_HOST") ?? "localhost"}:{Environment.GetEnvironmentVariable("FOLLOW_PORT") ?? "8089"}/followers/";

        protected static HttpClient httpClient = new();

        protected ActionResult CreateErrorResponse(List<IError> errors)
        {
<<<<<<< Updated upstream:src/Explorer.API/Controllers/BaseApiController.cs
            sb.Append(error);
            error.Metadata.TryGetValue("subCode", out var subCode);
            if(subCode != null)
=======
            var code = 500;
            if (ContainsErrorCode(errors, 400)) code = 400;
            if (ContainsErrorCode(errors, 403)) code = 403;
            if (ContainsErrorCode(errors, 404)) code = 404;
            if (ContainsErrorCode(errors, 409)) code = 409;

            _logger.LogError($"Error {code}: {string.Join(", ", errors.Select(e => e.Message))}");
            return CreateErrorObject(errors, code);
        }

        private static bool ContainsErrorCode(List<IError> errors, int code)
        {
            return errors.Any(e =>
>>>>>>> Stashed changes:explorer/src/Explorer.API/Controllers/BaseApiController.cs
            {
                e.Metadata.TryGetValue("code", out var errorCode);
                return errorCode != null && (int)errorCode == code;
            });
        }

        private ObjectResult CreateErrorObject(List<IError> errors, int code)
        {
            var sb = new StringBuilder();
            foreach (var error in errors)
            {
                sb.Append(error);
                error.Metadata.TryGetValue("subCode", out var subCode);
                if (subCode != null)
                {
                    sb.Append(';');
                    sb.Append(subCode);
                }

                sb.AppendLine();
            }
            return Problem(statusCode: code, detail: sb.ToString());
        }

        protected ActionResult CreateResponse(Result result)
        {
            if (result.IsSuccess)
            {
                _logger.LogInformation("Request succeeded.");
                return Ok();
            }

            _logger.LogError($"Request failed: {string.Join(", ", result.Errors.Select(e => e.Message))}");
            return CreateErrorResponse(result.Errors);
        }

        protected ActionResult CreateResponse<T>(Result<T> result)
        {
            if (result.IsSuccess)
            {
                _logger.LogInformation("Request succeeded with result: {Result}", result.Value);
                return Ok(result.Value);
            }

            _logger.LogError($"Request failed: {string.Join(", ", result.Errors.Select(e => e.Message))}");
            return CreateErrorResponse(result.Errors);
        }
    }
}
