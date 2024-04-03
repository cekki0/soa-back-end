using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/social-encounter")]
    public class SocialEncounterController : BaseApiController
    {
        private readonly IEncounterService _encounterService;
        private readonly ITouristProgressService _touristProgressService;
        public SocialEncounterController(IEncounterService encounterService, ITouristProgressService touristProgressService)
        {
            _encounterService = encounterService;
            _touristProgressService = touristProgressService;
        }

        [HttpPost("create")]
        public async Task<ActionResult<EncounterResponseDto>> CreateAsync([FromBody] SocialEncounterCreateDto encounter)
        {
            //var result = await httpClient.PostAsJsonAsync(":8089/api/createSocialEncounter/tourist", encounter);
            //return CreateResponse(result.ToResult());

            long userId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);

            encounter.Type = 0;
            var result = await httpClient.PostAsJsonAsync(encounterApi + "createSocialEncounter/tourist/" + userId, encounter);

            return new ContentResult
            {
                StatusCode = (int)result.StatusCode,
                Content = await result.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };

        }
    }
}
