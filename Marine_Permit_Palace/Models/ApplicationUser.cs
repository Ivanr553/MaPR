using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Marine_Permit_Palace.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            UserSupervisors = new HashSet<UserSupervisorIntermediate>();
            IssuedPermits = new HashSet<IssuedPermit>();
            PermitsIssued = new HashSet<IssuedPermit>();
            UserSubordinates = new HashSet<UserSupervisorIntermediate>();
            SubmittedDocumentsLockedBy = new HashSet<SubmittedDocument>();
            SubmittedDocumentsApproveCompletion = new HashSet<SubmittedDocument>();
            UserDocumentCategoriesApproved = new HashSet<UserDocumentCategory>();
            DocumentAssigneeIntermediates = new HashSet<DocumentAssigneeIntermediate>();

            //User Editable
            SubmittedDocumentsCreatedBy = new HashSet<SubmittedDocument>();
            SubmittedDocumentsLastModBy = new HashSet<SubmittedDocument>();
            DocumentCreatedBy = new HashSet<Document>();
            DocumentLastModBy = new HashSet<Document>();
            UserSupervisorIntermediateCreatedBy = new HashSet<UserSupervisorIntermediate>();
            UserSupervisorIntermediateLastModBy = new HashSet<UserSupervisorIntermediate>();
            UserDocumentCategorytCreatedBy = new HashSet<UserDocumentCategory>();
            UserDocumentCategoryLastModBy = new HashSet<UserDocumentCategory>();
            PermitCreatedBy = new HashSet<Permit>();
            PermitLastModBy = new HashSet<Permit>();
            PermitDocumentRequirementCreatedBy = new HashSet<PermitDocumentRequirement>();
            PermitDocumentRequirementLastModBy = new HashSet<PermitDocumentRequirement>();
            CategoryCreatedBy = new HashSet<Category>();
            InUserDocumentCategories = new HashSet<UserDocumentCategory>();
            CategoryLastModBy = new HashSet<Category>();

            //Assigned
            AssignedDocumentCheckBoxFields = new HashSet<DocumentCheckBoxField>();
            AssignedDocumentFormFields = new HashSet<DocumentFormField>();
            AssignedDocumentSignatureFields = new HashSet<DocumentSignatureField>();

        }
        //PK Defined by Identity Framework
        public string Rank { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public int DodIdNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public string HairColor { get; set; }
        public string EyeColor { get; set; }
        public string HomeOfRecord { get; set; }
        public string PlaceOfBirth { get; set; }
        public string ClassOfVehicle { get; set; }
        public string CivilianLicNumber { get; set; }
        public string CivilianLicState { get; set; }
        public DateTime CivilianLicIssueDate { get; set; }
        public DateTime CivilianLicExpDate { get; set; }
        public string MedicalCertRequired { get; set; }
        public bool WearsGlasses { get; set; }
        public string Organization { get; set; }
        

        public ICollection<UserSupervisorIntermediate> UserSupervisors { get; set; }
        public ICollection<UserSupervisorIntermediate> UserSubordinates { get; set; }

        public ICollection<IssuedPermit> IssuedPermits { get; set; } // Mine
        public ICollection<IssuedPermit> PermitsIssued { get; set; } // Someone elses
        public ICollection<SubmittedDocument> SubmittedDocumentsLockedBy { get; set; }
        public ICollection<SubmittedDocument> SubmittedDocumentsApproveCompletion { get; set; }
        public ICollection<UserDocumentCategory> UserDocumentCategoriesApproved { get; set; }
        public ICollection<UserDocumentCategory> InUserDocumentCategories { get; set; }
        public ICollection<DocumentAssigneeIntermediate> DocumentAssigneeIntermediates { get; set; }
        public ICollection<SubmittedDocument> AssignedDocuments { get; set; }

        //User Editable Links
        public ICollection<SubmittedDocument> SubmittedDocumentsCreatedBy { get; set; }
        public ICollection<SubmittedDocument> SubmittedDocumentsLastModBy { get; set; }
        public IReadOnlyCollection<Document> DocumentCreatedBy { get; set; }
        public IReadOnlyCollection<Document> DocumentLastModBy { get; set; }
        public IReadOnlyCollection<UserSupervisorIntermediate> UserSupervisorIntermediateCreatedBy { get; set; }
        public IReadOnlyCollection<UserSupervisorIntermediate> UserSupervisorIntermediateLastModBy { get; set; }
        public IReadOnlyCollection<UserDocumentCategory> UserDocumentCategorytCreatedBy { get; set; }
        public IReadOnlyCollection<UserDocumentCategory> UserDocumentCategoryLastModBy { get; set; }
        public IReadOnlyCollection<Permit> PermitCreatedBy { get; set; }
        public IReadOnlyCollection<Permit> PermitLastModBy { get; set; }
        public IReadOnlyCollection<PermitDocumentRequirement> PermitDocumentRequirementCreatedBy { get; set; }
        public IReadOnlyCollection<PermitDocumentRequirement> PermitDocumentRequirementLastModBy { get; set; }
        public IReadOnlyCollection<Category> CategoryCreatedBy { get; set; }
        public IReadOnlyCollection<Category> CategoryLastModBy { get; set; }

        //Assigned Fields

        public ICollection<DocumentCheckBoxField> AssignedDocumentCheckBoxFields { get; set; }
        public ICollection<DocumentFormField> AssignedDocumentFormFields { get; set; }
        public ICollection<DocumentSignatureField> AssignedDocumentSignatureFields { get; set; }

    }
}
