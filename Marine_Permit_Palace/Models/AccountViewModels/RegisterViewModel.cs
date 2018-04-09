using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models.AccountViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string dod_id { get; set; }

        [Required]
        public string password { get; set; }


        public string token { get; set; }
    }
}
