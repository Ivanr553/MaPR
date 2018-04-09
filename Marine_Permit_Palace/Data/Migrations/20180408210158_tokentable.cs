using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class tokentable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stored_Token",
                columns: table => new
                {
                    IdToken = table.Column<Guid>(nullable: false),
                    ExpirationDate = table.Column<DateTime>(nullable: false),
                    TokenReason = table.Column<string>(nullable: true),
                    TokenType = table.Column<int>(nullable: false),
                    TokenValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stored_Token", x => x.IdToken);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stored_Token");
        }
    }
}
