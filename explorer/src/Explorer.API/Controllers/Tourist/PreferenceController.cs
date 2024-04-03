using System.Diagnostics;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Explorer.Tours.Core.Domain.Tours;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/preferences")]
    public class PreferenceController : BaseApiController
    {
        private readonly IPreferenceService _tourPreferencesService;

        public PreferenceController(IPreferenceService tourPreferencesService)
        {
            _tourPreferencesService = tourPreferencesService;
        }

        [HttpGet]
        public async Task<ActionResult<PreferenceResponseDto>> Get()
        {
            // int userId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            int touristId = 0;
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null && identity.IsAuthenticated)
            {
                touristId = int.Parse(identity.FindFirst("id").Value);
            }

            var adress = tourApi + "preference/" + touristId;
            var httpResponse = await httpClient.GetAsync(adress);

            if (httpResponse.IsSuccessStatusCode)
            {
                var response = await httpResponse.Content.ReadFromJsonAsync<PreferenceResponseDto>();
                return Ok(response);
            }
            return new ContentResult
            {
                StatusCode = (int)httpResponse.StatusCode,
                Content = await httpResponse.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }

        [HttpPost("create")]
        public async Task<ActionResult<PreferenceResponseDto>> Create([FromBody] PreferenceCreateDto preference)
        {
            preference.UserId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            var adress = tourApi + "preference";
            var httpResponse = await httpClient.PostAsJsonAsync(adress, preference);

            if (httpResponse.IsSuccessStatusCode)
            {
                var response = await httpResponse.Content.ReadFromJsonAsync<TourResponseDto>();
                return Ok(response);
            }
            return new ContentResult
            {
                StatusCode = (int)httpResponse.StatusCode,
                Content = await httpResponse.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };

            /*preference.UserId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            var result = _tourPreferencesService.Create(preference);
            return CreateResponse(result);*/
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _tourPreferencesService.Delete(id);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<PreferenceResponseDto> Update([FromBody] PreferenceUpdateDto preference)
        {
            preference.UserId = int.Parse(HttpContext.User.Claims.First(i => i.Type.Equals("id", StringComparison.OrdinalIgnoreCase)).Value);
            var result = _tourPreferencesService.Update(preference);
            return CreateResponse(result);
        }
    }
}
