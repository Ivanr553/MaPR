using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class PermitSubmittedDocIntermediate : DataRowProperties
    {
        public Permit Permit { get; set; }
        public SubmittedDocument SubmittedDocument { get; set; }
        //PK
        public Guid IdPermitId { get; set; }
        public Guid IdSubmittedDocumentId { get; set; }
        //
    }
}
