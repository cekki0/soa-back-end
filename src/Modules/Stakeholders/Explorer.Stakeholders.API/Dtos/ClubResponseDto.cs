﻿namespace Explorer.Stakeholders.API.Dtos
{
    public class ClubResponseDto
    {
        public long Id { get; set; }
        public long OwnerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
