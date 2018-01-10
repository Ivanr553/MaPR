using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class SubmittedDocument : UserEditableDataRowProperties
    {
        [Column("id_submitted_document")]
        public Guid IdSubmittedDocument { get; set; }
        [Column("signed_by")]
        public string SignedBy { get; set; }



        public Document Document { get; set; }
        [Column("document_id")]
        public Guid DocumentId { get; set; }

        public ICollection<UserDocumentIntermediate> UserDocIntermediates { get; set; }
    }
}
