using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.Controllers.Models;

namespace PruebaTecnicaBackend
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options){}
        //Los nombres tienen que hacer match con el nombre de la tabla en la base de datos para que no exista ningun problema
        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Role => Set<Role>();
        public DbSet<Appointment> Appointments => Set<Appointment>();
        public DbSet<Prescription> Prescription => Set<Prescription>();
        public DbSet<Medicine> Medicine => Set<Medicine>();
    }
}
