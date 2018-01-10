using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Marine_Permit_Palace.Models;
using Microsoft.AspNetCore.Identity;

namespace Marine_Permit_Palace.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Document> Document { get; set; }
        public virtual DbSet<SubmittedDocument> SubmittedDocument { get; set; }
        public virtual DbSet<UserDocumentIntermediate> UserDocumentIntermediate { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().ToTable("User");
            builder.Entity<IdentityRole<string>>().ToTable("Role");
            builder.Entity<IdentityUserRole<string>>().ToTable("User_Role");
            builder.Entity<IdentityUserToken<string>>().ToTable("User_Token");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("Role_Claim");
            builder.Entity<IdentityUserClaim<string>>().ToTable("User_Claim");
            builder.Entity<IdentityUserLogin<string>>().ToTable("User_External_Login");

            builder.Entity<Document>(entity =>
            {
                entity.ToTable("Document");
                entity.HasKey(e => e.IdDocument);
            });

            builder.Entity<SubmittedDocument>(entity =>
            {
                entity.ToTable("Submitted_Document");
                entity.HasKey(e => e.IdSubmittedDocument);

                entity.HasOne(e => e.Document)
                    .WithMany(e => e.RefrencedSubmittedDocuments)
                    .HasForeignKey(e => e.DocumentId);
            });

            builder.Entity<UserDocumentIntermediate>(entity =>
            {
                entity.ToTable("User_Document_Intermediate");
                entity.HasKey(e => new {e.SubmittedDocumentId, e.UserId});

                entity.HasOne(e => e.SubmittedDocument)
                    .WithMany(e => e.UserDocIntermediates)
                    .HasForeignKey(e => e.SubmittedDocumentId);

                entity.HasOne(e => e.User)
                    .WithMany(e => e.UserDocIntermediates)
                    .HasForeignKey(e => e.UserId);
            });
        }
    }
}
