using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class DocumentFormField : DataRowProperties
    {
        public SubmittedDocument SubmittedDocument { get; set; }
        //PK
        public Guid IdSubmittedDocumentId { get; set; }
        public string IdFormName { get; set; }
        //
        public string FormValue { get; set; }
    }

    public class DocumentCheckBoxField : DataRowProperties
    {
        public SubmittedDocument SubmittedDocument { get; set; }
        //PK
        public Guid IdSubmittedDocumentId { get; set; }
        public string IdFormName { get; set; }
        //
        public bool FormValue { get; set; }
    }

    public class DocumentSignatureField : DataRowProperties
    {
        public SubmittedDocument SubmittedDocument { get; set; }
        //PK
        public Guid IdSubmittedDocumentId { get; set; }
        public string IdFormName { get; set; }
        //
        public string SignatureValue { get; set; }
        public DateTime DateSignedUtc { get; set; } //Signed stored here becasue they are linked
    }
}
