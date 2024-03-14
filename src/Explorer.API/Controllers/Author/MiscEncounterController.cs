using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/misc-encounter")]
    public class MiscEncounterController : BaseApiController
    {
        private readonly IEncounterService _encounterService;
        public MiscEncounterController(IEncounterService encounterService) {
            _encounterService = encounterService;
        }


        [HttpPost("createMisc")]
        public async Task<ActionResult<MiscEncounterResponseDto>> CreateAsync([FromBody] MiscEncounterCreateDto encounter)
        {
            var result = await httpClient.PostAsJsonAsync(encounterApi + "createMiscEncounter/author", encounter);
            
            return  new ContentResult
            {
                StatusCode = (int)result.StatusCode,
                Content = await result.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }

    }
}
