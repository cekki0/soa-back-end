using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.TourAuthoring;
using Explorer.Tours.Core.UseCases.TourAuthoring;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net.Http.Json;

namespace Explorer.API.Controllers.Author.TourAuthoring;

[Route("api/tour-authoring")]
public class KeyPointController : BaseApiController
{
    private readonly IKeyPointService _keyPointService;

    public KeyPointController(IKeyPointService keyPointService)
    {
        _keyPointService = keyPointService;
    }

    [Authorize(Roles = "author")]
    [HttpPost("tours/{tourId:long}/key-points")]
    public async Task<ActionResult<KeyPointResponseDto>> CreateKeyPoint([FromRoute] long tourId, [FromBody] KeyPointCreateDto keyPoint)
    {
        var adress = tourApi + "keypoint/" + tourId;
        var httpResponse = await httpClient.PostAsJsonAsync(adress, keyPoint);

        if (httpResponse.IsSuccessStatusCode)
        {
            var response = await httpResponse.Content.ReadFromJsonAsync<KeyPointResponseDto>();
            return Ok(response);
        }
        return new ContentResult
        {
            StatusCode = (int)httpResponse.StatusCode,
            Content = await httpResponse.Content.ReadAsStringAsync(),
            ContentType = "text/plain"
        };
        /*keyPoint.TourId = tourId;
        var result = _keyPointService.Create(keyPoint);
        return CreateResponse(result);*/
    }

    [Authorize(Roles = "author")]
    [HttpPut("tours/{tourId:long}/key-points/{id:long}")]
    public ActionResult<KeyPointResponseDto> Update(long tourId, long id, [FromBody] KeyPointUpdateDto keyPoint)
    {
        keyPoint.Id = id;
        var result = _keyPointService.Update(keyPoint);
        return CreateResponse(result);
    }

    [Authorize(Roles = "author, tourist")]
    [HttpDelete("tours/{tourId:long}/key-points/{id:long}")]
    public ActionResult Delete(long tourId, long id)
    {
        var result = _keyPointService.Delete(id);
        return CreateResponse(result);
    }

    [Authorize(Roles = "author")]
    [HttpGet]
    public ActionResult<PagedResult<KeyPointResponseDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
    {
        var result = _keyPointService.GetPaged(page, pageSize);
        return CreateResponse(result);
    }
}
