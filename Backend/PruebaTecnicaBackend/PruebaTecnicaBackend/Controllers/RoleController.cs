using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace PruebaTecnicaBackend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

        private readonly ApplicationDBContext context;
        public RoleController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetRoles()
        {
            try
            {
                return Ok(new
                {
                    data = await context.Role.ToListAsync(),
                    error = false,
                    message = "Roles recuperados correctamente",
                    apiName = "GetRoles"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetRoles",
                    message = ex.Message,
                    error = true
                });
            }
        }
    }
}
