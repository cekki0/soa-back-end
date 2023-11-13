﻿using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using FluentResults;

namespace Explorer.Stakeholders.API.Public;

public interface IProblemService
{
    Result<PagedResult<ProblemResponseDto>> GetAll(int page, int pageSize);
    Result<ProblemResponseDto> Get(long id);
    Result<ProblemResponseDto> Create<ProblemCreateDto>(ProblemCreateDto problem);
    Result<ProblemResponseDto> Update<ProblemUpdateDto>(ProblemUpdateDto problem);
    Result<ProblemResponseDto> ResolveProblem(long problemId);
    Result Delete(long id);
    Result<PagedResult<ProblemResponseDto>> GetByAuthor(int page, int pageSize, long id);
    Result<PagedResult<ProblemResponseDto>> GetByUserId(int page, int pageSize, long id);
    Result<ProblemResponseDto> GetByAnswerId(long id);
    Result<ProblemResponseDto> UpdateIsAnswered(long problemId, bool isAnswered);
    Result<ProblemResponseDto> UpdateAnswerId(long problemId, long answerId);
    Result<ProblemResponseDto> UpdateDeadline(long problemId, DateTime deadline);
    Result CreateAnswer(ProblemAnswerDto problemAnswer, long problemId);
    Result<ProblemAnswerDto> GetAnswer(long problemId);
}