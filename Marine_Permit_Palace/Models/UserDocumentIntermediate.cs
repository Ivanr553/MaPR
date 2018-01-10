using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class UserDocumentIntermediate : DataRowProperties
    {
        public ApplicationUser User { get; set; }
        [Column("user_id")]
        public string UserId { get; set; }
        public SubmittedDocument SubmittedDocument { get; set; }
        [Column("submitted_document_id")]
        public Guid SubmittedDocumentId { get; set; }
    }
}
