﻿using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/problem")]
    public class ProblemController : BaseApiController
    {
        private readonly IProblemService _problemService;

        public ProblemController(IProblemService problemService)
        {
            _problemService = problemService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ProblemResponseDto>> GetByAuthor([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _problemService.GetByAuthor(page, pageSize, long.Parse(HttpContext.User.Claims.First(x => x.Type == "id").Value));
            return CreateResponse(result);
        }

        [HttpPatch("{problemId:long}/problem-comments")]
        public ActionResult<ProblemCommentResponseDto> CreateComment([FromBody] ProblemCommentCreateDto problemComment, long problemId)
        {
            var result = _problemService.CreateComment(problemComment, problemId);
            return CreateResponse(result);
        }

        [HttpPatch("{problemId:long}/problem-answer")]
        public ActionResult CreateAnswer([FromBody] ProblemAnswerDto problemAnswer, long problemId)
        {
            var result = _problemService.CreateAnswer(problemAnswer, problemId);
            return CreateResponse(result);
        }

        [HttpGet("{problemId:long}/problem-answer")]
        public ActionResult<ProblemAnswerDto> GetProblemAnswer(long problemId)
        {
            var result = _problemService.GetAnswer(problemId);
            return CreateResponse(result);
        }

        [HttpGet("{problemId:long}/problem-comments")]
        public ActionResult<ProblemCommentResponseDto> GetProblemComments(long problemId)
        {
            var result = _problemService.GetComments(problemId);
            return CreateResponse(result);
        }
    }
}
