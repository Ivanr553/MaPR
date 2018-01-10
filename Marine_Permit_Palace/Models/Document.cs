using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class Document : UserEditableDataRowProperties
    {
        [Column("id_document")]
        public Guid IdDocument { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("template_name")]
        public string TemplateName { get; set; }

        public ICollection<SubmittedDocument> RefrencedSubmittedDocuments { get; set; }
    }
}
