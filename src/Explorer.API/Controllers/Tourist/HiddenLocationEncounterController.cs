﻿using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Tours.API.Dtos.TouristPosition;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/hidden-location-encounter")]
    public class HiddenLocationEncounterController : BaseApiController
    {
        private readonly IEncounterService _encounterService;
        public HiddenLocationEncounterController(IEncounterService encounterService)
        {
            _encounterService = encounterService;
        }

        [HttpGet("{id:long}")]
        public ActionResult<EncounterResponseDto> GetHiddenLocationEncounterById(long id)
        {
            var result = _encounterService.GetHiddenLocationEncounterById(id);
            return CreateResponse(result);
        }

        [HttpPost("{id:long}/complete")]
        public ActionResult<EncounterResponseDto> Complete([FromBody] TouristPositionCreateDto position, long id)
        {
            long userId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            var result = _encounterService.CompleteHiddenLocationEncounter(userId, id, position.Longitude, position.Latitude);
            return CreateResponse(result);
        }
    }
}
