namespace PruebaTecnicaBackend.Controllers.Models
{
    public class Prescription
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }
        public int MedicineId { get; set; }
        public int Quantity { get; set; }
    }
}
