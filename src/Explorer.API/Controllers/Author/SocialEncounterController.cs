using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/social-encounter")]
    public class SocialEncounterController : BaseApiController
    {
        private readonly IEncounterService _encounterService;
        public SocialEncounterController(IEncounterService encounterService)
        {
            _encounterService = encounterService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<EncounterResponseDto>> CreateAsync([FromBody] SocialEncounterCreateDto encounter)
        {
            var result = await httpClient.PostAsJsonAsync(":8089/api/createSocialEncounter/author", encounter);
            return CreateResponse(result.ToResult());
        }
    }
}
