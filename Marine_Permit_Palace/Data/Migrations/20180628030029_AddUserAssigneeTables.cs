using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class AddUserAssigneeTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_UserApprovingCompletionId",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_UserLockingEditId",
                table: "Submitted_Document");

            migrationBuilder.RenameColumn(
                name: "UserLockingEditId",
                table: "Submitted_Document",
                newName: "AssignerId");

            migrationBuilder.RenameColumn(
                name: "UserApprovingCompletionId",
                table: "Submitted_Document",
                newName: "ApplicationUserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_UserLockingEditId",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_AssignerId");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_UserApprovingCompletionId",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_ApplicationUserId1");

            migrationBuilder.RenameColumn(
                name: "IsSupervisor",
                table: "Document_Signature_Field",
                newName: "IsCompleted");

            migrationBuilder.RenameColumn(
                name: "IsSupervisor",
                table: "Document_Form_Field",
                newName: "IsCompleted");

            migrationBuilder.RenameColumn(
                name: "IsSupervisor",
                table: "Document_Check_Box_Field",
                newName: "IsCompleted");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Submitted_Document",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssigneeId",
                table: "Document_Signature_Field",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssigneeId",
                table: "Document_Form_Field",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssigneeId",
                table: "Document_Check_Box_Field",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Document_Assignee_Intermediate",
                columns: table => new
                {
                    IdActiveDocumentId = table.Column<Guid>(nullable: false),
                    IdAssigneeId = table.Column<string>(nullable: false),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsAllowedApprove = table.Column<bool>(nullable: false),
                    IsAllowedAssignFields = table.Column<bool>(nullable: false),
                    IsAllowedEdit = table.Column<bool>(nullable: false),
                    IsAllowedSubmit = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Document_Assignee_Intermediate", x => new { x.IdActiveDocumentId, x.IdAssigneeId });
                    table.ForeignKey(
                        name: "FK_Document_Assignee_Intermediate_Submitted_Document_IdActiveDocumentId",
                        column: x => x.IdActiveDocumentId,
                        principalTable: "Submitted_Document",
                        principalColumn: "IdSubmittedDocument",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Document_Assignee_Intermediate_User_IdAssigneeId",
                        column: x => x.IdAssigneeId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Submitted_Document_ApplicationUserId",
                table: "Submitted_Document",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Document_Signature_Field_AssigneeId",
                table: "Document_Signature_Field",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Document_Form_Field_AssigneeId",
                table: "Document_Form_Field",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Document_Check_Box_Field_AssigneeId",
                table: "Document_Check_Box_Field",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Document_Assignee_Intermediate_IdAssigneeId",
                table: "Document_Assignee_Intermediate",
                column: "IdAssigneeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Check_Box_Field_User_AssigneeId",
                table: "Document_Check_Box_Field",
                column: "AssigneeId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Form_Field_User_AssigneeId",
                table: "Document_Form_Field",
                column: "AssigneeId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Signature_Field_User_AssigneeId",
                table: "Document_Signature_Field",
                column: "AssigneeId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_ApplicationUserId",
                table: "Submitted_Document",
                column: "ApplicationUserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_ApplicationUserId1",
                table: "Submitted_Document",
                column: "ApplicationUserId1",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_AssignerId",
                table: "Submitted_Document",
                column: "AssignerId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Document_Check_Box_Field_User_AssigneeId",
                table: "Document_Check_Box_Field");

            migrationBuilder.DropForeignKey(
                name: "FK_Document_Form_Field_User_AssigneeId",
                table: "Document_Form_Field");

            migrationBuilder.DropForeignKey(
                name: "FK_Document_Signature_Field_User_AssigneeId",
                table: "Document_Signature_Field");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_ApplicationUserId",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_ApplicationUserId1",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_AssignerId",
                table: "Submitted_Document");

            migrationBuilder.DropTable(
                name: "Document_Assignee_Intermediate");

            migrationBuilder.DropIndex(
                name: "IX_Submitted_Document_ApplicationUserId",
                table: "Submitted_Document");

            migrationBuilder.DropIndex(
                name: "IX_Document_Signature_Field_AssigneeId",
                table: "Document_Signature_Field");

            migrationBuilder.DropIndex(
                name: "IX_Document_Form_Field_AssigneeId",
                table: "Document_Form_Field");

            migrationBuilder.DropIndex(
                name: "IX_Document_Check_Box_Field_AssigneeId",
                table: "Document_Check_Box_Field");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "AssigneeId",
                table: "Document_Signature_Field");

            migrationBuilder.DropColumn(
                name: "AssigneeId",
                table: "Document_Form_Field");

            migrationBuilder.DropColumn(
                name: "AssigneeId",
                table: "Document_Check_Box_Field");

            migrationBuilder.RenameColumn(
                name: "AssignerId",
                table: "Submitted_Document",
                newName: "UserLockingEditId");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId1",
                table: "Submitted_Document",
                newName: "UserApprovingCompletionId");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_AssignerId",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_UserLockingEditId");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_ApplicationUserId1",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_UserApprovingCompletionId");

            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Document_Signature_Field",
                newName: "IsSupervisor");

            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Document_Form_Field",
                newName: "IsSupervisor");

            migrationBuilder.RenameColumn(
                name: "IsCompleted",
                table: "Document_Check_Box_Field",
                newName: "IsSupervisor");

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_UserApprovingCompletionId",
                table: "Submitted_Document",
                column: "UserApprovingCompletionId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_UserLockingEditId",
                table: "Submitted_Document",
                column: "UserLockingEditId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
