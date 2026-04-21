namespace FacilityApi.Dtos;

public class BorrowRecordRequest
{
    public string ItemName { get; set; } = string.Empty;
    public string Borrower { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
