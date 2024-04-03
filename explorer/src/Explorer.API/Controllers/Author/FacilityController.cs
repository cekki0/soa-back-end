using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;
using System.Security.Claims;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/facility")]
    public class FacilityController : BaseApiController
    {
        private readonly IFacilityService _facilityService;

        public FacilityController(IFacilityService facilityService)
        {
            _facilityService = facilityService;
        }

        [HttpGet]
        public ActionResult<PagedResult<FacilityResponseDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _facilityService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("authorsFacilities")]
        public async Task<ActionResult<PagedResult<FacilityResponseDto>>> GetByAuthorId([FromQuery] int page, [FromQuery] int pageSize)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var authorId = int.Parse(identity.FindFirst("id").Value);

            var adress = tourApi + "facilities/" + authorId;
            var httpResponse = await httpClient.GetAsync(adress);

            if (httpResponse.IsSuccessStatusCode)
            {
                var response = await httpResponse.Content.ReadFromJsonAsync<FacilityResponseDto[]>();
                return Ok(new PagedResult<FacilityResponseDto>(response.ToList(), response.Length));
            }
            return new ContentResult
            {
                StatusCode = (int)httpResponse.StatusCode,
                Content = await httpResponse.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }

        [HttpPost]
        public async Task<ActionResult<FacilityResponseDto>> Create([FromBody] FacilityCreateDto facility)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null && identity.IsAuthenticated)
            {
                facility.AuthorId = int.Parse(identity.FindFirst("id").Value);
            }

            var adress = tourApi + "facility";
            var httpResponse = await httpClient.PostAsJsonAsync(adress, facility);

            if (httpResponse.IsSuccessStatusCode)
            {
                var response = await httpResponse.Content.ReadFromJsonAsync<FacilityResponseDto>();
                return Ok(response);
            }
            return new ContentResult
            {
                StatusCode = (int)httpResponse.StatusCode,
                Content = await httpResponse.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };

            /*var result = _facilityService.Create(facility);

            return CreateResponse(result);*/
        }

        [HttpPut("{id:int}")]
        public ActionResult<FacilityResponseDto> Update([FromBody] FacilityUpdateDto facility)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null && identity.IsAuthenticated)
            {
                facility.AuthorId = int.Parse(identity.FindFirst("id").Value);
            }

            var result = _facilityService.Update(facility);
            return CreateResponse(result);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _facilityService.Delete(id);
            return CreateResponse(result);
        }
    }
}
