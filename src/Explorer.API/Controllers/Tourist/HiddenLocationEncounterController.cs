using Explorer.Encounters.API.Dtos;
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
        private readonly ITouristProgressService _touristProgressService;
        public HiddenLocationEncounterController(IEncounterService encounterService, ITouristProgressService touristProgressService)
        {
            _encounterService = encounterService;
            _touristProgressService = touristProgressService;
        }

        [HttpGet("{id:long}")]
        public async Task<ActionResult<EncounterResponseDto>> GetHiddenLocationEncounterByIdAsync(long id)
        {
            var result = await httpClient.GetAsync(encounterApi + id);

            return new ContentResult
            {
                StatusCode = (int)result.StatusCode,
                Content = await result.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }

        [HttpPost("{id:long}/complete")]
        public async Task<ActionResult<EncounterResponseDto>> CompleteAsync([FromBody] TouristPositionCreateDto position, long id)
        {
            long userId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            position.TouristId = userId;
            var result = await httpClient.PostAsJsonAsync(encounterApi + id + "/completeHiddenEncounter/", position);

            if (result.IsSuccessStatusCode)
            {
                var response = await result.Content.ReadFromJsonAsync<EncounterResponseDto>();
                return Ok(response);
            }
            else
            {
                return new ContentResult
                {
                    StatusCode = (int)result.StatusCode,
                    Content = await result.Content.ReadAsStringAsync(),
                    ContentType = "text/plain"
                };
            }
        }

        [HttpPost("{id:long}/check-range")]
        public async Task<bool> CheckIfUserInCompletionRangeAsync([FromBody] TouristPositionCreateDto position, long id)
        {
            long userId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            position.TouristId = userId;
            var httpResponse = await httpClient.PostAsJsonAsync(encounterApi + id + "/isUserInRange/", position);

            if (httpResponse.IsSuccessStatusCode)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        [HttpPost("create")]
        public async Task<ActionResult<HiddenLocationEncounterResponseDto>> CreateAsync([FromBody] HiddenLocationEncounterCreateDto encounter)
        {
            long userId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            encounter.Type = 1;
            var result = await httpClient.PostAsJsonAsync(encounterApi + "createHiddenEncounter/tourist/" + userId, encounter);

            return new ContentResult
            {
                StatusCode = (int)result.StatusCode,
                Content = await result.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }
    }
}
