namespace PruebaTecnicaBackend.Controllers.Models
{
    public class Dashboard
    {
        public int Quantity { get; set; }
        public DateOnly? LabelBottom { get; set; }
        public string? LabelColumn { get; set; }
    }
    public class DashboardLabelsString
    {
        public int Quantity { get; set; }
        public string? LabelBottom { get; set; }
        public string? LabelColumn { get; set; }
    }
}
