using FacilityApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FacilityApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<Device> Devices => Set<Device>();
    public DbSet<BorrowRecord> BorrowRecords => Set<BorrowRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Room>().Property(x => x.Name).HasMaxLength(100).IsRequired();
        modelBuilder.Entity<Room>().Property(x => x.Type).HasMaxLength(100).IsRequired();
        modelBuilder.Entity<Room>().Property(x => x.Status).HasMaxLength(50).IsRequired();

        modelBuilder.Entity<Device>().Property(x => x.Name).HasMaxLength(120).IsRequired();
        modelBuilder.Entity<Device>().Property(x => x.Code).HasMaxLength(50).IsRequired();
        modelBuilder.Entity<Device>().Property(x => x.Status).HasMaxLength(50).IsRequired();

        modelBuilder.Entity<BorrowRecord>().Property(x => x.ItemName).HasMaxLength(120).IsRequired();
        modelBuilder.Entity<BorrowRecord>().Property(x => x.Borrower).HasMaxLength(100).IsRequired();
        modelBuilder.Entity<BorrowRecord>().Property(x => x.Status).HasMaxLength(50).IsRequired();
    }
}
