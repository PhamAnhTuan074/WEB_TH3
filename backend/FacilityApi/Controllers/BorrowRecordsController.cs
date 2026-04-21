using FacilityApi.Data;
using FacilityApi.Dtos;
using FacilityApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FacilityApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BorrowRecordsController : ControllerBase
{
    private readonly AppDbContext _db;

    public BorrowRecordsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BorrowRecord>>> GetBorrowRecords()
    {
        return await _db.BorrowRecords.OrderByDescending(x => x.BorrowDate).ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<BorrowRecord>> GetBorrowRecord(int id)
    {
        var record = await _db.BorrowRecords.FindAsync(id);
        return record is null ? NotFound() : Ok(record);
    }

    [HttpPost]
    public async Task<ActionResult<BorrowRecord>> CreateBorrowRecord(BorrowRecordRequest request)
    {
        var record = new BorrowRecord
        {
            ItemName = request.ItemName,
            Borrower = request.Borrower,
            Status = request.Status,
            BorrowDate = DateTime.UtcNow
        };

        _db.BorrowRecords.Add(record);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBorrowRecord), new { id = record.Id }, record);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateBorrowRecord(int id, BorrowRecordRequest request)
    {
        var record = await _db.BorrowRecords.FindAsync(id);
        if (record is null) return NotFound();

        record.ItemName = request.ItemName;
        record.Borrower = request.Borrower;
        record.Status = request.Status;

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBorrowRecord(int id)
    {
        var record = await _db.BorrowRecords.FindAsync(id);
        if (record is null) return NotFound();

        _db.BorrowRecords.Remove(record);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
