using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaTecnicaBackend.Controllers.Models;

namespace PruebaTecnicaBackend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        public MedicineController(ApplicationDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<ActionResult> GetHistoricalMedicines()
        {
            try
            {
                var query = from medicines in context.Medicine
                            join prescription in context.Prescription on medicines.Id equals prescription.MedicineId
                            join appointment in context.Appointments on prescription.AppointmentId equals appointment.Id
                            join user in context.Users on appointment.DoctorId equals user.Id
                            select new
                            {
                                idMedicine = medicines.Id,
                                medicineName = medicines.Name,
                                medicineDescription = medicines.Description,
                                quantity = prescription.Quantity,
                                tsPrescription = appointment.TsAppointment,
                                doctorName = user.Name
                            };
                return Ok(new
                {
                    data = await query.ToListAsync(),
                    error = false,
                    message = "Ok",
                    apiName = "GetHistoricalMedicines"
                });
            }catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetHistoricalMedicines",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpGet]
        public async Task<ActionResult> GetAllMedicinesWithStock()
        {
            try
            {
                var query = from medicine in context.Medicine
                            select new
                            {
                                id = medicine.Id,
                                description = medicine.Description,
                                name = medicine.Name,
                                existingQuantity = medicine.ExistingQuantity
                            };
                return Ok(new
                {
                    data = await query.ToListAsync(),
                    error = false,
                    message = "Ok",
                    apiName = "GetAllMedicinesWithStock"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "GetAllMedicinesWithStock",
                    message = ex.Message,
                    error = true
                });
            }
        }
        [HttpPatch]
        public async Task<ActionResult> UpdateInventory(Medicine data)
        {
            try
            {
                if(data is not null)
                {
                    var medicine = await context.Medicine.Where(x => x.Id == data.Id).FirstOrDefaultAsync();
                    if(medicine is not null)
                    {
                        medicine.ExistingQuantity = data.ExistingQuantity;
                        await context.SaveChangesAsync();
                    }
                    return Ok(new
                    {
                        data = true,
                        error = false,
                        message = "Ok, Inventario actualizado",
                        apiName = "UpdateInventory"
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        apiName = "UpdateInventory",
                        message = "Faltan datos necesarios para poder actualizar el registro.",
                        error = true
                    });
                }
            }catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    apiName = "UpdateInventory",
                    message = ex.Message,
                    error = true
                });
            }
        }
    }
}
