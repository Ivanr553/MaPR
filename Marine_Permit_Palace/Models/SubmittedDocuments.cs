using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class SubmittedDocument : UserEditableDataRowProperties
    {
        public SubmittedDocument()
        {
            DocumentCheckBoxFields = new HashSet<DocumentCheckBoxField>();
            DocumentSignatureFields = new HashSet<DocumentSignatureField>();
            DocumentFormFields = new HashSet<DocumentFormField>();
            PermitSubmittedDocIntermediates = new HashSet<PermitSubmittedDocIntermediate>();
            DocumentAssigneeIntermediates = new HashSet<DocumentAssigneeIntermediate>();
        }
        //PK
        public Guid IdSubmittedDocument { get; set; }
        //
        public string Name { get; set; } // optional
        public bool IsCompleted { get; set; }
        public DateTime DateCompletedUtc { get; set; }

        public ApplicationUser Assigner { get; set; }
        public string AssignerId { get; set; }

        public bool IsEditLocked { get; set; }

        public Document Document { get; set; }
        public Guid DocumentId { get; set; }

        public Permit Cont { get; set; }

        public ICollection<DocumentFormField> DocumentFormFields { get; set; }
        public ICollection<DocumentCheckBoxField> DocumentCheckBoxFields { get; set; }
        public ICollection<DocumentSignatureField> DocumentSignatureFields { get; set; }
        public ICollection<PermitSubmittedDocIntermediate> PermitSubmittedDocIntermediates { get; set; }
        public ICollection<DocumentAssigneeIntermediate> DocumentAssigneeIntermediates { get; set; }

        //Not Mapped
        [NotMapped]
        public FieldData this[string field_name]
        {
            get
            {
                var form = DocumentFormFields.FirstOrDefault(e => e.IdFormName == field_name);
                var sig = DocumentSignatureFields.FirstOrDefault(e => e.IdFormName == field_name);
                var check = DocumentCheckBoxFields.FirstOrDefault(e => e.IdFormName == field_name);
                if (form != null)
                {
                    return new FieldData()
                    {
                        name = form.IdFormName,
                        user_assigned = form.AssigneeId,
                        value = form.FormValue
                    };
                }
                else if (sig != null)
                {
                    return new FieldData()
                    {
                        name = sig.IdFormName,
                        user_assigned = sig.AssigneeId,
                        value = sig.SignatureValue
                    };
                }
                else if (check != null)
                {
                    return new FieldData()
                    {
                        name = check.IdFormName,
                        user_assigned = check.AssigneeId,
                        value = check.FormValue ? "On" : "Off"
                    };
                }
                else return null;

            }
        }
    }

    public class FieldData
    {
        public string name { get; set; }
        public string value { get; set; }
        public string user_assigned { get; set; }
        public bool is_disabled { get; set; }
        public string disabled_message { get; set; }
    }
}
