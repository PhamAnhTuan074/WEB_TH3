namespace FacilityApi.Dtos;

public class DeviceRequest
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? Room { get; set; }
}
