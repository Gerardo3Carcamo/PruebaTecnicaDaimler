namespace PruebaTecnicaBackend.Controllers.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime TsAppointment { get; set; }
        public int DoctorId { get; set; }
        public int PatientId { get; set; }
        public string? State { get; set; }
        public string? Observations { get; set; }
    }
    public class AttendedAppointment
    {
        public int AppointmentId { get; set; }
        public int PatientId { get; set; }
        public string? Observations { get; set; }
        public List<PrescriptionMedicine?>? Medicines { get; set; }
    }
}
