using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.Problems;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Infrastructure.Database.Repositories
{
    public class FollowerDatabaseRepository : IFollowerRepository
    {
        private readonly StakeholdersContext _dbContext;
        public FollowerDatabaseRepository(StakeholdersContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public PagedResult<Follower> GetFollowersPagedById(int page, int pageSize, long userId)
        {
            var task = _dbContext.Followers.Include(f => f.FollowedBy).Where(f => f.UserId == userId).GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }
        public PagedResult<Follower> GetFollowingsPagedById(int page, int pageSize, long userId)
        {
            var task = _dbContext.Followers.Include(f => f.User).Where(f => f.FollowedById == userId).GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public PagedResult<Person> GetUserFollowingsPagedById(int page, int pageSize, List<long> ids)
        {
            var task = _dbContext.People
                                  .Include(f => f.User)
                                  .Where(f => ids.Contains(f.Id)) 
                                  .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

    }
}
