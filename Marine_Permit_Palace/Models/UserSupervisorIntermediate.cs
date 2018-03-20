using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class UserSupervisorIntermediate : UserEditableDataRowProperties
    {
        public ApplicationUser Supervisor { get; set; }
        public ApplicationUser User { get; set; }
        //PK
        public string IdSupervisorId { get; set; }
        public string IdUserId { get; set; }
        //PK
    }
}
