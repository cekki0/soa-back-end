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

        public Result<ClubJoinRequestDto> Send(ClubJoinRequestDto request)
        {
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
        {
            try
            {
                var request = _requestRepository.GetAsNoTracking(r => r.Id == id && r.Status == ClubJoinRequestStatus.Pending);

                ClubJoinRequestStatus status = response.Accepted ? ClubJoinRequestStatus.Accepted : ClubJoinRequestStatus.Rejected;
                var updatedRequest = new ClubJoinRequest(id, request.TouristId, request.ClubId, request.RequestedAt, status);
                _requestRepository.Update(updatedRequest);
                return Result.Ok();
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError("Club Join Request Not Found: " + id);
            }
        }

        public Result Cancel(long id)
        {
            try
            {
                var request = _requestRepository.GetAsNoTracking(r => r.Id == id && r.Status == ClubJoinRequestStatus.Pending);

                var updatedRequest = new ClubJoinRequest(id, request.TouristId, request.ClubId, request.RequestedAt, ClubJoinRequestStatus.Cancelled);
                _requestRepository.Update(updatedRequest);
                return Result.Ok();
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError("Club Join Request Not Found: " + id);
            }
        }
    }
}
