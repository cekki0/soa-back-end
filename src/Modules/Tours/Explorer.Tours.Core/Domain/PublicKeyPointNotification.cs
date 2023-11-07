﻿using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain
{
    public class PublicKeyPointNotification : Entity
    {
        public long RequestId { get; init; }
        public string Description { get; set; }
        public long AuthorId { get; init; }
        public PublicKeyPointNotification(string description,long authorId, long requestId) {
            Validate(description);
            Description = description;    
            AuthorId = authorId;
            RequestId = requestId;
        }
        private void Validate(string description)
        {
            if (string.IsNullOrWhiteSpace(description)) throw new ArgumentException("Invalid Description.");
        }
    }
}
