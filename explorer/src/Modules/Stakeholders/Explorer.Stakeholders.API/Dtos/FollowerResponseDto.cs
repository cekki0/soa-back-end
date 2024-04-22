using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Dtos
{
    public class FollowerResponseDto
    {
        public long UserId { get; set; }
        public long FollowedById { get; set; }
    }
}
