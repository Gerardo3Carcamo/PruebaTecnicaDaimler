namespace PruebaTecnicaBackend.Controllers.Models
{
    public class Medicine
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int ExistingQuantity { get; set; }
    }
    public class PrescriptionMedicine
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int ExistingQuantity { get; set; }
        public int Quantity { get; set; }
    }
}
