using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models.AccountViewModels
{
    public class UserInfo
    {
        public string rank { get; set; }
        public string last_name { get; set; }
        public string first_name { get; set; }
        public string middel_name { get; set; }
        public int dod_id { get; set; }
        public DateTime date_of_birth { get; set; }
        public int age { get; set; }
        public string sex { get; set; }
        public decimal height { get; set; }
        public decimal weight { get; set; }
        public string hair_color { get; set; }
        public string eye_color { get; set; }
        public string home_of_record { get; set; }
        public string place_of_birth { get; set; }
        public string civilian_lic_number { get; set; }
        public string civilian_lic_state { get; set; }
        public DateTime civilian_lic_issue_date { get; set; }
        public DateTime CivilianLicExpDate { get; set; }
        public string MedicalCertRequired { get; set; }
        public bool WearsGlasses { get; set; }
        public string Organization { get; set; }
    }
}
