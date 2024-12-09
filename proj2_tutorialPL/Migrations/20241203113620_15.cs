using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proj2_tutorialPL.Migrations
{
    public partial class _15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DriverId1",
                table: "Rents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId1",
                table: "Rents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rents_DriverId1",
                table: "Rents",
                column: "DriverId1");

            migrationBuilder.CreateIndex(
                name: "IX_Rents_ProductId1",
                table: "Rents",
                column: "ProductId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Rents_Drivers_DriverId1",
                table: "Rents",
                column: "DriverId1",
                principalTable: "Drivers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rents_Products_ProductId1",
                table: "Rents",
                column: "ProductId1",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rents_Drivers_DriverId1",
                table: "Rents");

            migrationBuilder.DropForeignKey(
                name: "FK_Rents_Products_ProductId1",
                table: "Rents");

            migrationBuilder.DropIndex(
                name: "IX_Rents_DriverId1",
                table: "Rents");

            migrationBuilder.DropIndex(
                name: "IX_Rents_ProductId1",
                table: "Rents");

            migrationBuilder.DropColumn(
                name: "DriverId1",
                table: "Rents");

            migrationBuilder.DropColumn(
                name: "ProductId1",
                table: "Rents");
        }
    }
}
