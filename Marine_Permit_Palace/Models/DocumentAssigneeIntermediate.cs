using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class DocumentAssigneeIntermediate : DataRowProperties
    {
        //PK
        public ApplicationUser Assignee { get; set; }
        public string IdAssigneeId { get; set; }

        public SubmittedDocument ActiveDocument { get; set; }
        public Guid IdActiveDocumentId { get; set; }
        //
        public bool IsAllowedEdit { get; set; }
        public bool IsAllowedApprove { get; set; }
        public bool IsAllowedSubmit { get; set; }
        public bool IsAllowedAssignFields { get; set; }
    }
}
