using System;
using FacilityApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FacilityApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "8.0.11");

            modelBuilder.Entity("FacilityApi.Models.BorrowRecord", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<DateTime>("BorrowDate").HasColumnType("TEXT");
                b.Property<string>("Borrower").IsRequired().HasMaxLength(100).HasColumnType("TEXT");
                b.Property<string>("ItemName").IsRequired().HasMaxLength(120).HasColumnType("TEXT");
                b.Property<string>("Status").IsRequired().HasMaxLength(50).HasColumnType("TEXT");
                b.HasKey("Id");
                b.ToTable("BorrowRecords");
            });

            modelBuilder.Entity("FacilityApi.Models.Device", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<string>("Code").IsRequired().HasMaxLength(50).HasColumnType("TEXT");
                b.Property<string>("Name").IsRequired().HasMaxLength(120).HasColumnType("TEXT");
                b.Property<string>("Room").HasColumnType("TEXT");
                b.Property<string>("Status").IsRequired().HasMaxLength(50).HasColumnType("TEXT");
                b.HasKey("Id");
                b.ToTable("Devices");
            });

            modelBuilder.Entity("FacilityApi.Models.Room", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<string>("Name").IsRequired().HasMaxLength(100).HasColumnType("TEXT");
                b.Property<string>("Status").IsRequired().HasMaxLength(50).HasColumnType("TEXT");
                b.Property<string>("Type").IsRequired().HasMaxLength(100).HasColumnType("TEXT");
                b.HasKey("Id");
                b.ToTable("Rooms");
            });
        }
    }
}
