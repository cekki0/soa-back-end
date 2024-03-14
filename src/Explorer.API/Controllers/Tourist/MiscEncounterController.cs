﻿using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/misc-encounter")]
    public class MiscEncounterController : BaseApiController
    {
        private readonly IEncounterService _encounterService;
        private readonly ITouristProgressService _touristProgressService;
        public MiscEncounterController(IEncounterService encounterService, ITouristProgressService touristProgressService)
        {
            _encounterService = encounterService;
            _touristProgressService = touristProgressService;
        }


        [HttpPost("createMisc")]
        public async Task<ActionResult<MiscEncounterResponseDto>> CreateAsync([FromBody] MiscEncounterCreateDto encounter)
        {
            var result = await httpClient.PostAsJsonAsync(":8089/api/createMiscEncounter/tourist", encounter);
            return CreateResponse(result.ToResult());
        }

    }
}
