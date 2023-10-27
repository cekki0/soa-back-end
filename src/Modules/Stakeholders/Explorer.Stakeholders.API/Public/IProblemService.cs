﻿using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using FluentResults;

namespace Explorer.Stakeholders.API.Public;

public interface IProblemService
{
    Result<PagedResult<ProblemResponseDto>> GetPaged(int page, int pageSize);
    Result<ProblemResponseDto> Create<ProblemCreateDto>(ProblemCreateDto problem);
    Result<ProblemResponseDto> Update<ProblemUpdateDto>(ProblemUpdateDto problem);
    Result Delete(long id);
    Result<PagedResult<ProblemResponseDto>> GetByUserId(int page, int pageSize,long id);

}