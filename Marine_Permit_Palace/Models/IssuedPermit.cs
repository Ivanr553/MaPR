using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class IssuedPermit : DataRowProperties
    {
        public ApplicationUser UserIssued { get; set; }
        public Permit PermitIssued { get; set; }
        //PK
        public Guid IdPermitId { get; set; }
        public string IdUserIssuedId { get; set; }
        //
        
        public ApplicationUser Issuer { get; set; }
        public string IssuerId { get; set; }

        public DateTime DateIssuedUtc { get; set; }
    }
}
