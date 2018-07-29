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
        public virtual DbSet<UserSupervisorIntermediate> UserSupervisorIntermediate { get; set; }
        public virtual DbSet<UserDocumentCategory> UserDocumentCategory { get; set; }
        public virtual DbSet<IssuedPermit> IssuedPermit { get; set; }
        public virtual DbSet<Permit> Permit { get; set; }
        public virtual DbSet<PermitDocumentRequirement> PermitDocumentRequirement { get; set; }
        public virtual DbSet<DocumentFormField> DocumentFormField { get; set; }
        public virtual DbSet<DocumentCheckBoxField> DocumentCheckBoxField { get; set; }
        public virtual DbSet<DocumentSignatureField> DocumentSignatureField { get; set; }
        public virtual DbSet<PermitSubmittedDocIntermediate> PermitSubmittedDocIntermediate { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<StoredToken> StoredToken { get; set; }
        public virtual DbSet<DataStorage> DataStorage { get; set; }
        public virtual DbSet<DocumentAssigneeIntermediate> DocumentAssigneeIntermediate { get; set; }

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

                //Model Linking
                entity.HasOne(e => e.Category)
                    .WithMany(e => e.Documents)
                    .HasForeignKey(e => e.CategoryId);

                //User Editable Data Linkage
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(e => e.DocumentCreatedBy)
                    .HasForeignKey(e => e.CreatedById);
                entity.HasOne(e => e.LastModifiedBy)
                    .WithMany(e => e.DocumentLastModBy)
                    .HasForeignKey(e => e.LastModifiedById);
            });

            builder.Entity<SubmittedDocument>(entity =>
            {
                entity.ToTable("Submitted_Document");
                entity.HasKey(e => e.IdSubmittedDocument);

                //Model Linking
                entity.HasOne(e => e.Assigner)
                    .WithMany(e => e.AssignedDocuments)
                    .HasForeignKey(e => e.AssignerId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.Document)
                    .WithMany(e => e.SubmittedDocuments)
                    .HasForeignKey(e => e.DocumentId);

                //User Editable Data Linkage
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(e => e.SubmittedDocumentsCreatedBy)
                    .HasForeignKey(e => e.CreatedById);
                entity.HasOne(e => e.LastModifiedBy)
                    .WithMany(e => e.SubmittedDocumentsLastModBy)
                    .HasForeignKey(e => e.LastModifiedById);
            });

            builder.Entity<UserSupervisorIntermediate>(entity =>
            {
                entity.ToTable("User_Supervisor_Intermediate");
                entity.HasKey(e => new { e.IdUserId, e.IdSupervisorId });

                //Model Linkage
                entity.HasOne(e => e.User)
                    .WithMany(e => e.UserSubordinates)
                    .HasForeignKey(e => e.IdUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                entity.HasOne(e => e.Supervisor)
                    .WithMany(e => e.UserSupervisors)
                    .HasForeignKey(e => e.IdSupervisorId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                //User Editable Data Linkage
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(e => e.UserSupervisorIntermediateCreatedBy)
                    .HasForeignKey(e => e.CreatedById);
                entity.HasOne(e => e.LastModifiedBy)
                    .WithMany(e => e.UserSupervisorIntermediateLastModBy)
                    .HasForeignKey(e => e.LastModifiedById);
            });

            builder.Entity<DocumentAssigneeIntermediate>(entity =>
            {
                entity.ToTable("Document_Assignee_Intermediate");

                entity.HasKey(e => new { e.IdActiveDocumentId, e.IdAssigneeId });

                entity.HasOne(e => e.ActiveDocument)
                    .WithMany(e => e.DocumentAssigneeIntermediates)
                    .HasForeignKey(e => e.IdActiveDocumentId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.Assignee)
                    .WithMany(e => e.DocumentAssigneeIntermediates)
                    .HasForeignKey(e => e.IdAssigneeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<UserDocumentCategory>(entity =>
            {
                entity.ToTable("User_Document_Category");
                entity.HasKey(e => new {e.IdUserInCategoryId, e.IdCategoryId });

                //Link models
                entity.HasOne(e => e.UserApprovingLink)
                    .WithMany(e => e.UserDocumentCategoriesApproved)
                    .HasForeignKey(e => e.UserApprovingLinkId);
                entity.HasOne(e => e.Category)
                    .WithMany(e => e.UserDocumentCategories)
                    .HasForeignKey(e => e.IdCategoryId);
                entity.HasOne(e => e.UserInCategory)
                    .WithMany(e => e.InUserDocumentCategories)
                    .HasForeignKey(e => e.IdUserInCategoryId);

                //User Editable Data Linkage
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(e => e.UserDocumentCategorytCreatedBy)
                    .HasForeignKey(e => e.CreatedById);
                entity.HasOne(e => e.LastModifiedBy)
                    .WithMany(e => e.UserDocumentCategoryLastModBy)
                    .HasForeignKey(e => e.LastModifiedById);
            });

            builder.Entity<IssuedPermit>(entity =>
            {
                entity.ToTable("Issued_Permit");
                entity.HasKey(e => new { e.IdPermitId, e.IdUserIssuedId });

                //Model Links
                entity.HasOne(e => e.UserIssued)
                    .WithMany(e => e.IssuedPermits)
                    .HasForeignKey(e => e.IdUserIssuedId);
                entity.HasOne(e => e.Issuer)
                    .WithMany(e => e.PermitsIssued)
                    .HasForeignKey(e => e.IssuerId);

                //User Editable Data Linkage : NONE
            });

            builder.Entity<Permit>(entity =>
            {
                entity.ToTable("Permit");
                entity.HasKey(e => e.IdPermit);

                //User Editable Data Linkage
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(e => e.PermitCreatedBy)
                    .HasForeignKey(e => e.CreatedById);
                entity.HasOne(e => e.LastModifiedBy)
                    .WithMany(e => e.PermitLastModBy)
                    .HasForeignKey(e => e.LastModifiedById);

            });

            builder.Entity<PermitDocumentRequirement>(entity =>
            {
                entity.ToTable("Permit_Document_Requirement");
                entity.HasKey(e => new { e.IdPermitId, e.IdDocumentId });

                //Link Models
                entity.HasOne(e => e.Permit)
                    .WithMany(e => e.PermitDocumentRequirements)
                    .HasForeignKey(e => e.IdPermitId);
                entity.HasOne(e => e.Document)
                    .WithMany(e => e.PermitDocumentRequirements)
                    .HasForeignKey(e => e.IdDocumentId);

                //User Editable Data Linkage
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(e => e.PermitDocumentRequirementCreatedBy)
                    .HasForeignKey(e => e.CreatedById);
                entity.HasOne(e => e.LastModifiedBy)
                    .WithMany(e => e.PermitDocumentRequirementLastModBy)
                    .HasForeignKey(e => e.LastModifiedById);
            });

            builder.Entity<DocumentFormField>(entity =>
            {
                entity.ToTable("Document_Form_Field");
                entity.HasKey(e => new { e.IdSubmittedDocumentId, e.IdFormName });

                entity.HasOne(e => e.SubmittedDocument)
                    .WithMany(e => e.DocumentFormFields)
                    .HasForeignKey(e => e.IdSubmittedDocumentId);

                //No User Edit Prop

                //Assigned
                entity.HasOne(e => e.Assignee)
                    .WithMany(e => e.AssignedDocumentFormFields)
                    .HasForeignKey(e => e.AssigneeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<DocumentCheckBoxField>(entity =>
            {
                entity.ToTable("Document_Check_Box_Field");
                entity.HasKey(E => new { E.IdSubmittedDocumentId, E.IdFormName });

                entity.HasOne(E => E.SubmittedDocument)
                    .WithMany(e => e.DocumentCheckBoxFields)
                    .HasForeignKey(e => e.IdSubmittedDocumentId);

                //No User Edit Prop 

                //Assigned
                entity.HasOne(e => e.Assignee)
                    .WithMany(e => e.AssignedDocumentCheckBoxFields)
                    .HasForeignKey(e => e.AssigneeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<DocumentSignatureField>(entity =>
            {
                entity.ToTable("Document_Signature_Field");
                entity.HasKey(e => new { e.IdSubmittedDocumentId, e.IdFormName });

                entity.HasOne(e => e.SubmittedDocument)
                    .WithMany(e => e.DocumentSignatureFields)
                    .HasForeignKey(e => e.IdSubmittedDocumentId);

                entity.HasOne(e => e.SignatureData)
                    .WithMany(e => e.DocumentSignatureFields)
                    .HasForeignKey(e => e.SignatureDataId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
                //No User Edit Prop 

                //Assigned
                entity.HasOne(e => e.Assignee)
                    .WithMany(e => e.AssignedDocumentSignatureFields)
                    .HasForeignKey(e => e.AssigneeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<PermitSubmittedDocIntermediate>(entity =>
            {
                entity.ToTable("Permit_Submitted_Doc_Intermediate");
                entity.HasKey(e => new { e.IdPermitId, e.IdSubmittedDocumentId });

                //Link Models
                entity.HasOne(e => e.SubmittedDocument)
                    .WithMany(e => e.PermitSubmittedDocIntermediates)
                    .HasForeignKey(e => e.IdSubmittedDocumentId);
                entity.HasOne(e => e.Permit)
                    .WithMany(e => e.PermitSubmittedDocIntermediates)
                    .HasForeignKey(e => e.IdPermitId);
                //No USer editble prop
            });

            builder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");
                entity.HasKey(e => e.IdCategory);

                //User Editable Data Linkage
                entity.HasOne(e => e.CreatedBy)
                    .WithMany(e => e.CategoryCreatedBy)
                    .HasForeignKey(e => e.CreatedById);
                entity.HasOne(e => e.LastModifiedBy)
                    .WithMany(e => e.CategoryLastModBy)
                    .HasForeignKey(e => e.LastModifiedById);
            });

            builder.Entity<StoredToken>(entity =>
            {
                entity.ToTable("Stored_Token");
                entity.HasKey(e => e.IdToken); 

            });

            builder.Entity<DataStorage>(entity =>
            {
                entity.ToTable("Data_Storage");
                entity.HasKey(e => e.IdDataStorage);
            });
        }
    }
}
