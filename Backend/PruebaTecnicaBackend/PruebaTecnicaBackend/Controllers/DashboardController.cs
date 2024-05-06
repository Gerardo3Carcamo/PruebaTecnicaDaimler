using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.Controllers.Models;

namespace PruebaTecnicaBackend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        public DashboardController(ApplicationDBContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetAppointmentsAttendedByDay()
        {
            try
            {
                var query = from appointment in context.Appointments
                            join user in context.Users on appointment.DoctorId equals user.Id
                            where appointment.State == "Atendido"
                            group appointment by new { UserName = user.Name, AppointmentDate = appointment.TsAppointment.Date } into groupedAppointments
                            select new Dashboard()
                            {
                                Quantity = groupedAppointments.Count(),
                                LabelColumn = groupedAppointments.Key.UserName,
                                LabelBottom = DateOnly.FromDateTime(groupedAppointments.Key.AppointmentDate)
                            };
                var data = await query.ToListAsync();
                List<string?> listLabels = data.GroupBy(x => x.LabelBottom.Value.ToString()).Select(x => x.Key).ToList();

                object result = new
                {
                    labels = listLabels,
                    DataSet = data.GroupBy(x => x.LabelColumn).Select(y => new
                    {
                        label = y.Key,
                        type = "bar",
                        data = listLabels.GroupJoin(y, z => z, w => w.LabelBottom.Value.ToString(), (z, w) => w.FirstOrDefault()?.Quantity ?? 0)
                    }).ToList()
                };
                return Ok(new
                {
                    data = result,
                    error = false,
                    mesaage = "Ok",
                    apiName = "GetAppointmentsAttendedByDay"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAppointmentsAttendedByDay",
                    message = ex.Message,
                    error = true
                });
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetMedicinesByDoctor()
        {
            try
            {
                var query = from prescription in context.Prescription
                            join medicine in context.Medicine on prescription.MedicineId equals medicine.Id
                            join appointment in context.Appointments on prescription.AppointmentId equals appointment.Id
                            join user in context.Users on appointment.DoctorId equals user.Id
                            group new { prescription.Quantity, MedicineName = medicine.Name, DoctorName = user.Name } by new { MedicineName = medicine.Name, DoctorName = user.Name } into groupedPrescriptions
                            select new DashboardLabelsString
                            {
                                Quantity = groupedPrescriptions.Sum(x => x.Quantity),
                                LabelBottom = groupedPrescriptions.Key.DoctorName, 
                                LabelColumn = groupedPrescriptions.Key.MedicineName  
                            };
                var data = await query.ToListAsync();
                List<string?> listLabels = data.GroupBy(x => x.LabelBottom).Select(x => x.Key).ToList();

                object result = new
                {
                    labels = listLabels,
                    DataSet = data.GroupBy(x => x.LabelColumn).Select(y => new
                    {
                        label = y.Key,
                        type = "bar",
                        data = listLabels.GroupJoin(y, z => z, w => w.LabelBottom, (z, w) => w.FirstOrDefault()?.Quantity ?? 0)
                    }).ToList()
                };
                return Ok(new
                {
                    data = result,
                    error = false,
                    mesaage = "Ok",
                    apiName = "GetAppointmentsAttendedByDay"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAppointmentsAttendedByDay",
                    message = ex.Message,
                    error = true
                });
            }
        }
    }
}
