using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class USERProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "date_inactivated_utc",
                table: "User_Document_Intermediate",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "delete_comission_date_utc",
                table: "User_Document_Intermediate",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CivilianLicExpDate",
                table: "User",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CivilianLicIssueDate",
                table: "User",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CivilianLicNumber",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CivilianLicState",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClassOfVehicle",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DOB10964",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DodIdNumber",
                table: "User",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "EyeColor",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HairColor",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Height",
                table: "User",
                type: "decimal(18, 2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "HomeOfRecord",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MedicalCertRequired",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlaceOfBirth",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Rank",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sex",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "WearsGlasses",
                table: "User",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "Weight",
                table: "User",
                type: "decimal(18, 2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "date_inactivated_utc",
                table: "Submitted_Document",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "delete_comission_date_utc",
                table: "Submitted_Document",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "date_inactivated_utc",
                table: "Document",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "delete_comission_date_utc",
                table: "Document",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "date_inactivated_utc",
                table: "User_Document_Intermediate");

            migrationBuilder.DropColumn(
                name: "delete_comission_date_utc",
                table: "User_Document_Intermediate");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CivilianLicExpDate",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CivilianLicIssueDate",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CivilianLicNumber",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CivilianLicState",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ClassOfVehicle",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DOB10964",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DodIdNumber",
                table: "User");

            migrationBuilder.DropColumn(
                name: "EyeColor",
                table: "User");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "User");

            migrationBuilder.DropColumn(
                name: "HairColor",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "User");

            migrationBuilder.DropColumn(
                name: "HomeOfRecord",
                table: "User");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "User");

            migrationBuilder.DropColumn(
                name: "MedicalCertRequired",
                table: "User");

            migrationBuilder.DropColumn(
                name: "MiddleName",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Organization",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PlaceOfBirth",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Rank",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "User");

            migrationBuilder.DropColumn(
                name: "WearsGlasses",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "User");

            migrationBuilder.DropColumn(
                name: "date_inactivated_utc",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "delete_comission_date_utc",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "date_inactivated_utc",
                table: "Document");

            migrationBuilder.DropColumn(
                name: "delete_comission_date_utc",
                table: "Document");
        }
    }
}
