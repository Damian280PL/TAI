using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proj2_tutorialPL.Migrations
{
    public partial class init6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProtectionPackage",
                table: "Rents",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProtectionPackage",
                table: "Rents");
        }
    }
}
