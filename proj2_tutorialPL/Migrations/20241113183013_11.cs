using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proj2_tutorialPL.Migrations
{
    public partial class _11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rents_AspNetUsers_DriverId",
                table: "Rents");

            migrationBuilder.AlterColumn<int>(
                name: "DriverId",
                table: "Rents",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Rents_Drivers_DriverId",
                table: "Rents",
                column: "DriverId",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rents_Drivers_DriverId",
                table: "Rents");

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "Rents",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Rents_AspNetUsers_DriverId",
                table: "Rents",
                column: "DriverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
