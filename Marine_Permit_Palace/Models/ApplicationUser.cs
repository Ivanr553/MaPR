using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Marine_Permit_Palace.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string Rank { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public int DodIdNumber { get; set; }
        public string DOB10964 { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public string HairColor { get; set; }
        public string EyeColor { get; set; }
        public string HomeOfRecord { get; set; }
        public string PlaceOfBirth { get; set; }
        public string ClassOfVehicle { get; set; }
        public string CivilianLicNumber { get; set; }
        public string CivilianLicState { get; set; }
        public DateTime CivilianLicIssueDate { get; set; }
        public DateTime CivilianLicExpDate { get; set; }
        public string MedicalCertRequired { get; set; }
        public bool WearsGlasses { get; set; }
        public string Organization { get; set; }

        public ICollection<UserDocumentIntermediate> UserDocIntermediates { get; set; }
    }
}
