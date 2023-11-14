﻿using Explorer.BuildingBlocks.Core.UseCases;

namespace Explorer.Blog.Core.Domain.RepositoryInterfaces
{
    public interface IBlogRepository
    {
        Blog GetById(long id);
        PagedResult<Blog> GetAll(int page, int pageSize);
    }
}
