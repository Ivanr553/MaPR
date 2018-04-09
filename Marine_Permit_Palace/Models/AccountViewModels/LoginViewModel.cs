using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string dod_id { get; set; }

        [Required]
        public string password { get; set; }

        public bool remember_me { get; set; }
    }
}
