using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class UserDocumentCategory : UserEditableDataRowProperties
    {
        public ApplicationUser UserInCategory { get; set; }
        public Category Category { get; set; }
        //PK
        public string IdUserInCategoryId { get; set; }
        public Guid IdCategoryId { get; set; }
        //

        public ApplicationUser UserApprovingLink { get; set; }
        public string UserApprovingLinkId { get; set; }
    }
}
