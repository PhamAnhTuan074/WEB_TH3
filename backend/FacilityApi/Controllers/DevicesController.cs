using FacilityApi.Data;
using FacilityApi.Dtos;
using FacilityApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FacilityApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DevicesController : ControllerBase
{
    private readonly AppDbContext _db;

    public DevicesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Device>>> GetDevices()
    {
        return await _db.Devices.OrderBy(x => x.Id).ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Device>> GetDevice(int id)
    {
        var device = await _db.Devices.FindAsync(id);
        return device is null ? NotFound() : Ok(device);
    }

    [HttpPost]
    public async Task<ActionResult<Device>> CreateDevice(DeviceRequest request)
    {
        var device = new Device
        {
            Code = request.Code,
            Name = request.Name,
            Status = request.Status,
            Room = request.Room
        };

        _db.Devices.Add(device);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDevice), new { id = device.Id }, device);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateDevice(int id, DeviceRequest request)
    {
        var device = await _db.Devices.FindAsync(id);
        if (device is null) return NotFound();

        device.Code = request.Code;
        device.Name = request.Name;
        device.Status = request.Status;
        device.Room = request.Room;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteDevice(int id)
    {
        var device = await _db.Devices.FindAsync(id);
        if (device is null) return NotFound();

        _db.Devices.Remove(device);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
