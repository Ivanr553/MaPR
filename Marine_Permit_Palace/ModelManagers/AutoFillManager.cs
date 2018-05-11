using iTextSharp.text.pdf;
using Marine_Permit_Palace.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.ModelManagers
{
    public class AutoFillManager
    {
        public AutoFillManager()
        {

        }

        public static bool AutoFillFromFields(AcroFields Fields, List<DocumentFormField> Forms, List<DocumentCheckBoxField> CheckBoxes, List<DocumentSignatureField> Signatures)
        {
            throw new NotImplementedException();
        }



        public static void AutoFillBasedOnUser(ApplicationUser user, AcroFields Fields)
        {
            Fields.SetField("IDONTEXISTSJSHS", "Hallo", true); // test

            Fields.SetField("last_first_middle", $"{user.LastName}, {user.FirstName}, {user.MiddleName}", true);
            Fields.SetField("rank", user.Rank, true);
            Fields.SetField("dod_id_number", user.DodIdNumber.ToString(), true);
            Fields.SetField("organization", user.Organization, true);
            Fields.SetField("sex", user.Sex, true);
            Fields.SetField("height", user.Height.ToString(), true);
            Fields.SetField("weight", user.Weight.ToString(), true);
            Fields.SetField("eye_color", user.EyeColor, true);
            Fields.SetField("hair_color", user.HairColor, true);
            Fields.SetField("place_of_birth", user.PlaceOfBirth, true);
            Fields.SetField("birth_date_yyyy_mm_dd", $"{user.DateOfBirth.Year}/{user.DateOfBirth.Month}/{user.DateOfBirth.Day}", true);
            Fields.SetField("state_of_issue", user.CivilianLicState, true);
            Fields.SetField("license_number", user.CivilianLicNumber, true);
            Fields.SetField("issue_date_mm_dd_yyyy", $"{user.CivilianLicIssueDate.Month}/{user.CivilianLicIssueDate.Day}/{user.CivilianLicIssueDate.Year}", true);
            Fields.SetField("exp_date_mm_dd_yyyy", $"{user.CivilianLicExpDate.Month}/{user.CivilianLicExpDate.Day}/{user.CivilianLicExpDate.Year}", true);
            Fields.SetField("class_of_vehicle", user.ClassOfVehicle, true);
        }
    }
}
