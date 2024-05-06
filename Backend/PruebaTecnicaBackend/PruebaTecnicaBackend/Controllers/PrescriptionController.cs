using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.Controllers.Models;

namespace PruebaTecnicaBackend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PrescriptionController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        public PrescriptionController(ApplicationDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllMedicinesByAppointment(bool admin, int patientId)
        {
            try
            {
                var queryAdmin = from prescription in context.Prescription
                            join medicine in context.Medicine on prescription.MedicineId equals medicine.Id
                            join appointment in context.Appointments on prescription.AppointmentId equals appointment.Id
                            join patient in context.Users on appointment.PatientId equals patient.Id
                            select new
                            {
                                MedicineName = medicine.Name,
                                MedicineDescription = medicine.Description,
                                Quantity = prescription.Quantity,
                                PatientName = patient.Name
                            };
                var queryUser = from prescription in context.Prescription
                                join medicine in context.Medicine on prescription.MedicineId equals medicine.Id
                                join appointment in context.Appointments on prescription.AppointmentId equals appointment.Id
                                where appointment.PatientId == patientId
                                select new
                                {
                                    MedicineName = medicine.Name,
                                    MedicineDescription = medicine.Description,
                                    Quantity = prescription.Quantity,
                                    PrescriptionDate = appointment.TsAppointment
                                };
                if (admin)
                {
                    return Ok(new
                    {
                        data = await queryAdmin.ToListAsync(),
                        error = false,
                        message = "Ok",
                        apiName = "GetAllMedicinesByAppointment"
                    });
                }
                else
                {
                    return Ok(new
                    {
                        data = await queryUser.ToListAsync(),
                        error = false,
                        message = "Ok",
                        apiName = "GetAllMedicinesByAppointment"
                    });
                }
                
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAllMedicinesByAppointment",
                    message = ex.Message,
                    error = true
                });
            }
        }
    }
}
