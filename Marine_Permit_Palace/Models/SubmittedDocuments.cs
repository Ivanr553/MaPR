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
        }
        //PK
        public Guid IdSubmittedDocument { get; set; }
        //
        public string Name { get; set; } // optional
        public bool IsCompleted { get; set; }
        public DateTime DateCompletedUtc { get; set; }

        public ApplicationUser UserApprovingCompletion { get; set; }
        public string UserApprovingCompletionId { get; set; }

        public bool IsEditLocked { get; set; }
        public ApplicationUser UserLockingEdit { get; set; }
        public string UserLockingEditId { get; set; }

        public Document Document { get; set; }
        public Guid DocumentId { get; set; }

        public Permit Cont { get; set; }

        public ICollection<DocumentFormField> DocumentFormFields { get; set; }
        public ICollection<DocumentCheckBoxField> DocumentCheckBoxFields { get; set; }
        public ICollection<DocumentSignatureField> DocumentSignatureFields { get; set; }
        public ICollection<PermitSubmittedDocIntermediate> PermitSubmittedDocIntermediates { get; set; }
    }
}
