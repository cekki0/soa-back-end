﻿using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Tours.API.Public.Administration;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using System.Net;

namespace Explorer.Stakeholders.Core.UseCases
{
    public class ClubJoinRequestService : IClubJoinRequestService
    {
        private readonly IMapper _mapper;
        private readonly IClubJoinRequestRepository _requestRepository;
        public ClubJoinRequestService(IMapper mapper, IClubJoinRequestRepository requestRepository)
        {
            _mapper = mapper;
            _requestRepository = requestRepository;
        }

        public Result<ClubJoinRequestSendDto> Send(ClubJoinRequestSendDto request)
        {// nije vec poslao i nije member
            try
            {
                var joinRequest = _mapper.Map<ClubJoinRequest>(request);
                _requestRepository.Create(joinRequest);
                return request;
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }

        public Result Respond(long id, ClubJoinRequestResponseDto response)
        {//vlasnik je
            try
            {
                var request = _requestRepository.Get(r => r.Id == id && r.Status == ClubJoinRequestStatus.Pending);

                request.Respond(response.Accepted);
                _requestRepository.Update(request);
                return Result.Ok().WithSuccess("Club Join Request " + (response.Accepted ? "Accepted" : "Rejected"));
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError("Club Join Request Not Found: " + id);
            }
        }

        public Result Cancel(long id)
        {//on je poslao
            try
            {
                var request = _requestRepository.Get(r => r.Id == id && r.Status == ClubJoinRequestStatus.Pending);

                request.Cancel();
                _requestRepository.Update(request);
                return Result.Ok().WithSuccess("Club Join Request Canceled");
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError("Club Join Request Not Found: " + id);
            }
        }

        public Result<PagedResult<ClubJoinRequestByTouristDto>> GetPagedByTourist(long id, int page, int pageSize)
        {
            var requests = _requestRepository.GetPagedByTourist(id, page, pageSize);
            return MapToDto(requests);
        }

        private PagedResult<ClubJoinRequestByTouristDto> MapToDto(PagedResult<ClubJoinRequest> requests)
        {
            var requestsDto = requests.Results.Select(_mapper.Map<ClubJoinRequestByTouristDto>).ToList();
            return new PagedResult<ClubJoinRequestByTouristDto>(requestsDto, requests.TotalCount);
        }
    }
}
