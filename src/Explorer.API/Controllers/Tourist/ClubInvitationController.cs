﻿using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Explorer.API.Controllers.Tourist;

[Authorize(Policy = "touristPolicy")]
[Route("api/tourist/club/invite")]
public class ClubInvitationController : BaseApiController
{
    private readonly IClubInvitationService _clubInvitationService;

    public ClubInvitationController(IClubInvitationService clubInvitationService)
    {
        _clubInvitationService = clubInvitationService;
    }

    [HttpPost]
    public ActionResult<ClubInvitationDto> Invite([FromBody] ClubInvitationDto dto)
    {
        var result = _clubInvitationService.InviteTourist(dto);
        return CreateResponse(result);
    }

    [HttpPost("byUsername")]
    public ActionResult<ClubInvitationDto> Invite([FromBody] ClubInvitationWithUsernameDto dto)
    {
        var result = _clubInvitationService.InviteTourist(dto);
        return CreateResponse(result);
    }

    [HttpPatch("reject/{id:long}")]
    public ActionResult Reject(long id)
    {
        var userId = extractUserIdFromHttpContext();
        var result = _clubInvitationService.Reject(id, userId);
        return CreateResponse(result);
    }

    [HttpPatch("accept/{id:long}")]
    public ActionResult Accept(long id)
    {
        var userId = extractUserIdFromHttpContext();
        var result = _clubInvitationService.Accept(id, userId);
        return CreateResponse(result);
    }

    private long extractUserIdFromHttpContext()
    {
        return long.Parse((HttpContext.User.Identity as ClaimsIdentity).FindFirst("id").Value);
    }
}
