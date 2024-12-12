using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace proj2_tutorialPL.Migrations
{
    public partial class init14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserSub",
                table: "Rents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserSub",
                table: "Rents");
        }
    }
}
