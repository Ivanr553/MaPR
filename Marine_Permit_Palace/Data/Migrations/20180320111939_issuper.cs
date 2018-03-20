using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class issuper : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSupervisor",
                table: "Document_Signature_Field",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSupervisor",
                table: "Document_Form_Field",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSupervisor",
                table: "Document_Check_Box_Field",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSupervisor",
                table: "Document_Signature_Field");

            migrationBuilder.DropColumn(
                name: "IsSupervisor",
                table: "Document_Form_Field");

            migrationBuilder.DropColumn(
                name: "IsSupervisor",
                table: "Document_Check_Box_Field");
        }
    }
}
