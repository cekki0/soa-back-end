using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain.Problems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.Domain.RepositoryInterfaces
{
    public interface IFollowerRepository
    {
        public PagedResult<Follower> GetFollowersPagedById(int page, int pageSize, long userId);
        public PagedResult<Follower> GetFollowingsPagedById(int page, int pageSize, long userId);
        public PagedResult<Person> GetUserFollowingsPagedById(int page, int pageSize, List<long> ids);

    }
}
