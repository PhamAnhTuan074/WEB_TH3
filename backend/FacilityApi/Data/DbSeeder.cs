using FacilityApi.Models;

namespace FacilityApi.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (!db.Rooms.Any())
        {
            db.Rooms.AddRange(
                new Room { Name = "P101", Type = "Phòng học lý thuyết", Status = "Đang sử dụng" },
                new Room { Name = "P202", Type = "Phòng máy tính", Status = "Sẵn sàng" },
                new Room { Name = "LAB01", Type = "Phòng thí nghiệm", Status = "Bảo trì" }
            );
        }

        if (!db.Devices.Any())
        {
            db.Devices.AddRange(
                new Device { Code = "TB01", Name = "Máy chiếu Epson", Status = "Tốt", Room = "P101" },
                new Device { Code = "TB02", Name = "Máy tính phòng lab", Status = "Đang sử dụng", Room = "P202" },
                new Device { Code = "TB03", Name = "Loa hội trường", Status = "Bảo trì", Room = "Hội trường" }
            );
        }

        if (!db.BorrowRecords.Any())
        {
            db.BorrowRecords.AddRange(
                new BorrowRecord { ItemName = "Máy chiếu Epson", Borrower = "Nguyễn Văn A", Status = "Đã trả" },
                new BorrowRecord { ItemName = "Laptop Dell", Borrower = "Trần Thị B", Status = "Đang mượn" },
                new BorrowRecord { ItemName = "Loa hội trường", Borrower = "Lê Văn C", Status = "Chờ xác nhận" }
            );
        }

        db.SaveChanges();
    }
}
