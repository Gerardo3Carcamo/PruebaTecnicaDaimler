using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.Controllers.Models;

namespace PruebaTecnicaBackend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        public AppointmentController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllAppointmentsByPatient(int patientId)
        {
            try
            {
                if (patientId == 0)
                {
                    return BadRequest(new
                    {
                        apiName = "GetAllAppointmentsByPatient",
                        error = true,
                        message = "Ingrese un Id mayor a 0 para poder realizar la busqueda"
                    });
                }
                else
                {
                    var query = from appointment in context.Appointments
                                where appointment.PatientId == patientId
                                orderby appointment.TsAppointment
                                join user in context.Users on appointment.DoctorId equals user.Id
                                select new
                                {
                                    appointmentId = appointment.Id,
                                    doctor = user.Name,
                                    tsAppointment = appointment.TsAppointment,
                                    state = appointment.State,
                                    observations = appointment.Observations,
                                };
                    return Ok(new
                    {
                        data = await query.ToListAsync(),
                        error = false,
                        message = "Ok",
                        apiName = "GetAllAppointmentsByPatient"
                    });
                }
            }catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAllAppointmentsByPatient",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllAppointmentsAttendedByPatient(int patientId)
        {
            try
            {
                if (patientId == 0)
                {
                    return BadRequest(new
                    {
                        apiName = "GetAllAppointmentsAttendedByPatient",
                        error = true,
                        message = "Ingrese un Id mayor a 0 para poder realizar la busqueda"
                    });
                }
                else
                {
                    var query = from appointment in context.Appointments
                                where appointment.State == "Atendido"
                                join user in context.Users on appointment.DoctorId equals user.Id
                                select new
                                {
                                    appointmentId = appointment.Id,
                                    doctor = user.Name,
                                    tsAppointment = appointment.TsAppointment,
                                    observations = appointment.Observations,
                                };
                    return Ok(new
                    {
                        data = await query.ToListAsync(),
                        error = false,
                        message = "Ok",
                        apiName = "GetAllAppointmentsAttendedByPatient"
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAllAppointmentsAttendedByPatient",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpPatch]
        public async Task<ActionResult> UpdateAppointment(Appointment data)
        {
            try
            {
                if (data is null)
                {
                    return BadRequest(new
                    {
                        apiName = "UpdateAppointment",
                        error = true,
                        message = "Faltan datos necesarios para poder actualizar la cita"
                    });
                }
                else
                {
                    var appointment = await context.Appointments.Where(a => a.Id == data.Id).FirstOrDefaultAsync();
                    if(appointment is not null)
                    {
                        appointment.TsAppointment = data.TsAppointment;
                        await context.SaveChangesAsync();
                        return Ok(new
                        {
                            data = true,
                            error = false,
                            message = "Se actualizo la fecha de la cita exitosamente",
                            apiName = "UpdateAppointment"
                        });
                    }
                    else
                    {
                        return NotFound(new
                        {
                            error = true,
                            message = "No se encontro la cita solicitada, revise de nuevo",
                            apiName = "UpdateAppointment"
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "UpdateAppointment",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpPost]
        public async Task<ActionResult> AddNewAppointment(Appointment appointment)
        {
            try
            {
                if (appointment is null)
                {
                    return BadRequest(new
                    {
                        apiName = "AddNewAppointment",
                        error = true,
                        message = "Faltan datos necesarios para poder ingresar la nueva cita"
                    });
                }
                else
                {
                    context.Add(appointment);
                    await context.SaveChangesAsync();
                    return Ok(new
                    {
                        data = true,
                        error = false,
                        message = "Nueva cita ingresada correctamente",
                        apiName = "AddNewAppointment"
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "AddNewAppointment",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllAppointmentsUnattended(int doctorId)
        {
            try
            {
                var query = from appointment in context.Appointments
                            where appointment.State == "Programada" && appointment.DoctorId == doctorId
                            join user in context.Users on appointment.PatientId equals user.Id
                            select new 
                            {
                                patientName = user.Name,
                                patientId = user.Id,
                                appointmentId = appointment.Id
                            };
                return Ok(new
                {
                    data = await query.ToListAsync(),
                    error = false,
                    message = "Nueva cita ingresada correctamente",
                    apiName = "AddNewAppointment"
                });
            }
            catch(Exception ex) 
            {
                return StatusCode(500, new
                {
                    apiName = "AddNewAppointment",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpDelete]
        public async Task<ActionResult> DeleteAppointment(int id)
        {
            try
            {
                if(id == 0)
                {
                    return BadRequest(new
                    {
                        apiName = "DeleteAppointment",
                        error = true,
                        message = "Ingrese un id mayor a 0 para poder eliminarlo"
                    });
                }
                else
                {
                    var appointment = await context.Appointments.FirstOrDefaultAsync(a => a.Id == id);
                    if(appointment is null)
                    {
                        return NotFound(new
                        {
                            error = true,
                            message = $"No se encontro la cita solicitada con el id: {id}, revise de nuevo",
                            apiName = "DeleteAppointment"
                        });
                    }
                    else
                    {
                        context.Remove(appointment);
                        await context.SaveChangesAsync();
                        return Ok(new
                        {
                            data = true,
                            error = false,
                            message = "Cita eliminada correctamente",
                            apiName = "DeleteAppointment"
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "DeleteAppointment",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpPatch]
        public async Task<ActionResult> SaveAttendedAppointment(AttendedAppointment data)
        {
            try
            {
                if (data is null)
                {
                    return BadRequest(new
                    {
                        apiName = "SaveAttendedAppointment",
                        error = true,
                        message = "Faltan datos necesarios para poder guardar el registro"
                    });
                }
                else
                {
                    var appointment = await context.Appointments.FirstOrDefaultAsync(x => x.Id == data.AppointmentId);
                    if (appointment != null)
                    {
                        appointment.State = "Atendido";
                        appointment.Observations = data.Observations;
                        await context.SaveChangesAsync();
                    }
                    var appointmentSaved = await context.Appointments.OrderBy(x => x.Id).LastOrDefaultAsync();
                    if (appointmentSaved is not null) 
                    {
                        if(data.Medicines is not null)
                        {
                            foreach (var m in data.Medicines)
                            {
                                Prescription prescription = new Prescription()
                                {
                                    AppointmentId = appointmentSaved.Id,
                                    MedicineId = m.Id,
                                    Quantity = m.Quantity
                                };
                                context.Add(prescription);
                                await context.SaveChangesAsync();
                            }
                            foreach (var m in data.Medicines)
                            {
                                var medicineDb = await context.Medicine.FirstOrDefaultAsync(y => y.Id == m.Id);
                                if (medicineDb != null)
                                {
                                    medicineDb.ExistingQuantity -= m.Quantity;
                                }
                            }
                            await context.SaveChangesAsync();
                        }
                    }
                    return Ok(new
                    {
                        data = true,
                        error = false,
                        message = "Se guardo la cita correctamente",
                        apiName = "SaveAttendedAppointment"
                    });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "SaveAttendedAppointment",
                    message = ex.Message,
                    error = true
                });
            }
        }
    }
}
