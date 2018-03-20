using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class Permit : UserEditableDataRowProperties
    {
        public Permit()
        {
            IssuedPermits = new HashSet<IssuedPermit>();
            PermitDocumentRequirements = new HashSet<PermitDocumentRequirement>();
            PermitSubmittedDocIntermediates = new HashSet<PermitSubmittedDocIntermediate>();
        }
        //PK
        public Guid IdPermit { get; set; }
        //
        public string Name { get; set; }
        public string Description { get; set; }
        public int NumberOfDaysValid { get; set; }

        public ICollection<IssuedPermit> IssuedPermits { get; set; }
        public ICollection<PermitDocumentRequirement> PermitDocumentRequirements { get; set; }
        public ICollection<PermitSubmittedDocIntermediate> PermitSubmittedDocIntermediates { get; set; }
    }
}
