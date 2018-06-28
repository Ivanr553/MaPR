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
        /// <summary>
        /// The user assigned to this field
        /// </summary>
        public ApplicationUser Assignee { get; set; }
        public string AssigneeId { get; set; }
        public bool IsCompleted { get; set; }
    }

    public class DocumentCheckBoxField : DataRowProperties
    {
        public SubmittedDocument SubmittedDocument { get; set; }
        //PK
        public Guid IdSubmittedDocumentId { get; set; }
        public string IdFormName { get; set; }
        //
        public bool FormValue { get; set; }

        /// <summary>
        /// The user assigned to this field
        /// </summary>
        public ApplicationUser Assignee { get; set; }
        public string AssigneeId { get; set; }
        public bool IsCompleted { get; set; }
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

        /// <summary>
        /// The user assigned to this field
        /// </summary>
        public ApplicationUser Assignee { get; set; }
        public string AssigneeId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
