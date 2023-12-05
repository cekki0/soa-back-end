﻿using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.Domain.Encounter;
using Explorer.Encounters.Core.Domain.RepositoryInterfaces;
using FluentResults;

namespace Explorer.Encounters.Core.UseCases
{
    public class EncounterService : CrudService<EncounterResponseDto, Encounter>, IEncounterService
    {
        private readonly IEncounterRepository _encounterRepository;
        public EncounterService(ICrudRepository<Encounter> repository, IEncounterRepository encounterRepository, IMapper mapper) : base(repository, mapper)
        {
            _encounterRepository = encounterRepository;
        }

        public Result<PagedResult<EncounterResponseDto>> GetActive(int page, int pageSize)
        {
            var entities = _encounterRepository.GetActive(page, pageSize);
            return MapToDto<EncounterResponseDto>(entities);
        }

        public Result<MiscEncounterResponseDto> CreateMiscEncounter(MiscEncounterCreateDto encounter)
        {

            var entity = CrudRepository.Create(new MiscEncounter(encounter.ChallengeDone, encounter.Title, encounter.Description, encounter.Longitude, encounter.Latitude, encounter.XpReward, 0));
            return MapToDto<MiscEncounterResponseDto>(entity);
        }

    }
}
