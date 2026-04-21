# Bài TH2 - React Frontend + ASP.NET Core API Backend

## 1. Cấu trúc project

```txt
BaiTH2_FullStack/
├── src/                         # Front-end React + Vite
│   ├── api/                      # Cấu hình Axios và service gọi API
│   └── pages/                    # Các page Rooms, Devices, BorrowReturn, Statistics
└── backend/
    └── FacilityApi/              # Back-end ASP.NET Core Web API
        ├── Controllers/          # API controllers
        ├── Data/                 # DbContext + seed dữ liệu mẫu
        ├── Dtos/                 # Request DTO
        ├── Models/               # Entity models
        └── Migrations/           # EF Core migration ban đầu
```

## 2. Các endpoint đã tạo

### Rooms
- `GET /api/rooms`
- `GET /api/rooms/{id}`
- `POST /api/rooms`
- `PUT /api/rooms/{id}`
- `DELETE /api/rooms/{id}`

### Devices
- `GET /api/devices`
- `GET /api/devices/{id}`
- `POST /api/devices`
- `PUT /api/devices/{id}`
- `DELETE /api/devices/{id}`

### BorrowRecords
- `GET /api/borrowrecords`
- `GET /api/borrowrecords/{id}`
- `POST /api/borrowrecords`
- `PUT /api/borrowrecords/{id}`
- `DELETE /api/borrowrecords/{id}`

## 3. Chạy Back-end

Cài .NET 8 SDK trước, sau đó chạy:

```bash
cd backend/FacilityApi
dotnet restore
dotnet run
```

API chạy tại:

```txt
http://localhost:5000
```

Swagger:

```txt
http://localhost:5000/swagger
```

## 4. Cấu hình database

Project dùng SQLite để dễ chạy trên Windows/macOS/Linux.
Chuỗi kết nối nằm trong file:

```txt
backend/FacilityApi/appsettings.json
```

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=facility.db"
}
```

Khi chạy Back-end, file database `facility.db` sẽ được tạo tự động trong thư mục `backend/FacilityApi`.

## 5. EF Core và migration

Các package EF Core đã khai báo trong `FacilityApi.csproj`:

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="8.0.11" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.11" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.11" />
```

Nếu muốn tự tạo lại migration từ đầu:

```bash
cd backend/FacilityApi
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Trong project hiện tại đã có sẵn migration ban đầu trong thư mục `Migrations`.

## 6. Chạy Front-end

```bash
npm install
npm run dev
```

Front-end chạy tại:

```txt
http://localhost:5173
```

File cấu hình URL API:

```txt
.env.example
```

Có thể copy thành `.env`:

```bash
cp .env.example .env
```

Nội dung:

```txt
VITE_API_URL=http://localhost:5000/api
```

## 7. Axios đã được dùng ở đâu?

Cấu hình Axios chính:

```txt
src/api/axiosClient.js
```

Các service gọi API:

```txt
src/api/roomApi.js
src/api/deviceApi.js
src/api/borrowRecordApi.js
```

Các page đã gọi API bằng Axios:

```txt
src/pages/RoomsPage.jsx
src/pages/DevicesPage.jsx
src/pages/BorrowReturnPage.jsx
src/pages/StatisticsPage.jsx
```

## 8. Lưu ý khi chạy

Nên chạy Back-end trước, sau đó chạy Front-end.
Nếu Front-end báo không tải được dữ liệu, kiểm tra:

1. Back-end đã chạy ở `http://localhost:5000` chưa.
2. File `.env` có đúng `VITE_API_URL=http://localhost:5000/api` không.
3. CORS trong `Program.cs` đã cho phép `http://localhost:5173`.
