﻿using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using FluentResults;

namespace Explorer.Tours.API.Public;

public interface ITourStatisticsService
{
    public int GetNumberOfTourExecutionSessions(long tourId);
    
    public int GetNumberOfCompletedTourExecutionSessions(long tourId);

    public int GetNumberOfStartedToursByPurchase(long authorId);

    public int GetNumberOfCompletedToursByPurchase(long authorId);
    List<long> GetMaxProgressDistribution(long authorId);
}

