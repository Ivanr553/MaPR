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

    public class RegisterAndLoginViewModel
    {
        [Required]
        public string dod_id { get; set; }

        [Required]
        public string password { get; set; }

        [Required, Compare("password", ErrorMessage = "Confirm password doesn't match the password, please try again.")]
        public string confirm_password { get; set; }

        [Required, EmailAddress]
        public string email { get; set; }

        public bool remember_me { get; set; }
    }
}
