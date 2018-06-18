using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class signaturedataadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SignatureValue",
                table: "Document_Signature_Field");

            migrationBuilder.AddColumn<Guid>(
                name: "SignatureDataId",
                table: "Document_Signature_Field",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Data_Storage",
                columns: table => new
                {
                    IdDataStorage = table.Column<Guid>(nullable: false),
                    Data = table.Column<byte[]>(nullable: true),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Data_Storage", x => x.IdDataStorage);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Document_Signature_Field_SignatureDataId",
                table: "Document_Signature_Field",
                column: "SignatureDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Signature_Field_Data_Storage_SignatureDataId",
                table: "Document_Signature_Field",
                column: "SignatureDataId",
                principalTable: "Data_Storage",
                principalColumn: "IdDataStorage",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Document_Signature_Field_Data_Storage_SignatureDataId",
                table: "Document_Signature_Field");

            migrationBuilder.DropTable(
                name: "Data_Storage");

            migrationBuilder.DropIndex(
                name: "IX_Document_Signature_Field_SignatureDataId",
                table: "Document_Signature_Field");

            migrationBuilder.DropColumn(
                name: "SignatureDataId",
                table: "Document_Signature_Field");

            migrationBuilder.AddColumn<string>(
                name: "SignatureValue",
                table: "Document_Signature_Field",
                nullable: true);
        }
    }
}
