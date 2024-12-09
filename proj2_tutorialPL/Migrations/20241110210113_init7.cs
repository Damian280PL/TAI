using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proj2_tutorialPL.Migrations
{
    public partial class init7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rents_AspNetUsers_UserId",
                table: "Rents");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Rents",
                newName: "DriverId");

            migrationBuilder.RenameIndex(
                name: "IX_Rents_UserId",
                table: "Rents",
                newName: "IX_Rents_DriverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rents_AspNetUsers_DriverId",
                table: "Rents",
                column: "DriverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rents_AspNetUsers_DriverId",
                table: "Rents");

            migrationBuilder.RenameColumn(
                name: "DriverId",
                table: "Rents",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Rents_DriverId",
                table: "Rents",
                newName: "IX_Rents_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rents_AspNetUsers_UserId",
                table: "Rents",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
