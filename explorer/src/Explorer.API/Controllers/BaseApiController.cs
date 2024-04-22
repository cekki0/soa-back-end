﻿using FluentResults;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Explorer.API.Controllers;

[ApiController]
public class BaseApiController : ControllerBase
{
    protected string encounterApi = $"http://{Environment.GetEnvironmentVariable("ENCOUNTER_HOST") ?? "localhost"}:{Environment.GetEnvironmentVariable("ENCOUNTER_PORT") ?? "8089"}/api/";
    protected string tourApi = $"http://{Environment.GetEnvironmentVariable("TOUR_HOST") ?? "localhost"}:{Environment.GetEnvironmentVariable("TOUR_PORT") ?? "8080"}/";
    protected string followerApi = "http://localhost:8089/followers/";

    protected static HttpClient httpClient = new()
    {
    };

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
        {
            e.Metadata.TryGetValue("code", out var errorCode);
            if (errorCode == null) return false;
            return (int)errorCode == code;
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
        return result.IsSuccess ? Ok() : CreateErrorResponse(result.Errors);
    }

    protected ActionResult CreateResponse<T>(Result<T> result)
    {
        return result.IsSuccess ? Ok(result.Value) : CreateErrorResponse(result.Errors);
    }
}