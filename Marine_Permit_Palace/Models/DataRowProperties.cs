using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class DataRowProperties
    {
        [Column("date_created_utc")]
        public DateTime DateCreatedUtc { get; set; }
        [Column("date_last_modified_utc")]
        public DateTime DateLastModifiedUtc { get; set; }
        [Column("delete_comission_date_utc")]
        public DateTime? DeleteCommissionDateUtc { get; set; }
        [Column("date_inactivated_utc")]
        public DateTime? DateInactivatedUtc { get; set; }
        [Column("is_delete")]
        public bool IsDelete { get; set; }
        [Column("is_active")]
        public bool IsActive { get; set; }
    }

    public class UserEditableDataRowProperties : DataRowProperties
    {
        public ApplicationUser CreatedBy { get; set; }
        [Column("created_by_id")]
        public string CreatedById { get; set; }
        public ApplicationUser LastModifiedBy { get; set; }
        [Column("last_modified_by_id")]
        public string LastModifiedById { get; set; }
    }
}
