
## 1. Yêu cầu cài đặt

Cần cài trước:

- Node.js
- .NET SDK 8

## 2. Chạy Back-end

Mở terminal tại thư mục project, chạy:

```bash
cd backend/FacilityApi
dotnet restore
dotnet run
```

Back-end chạy tại:

```txt
http://localhost:5000
```

Swagger API:

```txt
http://localhost:5000/swagger
```

Khi chạy lần đầu, EF Core sẽ tự tạo database SQLite `facility.db` và thêm dữ liệu mẫu.

## 3. Chạy Front-end

Mở terminal khác tại thư mục gốc project, chạy:

```bash
npm install
npm run dev
```

Front-end chạy tại:

```txt
http://localhost:5173
```

## 4. Các API chính

### Rooms

```txt
GET     /api/rooms
GET     /api/rooms/{id}
POST    /api/rooms
PUT     /api/rooms/{id}
DELETE  /api/rooms/{id}
```

### Devices

```txt
GET     /api/devices
GET     /api/devices/{id}
POST    /api/devices
PUT     /api/devices/{id}
DELETE  /api/devices/{id}
```

### BorrowRecords

```txt
GET     /api/borrowrecords
GET     /api/borrowrecords/{id}
POST    /api/borrowrecords
PUT     /api/borrowrecords/{id}
DELETE  /api/borrowrecords/{id}
```

## 5. Các file quan trọng

Front-end:

```txt
src/api/axiosClient.js
src/api/roomApi.js
src/api/deviceApi.js
src/api/borrowRecordApi.js
src/pages/RoomsPage.jsx
src/pages/DevicesPage.jsx
src/pages/BorrowReturnPage.jsx
src/pages/StatisticsPage.jsx
```

Back-end:

```txt
backend/FacilityApi/Program.cs
backend/FacilityApi/appsettings.json
backend/FacilityApi/Data/AppDbContext.cs
backend/FacilityApi/Data/DbSeeder.cs
backend/FacilityApi/Models/*.cs
backend/FacilityApi/Dtos/*.cs
backend/FacilityApi/Controllers/*.cs
backend/FacilityApi/Migrations/*.cs
```
