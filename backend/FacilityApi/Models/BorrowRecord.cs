namespace FacilityApi.Models;

public class BorrowRecord
{
    public int Id { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public string Borrower { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime BorrowDate { get; set; } = DateTime.UtcNow;
}
