using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class NewDataStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Document_User_created_by_id",
                table: "Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Document_User_last_modified_by_id",
                table: "Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_created_by_id",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_Document_document_id",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_last_modified_by_id",
                table: "Submitted_Document");

            migrationBuilder.DropTable(
                name: "User_Document_Intermediate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Document",
                table: "Document");

            migrationBuilder.DropColumn(
                name: "DOB10964",
                table: "User");

            migrationBuilder.RenameTable(
                name: "Document",
                newName: "Docuemnt");

            migrationBuilder.RenameColumn(
                name: "last_modified_by_id",
                table: "Submitted_Document",
                newName: "LastModifiedById");

            migrationBuilder.RenameColumn(
                name: "is_delete",
                table: "Submitted_Document",
                newName: "IsDelete");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "Submitted_Document",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "document_id",
                table: "Submitted_Document",
                newName: "DocumentId");

            migrationBuilder.RenameColumn(
                name: "delete_comission_date_utc",
                table: "Submitted_Document",
                newName: "DeleteCommissionDateUtc");

            migrationBuilder.RenameColumn(
                name: "date_last_modified_utc",
                table: "Submitted_Document",
                newName: "DateLastModifiedUtc");

            migrationBuilder.RenameColumn(
                name: "date_inactivated_utc",
                table: "Submitted_Document",
                newName: "DateInactivatedUtc");

            migrationBuilder.RenameColumn(
                name: "date_created_utc",
                table: "Submitted_Document",
                newName: "DateCreatedUtc");

            migrationBuilder.RenameColumn(
                name: "created_by_id",
                table: "Submitted_Document",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "id_submitted_document",
                table: "Submitted_Document",
                newName: "IdSubmittedDocument");

            migrationBuilder.RenameColumn(
                name: "signed_by",
                table: "Submitted_Document",
                newName: "UserLockingEditId");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_last_modified_by_id",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_LastModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_document_id",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_DocumentId");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_created_by_id",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_CreatedById");

            migrationBuilder.RenameColumn(
                name: "template_name",
                table: "Docuemnt",
                newName: "TemplateName");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Docuemnt",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "last_modified_by_id",
                table: "Docuemnt",
                newName: "LastModifiedById");

            migrationBuilder.RenameColumn(
                name: "is_delete",
                table: "Docuemnt",
                newName: "IsDelete");

            migrationBuilder.RenameColumn(
                name: "is_active",
                table: "Docuemnt",
                newName: "IsActive");

            migrationBuilder.RenameColumn(
                name: "delete_comission_date_utc",
                table: "Docuemnt",
                newName: "DeleteCommissionDateUtc");

            migrationBuilder.RenameColumn(
                name: "date_last_modified_utc",
                table: "Docuemnt",
                newName: "DateLastModifiedUtc");

            migrationBuilder.RenameColumn(
                name: "date_inactivated_utc",
                table: "Docuemnt",
                newName: "DateInactivatedUtc");

            migrationBuilder.RenameColumn(
                name: "date_created_utc",
                table: "Docuemnt",
                newName: "DateCreatedUtc");

            migrationBuilder.RenameColumn(
                name: "created_by_id",
                table: "Docuemnt",
                newName: "CreatedById");

            migrationBuilder.RenameColumn(
                name: "id_document",
                table: "Docuemnt",
                newName: "IdDocument");

            migrationBuilder.RenameIndex(
                name: "IX_Document_last_modified_by_id",
                table: "Docuemnt",
                newName: "IX_Docuemnt_LastModifiedById");

            migrationBuilder.RenameIndex(
                name: "IX_Document_created_by_id",
                table: "Docuemnt",
                newName: "IX_Docuemnt_CreatedById");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "User",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "UserLockingEditId",
                table: "Submitted_Document",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ContIdPermit",
                table: "Submitted_Document",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCompletedUtc",
                table: "Submitted_Document",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsCompleted",
                table: "Submitted_Document",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsEditLocked",
                table: "Submitted_Document",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Submitted_Document",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserApprovingCompletionId",
                table: "Submitted_Document",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "Docuemnt",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Docuemnt",
                table: "Docuemnt",
                column: "IdDocument");

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    IdDepartment = table.Column<Guid>(nullable: false),
                    CreatedById = table.Column<string>(nullable: true),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    LastModifiedById = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.IdDepartment);
                    table.ForeignKey(
                        name: "FK_Department_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Department_User_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Document_Check_Box_Field",
                columns: table => new
                {
                    IdSubmittedDocumentId = table.Column<Guid>(nullable: false),
                    IdFormName = table.Column<string>(nullable: false),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    FormValue = table.Column<bool>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Document_Check_Box_Field", x => new { x.IdSubmittedDocumentId, x.IdFormName });
                    table.ForeignKey(
                        name: "FK_Document_Check_Box_Field_Submitted_Document_IdSubmittedDocumentId",
                        column: x => x.IdSubmittedDocumentId,
                        principalTable: "Submitted_Document",
                        principalColumn: "IdSubmittedDocument",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Document_Form_Field",
                columns: table => new
                {
                    IdSubmittedDocumentId = table.Column<Guid>(nullable: false),
                    IdFormName = table.Column<string>(nullable: false),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    FormValue = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Document_Form_Field", x => new { x.IdSubmittedDocumentId, x.IdFormName });
                    table.ForeignKey(
                        name: "FK_Document_Form_Field_Submitted_Document_IdSubmittedDocumentId",
                        column: x => x.IdSubmittedDocumentId,
                        principalTable: "Submitted_Document",
                        principalColumn: "IdSubmittedDocument",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Document_Signature_Field",
                columns: table => new
                {
                    IdSubmittedDocumentId = table.Column<Guid>(nullable: false),
                    IdFormName = table.Column<string>(nullable: false),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DateSignedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    SignatureValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Document_Signature_Field", x => new { x.IdSubmittedDocumentId, x.IdFormName });
                    table.ForeignKey(
                        name: "FK_Document_Signature_Field_Submitted_Document_IdSubmittedDocumentId",
                        column: x => x.IdSubmittedDocumentId,
                        principalTable: "Submitted_Document",
                        principalColumn: "IdSubmittedDocument",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Permit",
                columns: table => new
                {
                    IdPermit = table.Column<Guid>(nullable: false),
                    CreatedById = table.Column<string>(nullable: true),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    LastModifiedById = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    NumberOfDaysValid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permit", x => x.IdPermit);
                    table.ForeignKey(
                        name: "FK_Permit_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permit_User_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "User_Supervisor_Intermediate",
                columns: table => new
                {
                    IdUserId = table.Column<string>(nullable: false),
                    IdSupervisorId = table.Column<string>(nullable: false),
                    CreatedById = table.Column<string>(nullable: true),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    LastModifiedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Supervisor_Intermediate", x => new { x.IdUserId, x.IdSupervisorId });
                    table.ForeignKey(
                        name: "FK_User_Supervisor_Intermediate_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Supervisor_Intermediate_User_IdSupervisorId",
                        column: x => x.IdSupervisorId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Supervisor_Intermediate_User_IdUserId",
                        column: x => x.IdUserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Supervisor_Intermediate_User_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Issued_Permit",
                columns: table => new
                {
                    IdPermitId = table.Column<Guid>(nullable: false),
                    IdUserIssuedId = table.Column<string>(nullable: false),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateIssuedUtc = table.Column<DateTime>(nullable: false),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    IssuerId = table.Column<string>(nullable: true),
                    PermitIssuedIdPermit = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issued_Permit", x => new { x.IdPermitId, x.IdUserIssuedId });
                    table.ForeignKey(
                        name: "FK_Issued_Permit_User_IdUserIssuedId",
                        column: x => x.IdUserIssuedId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Issued_Permit_User_IssuerId",
                        column: x => x.IssuerId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Issued_Permit_Permit_PermitIssuedIdPermit",
                        column: x => x.PermitIssuedIdPermit,
                        principalTable: "Permit",
                        principalColumn: "IdPermit",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Permit_Document_Requirement",
                columns: table => new
                {
                    IdPermitId = table.Column<Guid>(nullable: false),
                    IdDocumentId = table.Column<Guid>(nullable: false),
                    CreatedById = table.Column<string>(nullable: true),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    LastModifiedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permit_Document_Requirement", x => new { x.IdPermitId, x.IdDocumentId });
                    table.ForeignKey(
                        name: "FK_Permit_Document_Requirement_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Permit_Document_Requirement_Docuemnt_IdDocumentId",
                        column: x => x.IdDocumentId,
                        principalTable: "Docuemnt",
                        principalColumn: "IdDocument",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Permit_Document_Requirement_Permit_IdPermitId",
                        column: x => x.IdPermitId,
                        principalTable: "Permit",
                        principalColumn: "IdPermit",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Permit_Document_Requirement_User_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Permit_Submitted_Doc_Intermediate",
                columns: table => new
                {
                    IdPermitId = table.Column<Guid>(nullable: false),
                    IdSubmittedDocumentId = table.Column<Guid>(nullable: false),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permit_Submitted_Doc_Intermediate", x => new { x.IdPermitId, x.IdSubmittedDocumentId });
                    table.ForeignKey(
                        name: "FK_Permit_Submitted_Doc_Intermediate_Permit_IdPermitId",
                        column: x => x.IdPermitId,
                        principalTable: "Permit",
                        principalColumn: "IdPermit",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Permit_Submitted_Doc_Intermediate_Submitted_Document_IdSubmittedDocumentId",
                        column: x => x.IdSubmittedDocumentId,
                        principalTable: "Submitted_Document",
                        principalColumn: "IdSubmittedDocument",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_DepartmentId",
                table: "User",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Submitted_Document_ContIdPermit",
                table: "Submitted_Document",
                column: "ContIdPermit");

            migrationBuilder.CreateIndex(
                name: "IX_Submitted_Document_UserApprovingCompletionId",
                table: "Submitted_Document",
                column: "UserApprovingCompletionId");

            migrationBuilder.CreateIndex(
                name: "IX_Submitted_Document_UserLockingEditId",
                table: "Submitted_Document",
                column: "UserLockingEditId");

            migrationBuilder.CreateIndex(
                name: "IX_Docuemnt_DepartmentId",
                table: "Docuemnt",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Department_CreatedById",
                table: "Department",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Department_LastModifiedById",
                table: "Department",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Issued_Permit_IdUserIssuedId",
                table: "Issued_Permit",
                column: "IdUserIssuedId");

            migrationBuilder.CreateIndex(
                name: "IX_Issued_Permit_IssuerId",
                table: "Issued_Permit",
                column: "IssuerId");

            migrationBuilder.CreateIndex(
                name: "IX_Issued_Permit_PermitIssuedIdPermit",
                table: "Issued_Permit",
                column: "PermitIssuedIdPermit");

            migrationBuilder.CreateIndex(
                name: "IX_Permit_CreatedById",
                table: "Permit",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Permit_LastModifiedById",
                table: "Permit",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Permit_Document_Requirement_CreatedById",
                table: "Permit_Document_Requirement",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Permit_Document_Requirement_IdDocumentId",
                table: "Permit_Document_Requirement",
                column: "IdDocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_Permit_Document_Requirement_LastModifiedById",
                table: "Permit_Document_Requirement",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_Permit_Submitted_Doc_Intermediate_IdSubmittedDocumentId",
                table: "Permit_Submitted_Doc_Intermediate",
                column: "IdSubmittedDocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Supervisor_Intermediate_CreatedById",
                table: "User_Supervisor_Intermediate",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_User_Supervisor_Intermediate_IdSupervisorId",
                table: "User_Supervisor_Intermediate",
                column: "IdSupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Supervisor_Intermediate_LastModifiedById",
                table: "User_Supervisor_Intermediate",
                column: "LastModifiedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_User_CreatedById",
                table: "Docuemnt",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_Department_DepartmentId",
                table: "Docuemnt",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "IdDepartment",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_User_LastModifiedById",
                table: "Docuemnt",
                column: "LastModifiedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_Permit_ContIdPermit",
                table: "Submitted_Document",
                column: "ContIdPermit",
                principalTable: "Permit",
                principalColumn: "IdPermit",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_CreatedById",
                table: "Submitted_Document",
                column: "CreatedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_Docuemnt_DocumentId",
                table: "Submitted_Document",
                column: "DocumentId",
                principalTable: "Docuemnt",
                principalColumn: "IdDocument",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_LastModifiedById",
                table: "Submitted_Document",
                column: "LastModifiedById",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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

            migrationBuilder.AddForeignKey(
                name: "FK_User_Department_DepartmentId",
                table: "User",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "IdDepartment",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_User_CreatedById",
                table: "Docuemnt");

            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_Department_DepartmentId",
                table: "Docuemnt");

            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_User_LastModifiedById",
                table: "Docuemnt");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_Permit_ContIdPermit",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_CreatedById",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_Docuemnt_DocumentId",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_LastModifiedById",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_UserApprovingCompletionId",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_Submitted_Document_User_UserLockingEditId",
                table: "Submitted_Document");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Department_DepartmentId",
                table: "User");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropTable(
                name: "Document_Check_Box_Field");

            migrationBuilder.DropTable(
                name: "Document_Form_Field");

            migrationBuilder.DropTable(
                name: "Document_Signature_Field");

            migrationBuilder.DropTable(
                name: "Issued_Permit");

            migrationBuilder.DropTable(
                name: "Permit_Document_Requirement");

            migrationBuilder.DropTable(
                name: "Permit_Submitted_Doc_Intermediate");

            migrationBuilder.DropTable(
                name: "User_Supervisor_Intermediate");

            migrationBuilder.DropTable(
                name: "Permit");

            migrationBuilder.DropIndex(
                name: "IX_User_DepartmentId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Submitted_Document_ContIdPermit",
                table: "Submitted_Document");

            migrationBuilder.DropIndex(
                name: "IX_Submitted_Document_UserApprovingCompletionId",
                table: "Submitted_Document");

            migrationBuilder.DropIndex(
                name: "IX_Submitted_Document_UserLockingEditId",
                table: "Submitted_Document");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Docuemnt",
                table: "Docuemnt");

            migrationBuilder.DropIndex(
                name: "IX_Docuemnt_DepartmentId",
                table: "Docuemnt");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ContIdPermit",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "DateCompletedUtc",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "IsCompleted",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "IsEditLocked",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "UserApprovingCompletionId",
                table: "Submitted_Document");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Docuemnt");

            migrationBuilder.RenameTable(
                name: "Docuemnt",
                newName: "Document");

            migrationBuilder.RenameColumn(
                name: "LastModifiedById",
                table: "Submitted_Document",
                newName: "last_modified_by_id");

            migrationBuilder.RenameColumn(
                name: "IsDelete",
                table: "Submitted_Document",
                newName: "is_delete");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Submitted_Document",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "DocumentId",
                table: "Submitted_Document",
                newName: "document_id");

            migrationBuilder.RenameColumn(
                name: "DeleteCommissionDateUtc",
                table: "Submitted_Document",
                newName: "delete_comission_date_utc");

            migrationBuilder.RenameColumn(
                name: "DateLastModifiedUtc",
                table: "Submitted_Document",
                newName: "date_last_modified_utc");

            migrationBuilder.RenameColumn(
                name: "DateInactivatedUtc",
                table: "Submitted_Document",
                newName: "date_inactivated_utc");

            migrationBuilder.RenameColumn(
                name: "DateCreatedUtc",
                table: "Submitted_Document",
                newName: "date_created_utc");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Submitted_Document",
                newName: "created_by_id");

            migrationBuilder.RenameColumn(
                name: "IdSubmittedDocument",
                table: "Submitted_Document",
                newName: "id_submitted_document");

            migrationBuilder.RenameColumn(
                name: "UserLockingEditId",
                table: "Submitted_Document",
                newName: "signed_by");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_LastModifiedById",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_last_modified_by_id");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_DocumentId",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_document_id");

            migrationBuilder.RenameIndex(
                name: "IX_Submitted_Document_CreatedById",
                table: "Submitted_Document",
                newName: "IX_Submitted_Document_created_by_id");

            migrationBuilder.RenameColumn(
                name: "TemplateName",
                table: "Document",
                newName: "template_name");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Document",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "LastModifiedById",
                table: "Document",
                newName: "last_modified_by_id");

            migrationBuilder.RenameColumn(
                name: "IsDelete",
                table: "Document",
                newName: "is_delete");

            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Document",
                newName: "is_active");

            migrationBuilder.RenameColumn(
                name: "DeleteCommissionDateUtc",
                table: "Document",
                newName: "delete_comission_date_utc");

            migrationBuilder.RenameColumn(
                name: "DateLastModifiedUtc",
                table: "Document",
                newName: "date_last_modified_utc");

            migrationBuilder.RenameColumn(
                name: "DateInactivatedUtc",
                table: "Document",
                newName: "date_inactivated_utc");

            migrationBuilder.RenameColumn(
                name: "DateCreatedUtc",
                table: "Document",
                newName: "date_created_utc");

            migrationBuilder.RenameColumn(
                name: "CreatedById",
                table: "Document",
                newName: "created_by_id");

            migrationBuilder.RenameColumn(
                name: "IdDocument",
                table: "Document",
                newName: "id_document");

            migrationBuilder.RenameIndex(
                name: "IX_Docuemnt_LastModifiedById",
                table: "Document",
                newName: "IX_Document_last_modified_by_id");

            migrationBuilder.RenameIndex(
                name: "IX_Docuemnt_CreatedById",
                table: "Document",
                newName: "IX_Document_created_by_id");

            migrationBuilder.AddColumn<string>(
                name: "DOB10964",
                table: "User",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "signed_by",
                table: "Submitted_Document",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Document",
                table: "Document",
                column: "id_document");

            migrationBuilder.CreateTable(
                name: "User_Document_Intermediate",
                columns: table => new
                {
                    submitted_document_id = table.Column<Guid>(nullable: false),
                    user_id = table.Column<string>(nullable: false),
                    date_created_utc = table.Column<DateTime>(nullable: false),
                    date_inactivated_utc = table.Column<DateTime>(nullable: true),
                    date_last_modified_utc = table.Column<DateTime>(nullable: false),
                    delete_comission_date_utc = table.Column<DateTime>(nullable: true),
                    is_active = table.Column<bool>(nullable: false),
                    is_delete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Document_Intermediate", x => new { x.submitted_document_id, x.user_id });
                    table.ForeignKey(
                        name: "FK_User_Document_Intermediate_Submitted_Document_submitted_document_id",
                        column: x => x.submitted_document_id,
                        principalTable: "Submitted_Document",
                        principalColumn: "id_submitted_document",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Document_Intermediate_User_user_id",
                        column: x => x.user_id,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_Document_Intermediate_user_id",
                table: "User_Document_Intermediate",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Document_User_created_by_id",
                table: "Document",
                column: "created_by_id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Document_User_last_modified_by_id",
                table: "Document",
                column: "last_modified_by_id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_created_by_id",
                table: "Submitted_Document",
                column: "created_by_id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_Document_document_id",
                table: "Submitted_Document",
                column: "document_id",
                principalTable: "Document",
                principalColumn: "id_document",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submitted_Document_User_last_modified_by_id",
                table: "Submitted_Document",
                column: "last_modified_by_id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
