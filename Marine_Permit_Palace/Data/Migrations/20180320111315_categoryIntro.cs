using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class categoryIntro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_Department_DepartmentId",
                table: "Docuemnt");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Department_DepartmentId",
                table: "User");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropIndex(
                name: "IX_User_DepartmentId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "DepartmentId",
                table: "Docuemnt",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Docuemnt_DepartmentId",
                table: "Docuemnt",
                newName: "IX_Docuemnt_CategoryId");

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    IdCategory = table.Column<Guid>(nullable: false),
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
                    table.PrimaryKey("PK_Category", x => x.IdCategory);
                    table.ForeignKey(
                        name: "FK_Category_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Category_User_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "User_Document_Category",
                columns: table => new
                {
                    IdUserInCategoryId = table.Column<string>(nullable: false),
                    IdCategoryId = table.Column<Guid>(nullable: false),
                    CreatedById = table.Column<string>(nullable: true),
                    DateCreatedUtc = table.Column<DateTime>(nullable: false),
                    DateInactivatedUtc = table.Column<DateTime>(nullable: true),
                    DateLastModifiedUtc = table.Column<DateTime>(nullable: false),
                    DeleteCommissionDateUtc = table.Column<DateTime>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    LastModifiedById = table.Column<string>(nullable: true),
                    UserApprovingLinkId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Document_Category", x => new { x.IdUserInCategoryId, x.IdCategoryId });
                    table.ForeignKey(
                        name: "FK_User_Document_Category_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Document_Category_Category_IdCategoryId",
                        column: x => x.IdCategoryId,
                        principalTable: "Category",
                        principalColumn: "IdCategory",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Document_Category_User_IdUserInCategoryId",
                        column: x => x.IdUserInCategoryId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Document_Category_User_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_User_Document_Category_User_UserApprovingLinkId",
                        column: x => x.UserApprovingLinkId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Category_CreatedById",
                table: "Category",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Category_LastModifiedById",
                table: "Category",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_User_Document_Category_CreatedById",
                table: "User_Document_Category",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_User_Document_Category_IdCategoryId",
                table: "User_Document_Category",
                column: "IdCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Document_Category_LastModifiedById",
                table: "User_Document_Category",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_User_Document_Category_UserApprovingLinkId",
                table: "User_Document_Category",
                column: "UserApprovingLinkId");

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_Category_CategoryId",
                table: "Docuemnt",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "IdCategory",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Docuemnt_Category_CategoryId",
                table: "Docuemnt");

            migrationBuilder.DropTable(
                name: "User_Document_Category");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Docuemnt",
                newName: "DepartmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Docuemnt_CategoryId",
                table: "Docuemnt",
                newName: "IX_Docuemnt_DepartmentId");

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "User",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

            migrationBuilder.CreateIndex(
                name: "IX_User_DepartmentId",
                table: "User",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Department_CreatedById",
                table: "Department",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Department_LastModifiedById",
                table: "Department",
                column: "LastModifiedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Docuemnt_Department_DepartmentId",
                table: "Docuemnt",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "IdDepartment",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Department_DepartmentId",
                table: "User",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "IdDepartment",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
