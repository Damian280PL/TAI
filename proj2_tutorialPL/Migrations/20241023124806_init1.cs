using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proj2_tutorialPL.Migrations
{
    public partial class init1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Fuel_burning",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fuel_burning",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Products");
        }
    }
}
