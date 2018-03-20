using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class PermitDocumentRequirement : UserEditableDataRowProperties
    {
        public Permit Permit { get; set; }
        public Document Document { get; set; }
        //PK
        public Guid IdPermitId { get; set; }
        public Guid IdDocumentId { get; set; }
        //


    }
}
