using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Marine_Permit_Palace.Data.Migrations
{
    public partial class externallogin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_User_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AspNetUserLogins",
                table: "AspNetUserLogins");

            migrationBuilder.RenameTable(
                name: "AspNetUserLogins",
                newName: "User_External_Login");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "User_External_Login",
                newName: "IX_User_External_Login_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User_External_Login",
                table: "User_External_Login",
                columns: new[] { "LoginProvider", "ProviderKey" });

            migrationBuilder.AddForeignKey(
                name: "FK_User_External_Login_User_UserId",
                table: "User_External_Login",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_External_Login_User_UserId",
                table: "User_External_Login");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User_External_Login",
                table: "User_External_Login");

            migrationBuilder.RenameTable(
                name: "User_External_Login",
                newName: "AspNetUserLogins");

            migrationBuilder.RenameIndex(
                name: "IX_User_External_Login_UserId",
                table: "AspNetUserLogins",
                newName: "IX_AspNetUserLogins_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AspNetUserLogins",
                table: "AspNetUserLogins",
                columns: new[] { "LoginProvider", "ProviderKey" });

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_User_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
