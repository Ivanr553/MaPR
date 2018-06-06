using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class Document : UserEditableDataRowProperties
    {
        public Document()
        {
            SubmittedDocuments = new HashSet<SubmittedDocument>();
            PermitDocumentRequirements = new HashSet<PermitDocumentRequirement>();
        }
        //PK
        public Guid IdDocument { get; set; }
        //
        public string Name { get; set; }
        public string TemplateName { get; set; }

        public Category Category { get; set; }
        public Guid CategoryId { get; set; }

        public ICollection<SubmittedDocument> SubmittedDocuments { get; set; }
        public ICollection<PermitDocumentRequirement> PermitDocumentRequirements { get; set; }

        ///TODO 
        ///Add document tags
    }
}
