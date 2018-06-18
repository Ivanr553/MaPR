using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public bool IsSupervisor { get; set; }
    }

    public class DocumentCheckBoxField : DataRowProperties
    {
        public SubmittedDocument SubmittedDocument { get; set; }
        //PK
        public Guid IdSubmittedDocumentId { get; set; }
        public string IdFormName { get; set; }
        //
        public bool FormValue { get; set; }

        public bool IsSupervisor { get; set; }
    }

    public class DocumentSignatureField : DataRowProperties
    {
        public SubmittedDocument SubmittedDocument { get; set; }
        //PK
        public Guid IdSubmittedDocumentId { get; set; }
        public string IdFormName { get; set; }
        //
        [NotMapped]
        public string SignatureValue
        {
            get
            {
                if (SignatureData != null)
                {
                    return Convert.ToBase64String(SignatureData.Data);
                }
                else return null;
            }
        }
        public DateTime DateSignedUtc { get; set; } //Signed stored here becasue they are linked

        public DataStorage SignatureData { get; set; }
        public Guid SignatureDataId { get; set; }

        public bool IsSupervisor { get; set; } // If true, only the owner supervisor can sign this
    }
}
