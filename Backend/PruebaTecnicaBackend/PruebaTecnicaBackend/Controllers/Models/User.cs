﻿namespace PruebaTecnicaBackend.Controllers.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Password { get; set; }
        public int RoleId { get; set; }
        public Role? Role { get; set; }
    }
}
