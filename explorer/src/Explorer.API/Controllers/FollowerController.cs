using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Security.Claims;
using System.Text.Json;

namespace Explorer.API.Controllers
{
    [Authorize(Policy = "nonAdministratorPolicy")]
    [Route("api/follower")]
    public class FollowerController : BaseApiController
    {
        private readonly IFollowerService _followerService;
        private readonly IUserService _userService;
        private readonly string followerApi = "http://localhost:8089/followers/";
        public FollowerController(IFollowerService followerService, IUserService userService)
        {
            _followerService = followerService;
            _userService = userService;
        }

        [HttpGet("followers/{id:long}")]
        public async Task<ActionResult<PagedResult<FollowerResponseWithUserDto>>> GetFollowers([FromQuery] int page, [FromQuery] int pageSize, long id)
        {
            var httpResponse = await httpClient.GetAsync(followerApi + id);

            var responseContent = await httpResponse.Content.ReadAsStringAsync();
            Trace.WriteLine(responseContent);
            var response = JsonSerializer.Deserialize<List<JsonElement>>(responseContent);
            var ids = response.Select(obj => obj.GetProperty("id").GetInt64()).ToList();

            if (httpResponse.IsSuccessStatusCode)
            {
                var result = _followerService.GetUserFollowers(page, pageSize, ids);
                return CreateResponse(result);

            }
            return new ContentResult
            {
                StatusCode = (int)httpResponse.StatusCode,
                Content = await httpResponse.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }

        [HttpGet("followings/{id:long}")]
        public async Task<ActionResult<PagedResult<FollowingResponseWithUserDto>>> GetFollowings([FromQuery] int page, [FromQuery] int pageSize, long id)
        {
            var httpResponse = await httpClient.GetAsync(followerApi + "followings/" + id);

            var responseContent = await httpResponse.Content.ReadAsStringAsync();
            Trace.WriteLine(responseContent);
            var response = JsonSerializer.Deserialize<List<JsonElement>>(responseContent);
            var ids = response.Select(obj => obj.GetProperty("id").GetInt64()).ToList();

            if (httpResponse.IsSuccessStatusCode)
            {
                var result = _followerService.GetUserFollowings(page, pageSize, ids);
                return CreateResponse(result);

            }
            return new ContentResult
            {
                StatusCode = (int)httpResponse.StatusCode,
                Content = await httpResponse.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }

        [HttpDelete("{id:long}")]
        public ActionResult Delete(long id)
        {
            var result = _followerService.Delete(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public async Task<ActionResult<FollowerResponseDto>> Create([FromBody] FollowerCreateDto follower)
        {
            // var result = _followerService.Create(follower);
            var httpResponse = await httpClient.PostAsJsonAsync(followerApi + "follow", follower);
            if (httpResponse.IsSuccessStatusCode)
            {
                var response = await httpResponse.Content.ReadFromJsonAsync<FollowerResponseDto>();
                return Ok(response);
            }
            return new ContentResult
            {
                StatusCode = (int)httpResponse.StatusCode,
                Content = await httpResponse.Content.ReadAsStringAsync(),
                ContentType = "text/plain"
            };
        }

        [HttpGet("search/{searchUsername}")]
        public ActionResult<PagedResult<UserResponseDto>> GetSearch([FromQuery] int page, [FromQuery] int pageSize, string searchUsername)
        {
            long userId = 0;
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null && identity.IsAuthenticated)
            {
                userId = long.Parse(identity.FindFirst("id").Value);
            }
            var result = _userService.SearchUsers(0, 0, searchUsername, userId);
            return CreateResponse(result);
        }
    }

}
