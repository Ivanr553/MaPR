using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class renamewoops : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_Category_CategoryId",
                table: "Docuemnt");

            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_User_CreatedById",
                table: "Docuemnt");

            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_User_LastModifiedById",
                table: "Docuemnt");

            migrationBuilder.DropForeignKey(
                name: "FK_Permit_Document_Requirement_Docuemnt_IdDocumentId",
                table: "Permit_Document_Requirement");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_Docuemnt_DocumentId",
                table: "Submitted_Document");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Docuemnt",
                table: "Docuemnt");

            migrationBuilder.RenameTable(
                name: "Docuemnt",
                newName: "Document");

            migrationBuilder.RenameIndex(
                name: "IX_Docuemnt_LastModifiedById",
                table: "Document",
                newName: "IX_Document_LastModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Docuemnt_CreatedById",
                table: "Document",
                newName: "IX_Document_CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Docuemnt_CategoryId",
                table: "Document",
                newName: "IX_Document_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Document",
                table: "Document",
                column: "IdDocument");

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Category_CategoryId",
                table: "Document",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "IdCategory",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Document_User_CreatedById",
                table: "Document",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Document_User_LastModifiedById",
                table: "Document",
                column: "LastModifiedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Permit_Document_Requirement_Document_IdDocumentId",
                table: "Permit_Document_Requirement",
                column: "IdDocumentId",
                principalTable: "Document",
                principalColumn: "IdDocument",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_Document_DocumentId",
                table: "Submitted_Document",
                column: "DocumentId",
                principalTable: "Document",
                principalColumn: "IdDocument",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Document_Category_CategoryId",
                table: "Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Document_User_CreatedById",
                table: "Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Document_User_LastModifiedById",
                table: "Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Permit_Document_Requirement_Document_IdDocumentId",
                table: "Permit_Document_Requirement");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_Document_DocumentId",
                table: "Submitted_Document");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Document",
                table: "Document");

            migrationBuilder.RenameTable(
                name: "Document",
                newName: "Docuemnt");

            migrationBuilder.RenameIndex(
                name: "IX_Document_LastModifiedById",
                table: "Docuemnt",
                newName: "IX_Docuemnt_LastModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Document_CreatedById",
                table: "Docuemnt",
                newName: "IX_Docuemnt_CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_Document_CategoryId",
                table: "Docuemnt",
                newName: "IX_Docuemnt_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Docuemnt",
                table: "Docuemnt",
                column: "IdDocument");

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_Category_CategoryId",
                table: "Docuemnt",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "IdCategory",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_User_CreatedById",
                table: "Docuemnt",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_User_LastModifiedById",
                table: "Docuemnt",
                column: "LastModifiedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Permit_Document_Requirement_Docuemnt_IdDocumentId",
                table: "Permit_Document_Requirement",
                column: "IdDocumentId",
                principalTable: "Docuemnt",
                principalColumn: "IdDocument",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_Docuemnt_DocumentId",
                table: "Submitted_Document",
                column: "DocumentId",
                principalTable: "Docuemnt",
                principalColumn: "IdDocument",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
