﻿// <auto-generated />
using Marine_Permit_Palace.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;

namespace Marine_Permit_Palace.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20180110035655_externallogin")]
    partial class externallogin
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Marine_Permit_Palace.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Marine_Permit_Palace.Models.Document", b =>
                {
                    b.Property<Guid>("IdDocument")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_document");

                    b.Property<string>("CreatedById")
                        .HasColumnName("created_by_id");

                    b.Property<DateTime>("DateCreatedUtc")
                        .HasColumnName("date_created_utc");

                    b.Property<DateTime>("DateLastModifiedUtc")
                        .HasColumnName("date_last_modified_utc");

                    b.Property<bool>("IsActive")
                        .HasColumnName("is_active");

                    b.Property<bool>("IsDelete")
                        .HasColumnName("is_delete");

                    b.Property<string>("LastModifiedById")
                        .HasColumnName("last_modified_by_id");

                    b.Property<string>("Name")
                        .HasColumnName("name");

                    b.Property<string>("TemplateName")
                        .HasColumnName("template_name");

                    b.HasKey("IdDocument");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("Document");
                });

            modelBuilder.Entity("Marine_Permit_Palace.Models.SubmittedDocument", b =>
                {
                    b.Property<Guid>("IdSubmittedDocument")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id_submitted_document");

                    b.Property<string>("CreatedById")
                        .HasColumnName("created_by_id");

                    b.Property<DateTime>("DateCreatedUtc")
                        .HasColumnName("date_created_utc");

                    b.Property<DateTime>("DateLastModifiedUtc")
                        .HasColumnName("date_last_modified_utc");

                    b.Property<Guid>("DocumentId")
                        .HasColumnName("document_id");

                    b.Property<bool>("IsActive")
                        .HasColumnName("is_active");

                    b.Property<bool>("IsDelete")
                        .HasColumnName("is_delete");

                    b.Property<string>("LastModifiedById")
                        .HasColumnName("last_modified_by_id");

                    b.Property<string>("SignedBy")
                        .HasColumnName("signed_by");

                    b.HasKey("IdSubmittedDocument");

                    b.HasIndex("CreatedById");

                    b.HasIndex("DocumentId");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("Submitted_Document");
                });

            modelBuilder.Entity("Marine_Permit_Palace.Models.UserDocumentIntermediate", b =>
                {
                    b.Property<Guid>("SubmittedDocumentId")
                        .HasColumnName("submitted_document_id");

                    b.Property<string>("UserId")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("DateCreatedUtc")
                        .HasColumnName("date_created_utc");

                    b.Property<DateTime>("DateLastModifiedUtc")
                        .HasColumnName("date_last_modified_utc");

                    b.Property<bool>("IsActive")
                        .HasColumnName("is_active");

                    b.Property<bool>("IsDelete")
                        .HasColumnName("is_delete");

                    b.HasKey("SubmittedDocumentId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("User_Document_Intermediate");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<string>", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.ToTable("Role");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole<string>");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Role_Claim");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("User_Claim");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("User_External_Login");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("User_Role");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("User_Token");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityRole<string>");


                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");

                    b.HasDiscriminator().HasValue("IdentityRole");
                });

            modelBuilder.Entity("Marine_Permit_Palace.Models.Document", b =>
                {
                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById");
                });

            modelBuilder.Entity("Marine_Permit_Palace.Models.SubmittedDocument", b =>
                {
                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("Marine_Permit_Palace.Models.Document", "Document")
                        .WithMany("RefrencedSubmittedDocuments")
                        .HasForeignKey("DocumentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById");
                });

            modelBuilder.Entity("Marine_Permit_Palace.Models.UserDocumentIntermediate", b =>
                {
                    b.HasOne("Marine_Permit_Palace.Models.SubmittedDocument", "SubmittedDocument")
                        .WithMany("UserDocIntermediates")
                        .HasForeignKey("SubmittedDocumentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser", "User")
                        .WithMany("UserDocIntermediates")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Marine_Permit_Palace.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
