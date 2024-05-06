using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.Controllers.Methods;
using PruebaTecnicaBackend.Controllers.Models;

namespace PruebaTecnicaBackend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        public UsersController(ApplicationDBContext context)
        {
            this.context = context;
        }
        [HttpPost]
        public async Task<ActionResult> Login(User data)
        {
            try
            {
                if (data is null)
                {
                    return BadRequest(new
                    {
                        error = true,
                        message = "Faltaron campos necesarios para poder iniciar sesión",
                        apiName = "AddNewUser"
                    });
                }
                else
                {
                    var user = await context.Users.Where(u => u.Phone == data.Phone && u.Password == data.Password).FirstOrDefaultAsync();
                    if (user is not null)
                    {
                        return Ok(new
                        {
                            data = new
                            {
                                user = user,
                                mainModule = LoginMethods.GetMainModuleUser(user),
                            },
                            message = "Ok",
                            error = false,
                            apiName = "Login"
                        });
                    }
                    else
                    {
                        return Ok(new
                        {
                            data = new
                            {
                                user = "Usuario no encontrado",
                                mainModule = "",
                            },
                            error = false,
                            message = "Usuario y/o contraseña incorrectos, verifique la información e intente de nuevo",
                            apiName = "Login"
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "AddNewUser",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllPatients()
        {
            try
            {
                return Ok(new
                {
                    data = await context.Users.Where(u => u.RoleId == 3).ToListAsync(),
                    message = "Ok",
                    error = false, 
                    apiName = "GetAllPatients"
                });
            }catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAllPatients",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllDoctors()
        {
            try
            {
                return Ok(new
                {
                    data = await context.Users.Where(u => u.RoleId == 2).ToListAsync(),
                    message = "Ok",
                    error = false,
                    apiName = "GetAllDoctors"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAllDoctors",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpPost]
        public async Task<ActionResult> AddNewUser(User user)
        {
            try
            {
                if(user is null)
                {
                    return BadRequest(new
                    {
                        error = true,
                        message = "Faltaron campos necesarios para poder guardar el usuario",
                        apiName = "AddNewUser"
                    });
                }
                else
                {
                    context.Add(user);
                    await context.SaveChangesAsync();
                    return Ok(new
                    {
                        data = true,
                        message = "Usuario guardado correctamente",
                        error = false,
                        apiName = "AddNewUser"
                    });
                }
            }catch(Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "AddNewUser",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                return Ok(new
                {
                    data = await context.Users.ToListAsync(),
                    error = false,
                    message = "Usuarios recuperados correctamente",
                    apiName = "GetAllUsers"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAllUsers",
                    message = ex.Message,
                    error = true
                });
            }
        }
    }
}
