using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/hidden-location-encounter")]
    public class HiddenLocationEncounterController : BaseApiController
    {
        private readonly IEncounterService _encounterService;
        public HiddenLocationEncounterController(IEncounterService encounterService)
        {
            _encounterService = encounterService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<HiddenLocationEncounterResponseDto>> Create([FromBody] HiddenLocationEncounterCreateDto encounter)
        {
            encounter.Type = 1;
            var result = await httpClient.PostAsJsonAsync(encounterApi + "createHiddenEncounter/author", encounter);

            return new ContentResult
            {
                StatusCode = (int)result.StatusCode,
                Content = await result.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };

        }


        

        


    }
}
