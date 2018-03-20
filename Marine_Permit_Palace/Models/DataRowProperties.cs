using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class DataRowProperties
    {
        public DateTime DateCreatedUtc { get; set; }
        public DateTime DateLastModifiedUtc { get; set; }
        public DateTime? DeleteCommissionDateUtc { get; set; }
        public DateTime? DateInactivatedUtc { get; set; }
        public bool IsDelete { get; set; }
        public bool IsActive { get; set; }
    }

    public class UserEditableDataRowProperties : DataRowProperties
    {
        public ApplicationUser CreatedBy { get; set; }
        public string CreatedById { get; set; }
        public ApplicationUser LastModifiedBy { get; set; }
        public string LastModifiedById { get; set; }
    }
}
