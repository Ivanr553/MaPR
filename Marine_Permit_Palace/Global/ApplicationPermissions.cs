using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Global
{
    public static class ApplicationPermissions
    {
        public const string SOFTWARE_MANIPULATE_ROW_ID = "9FC06D83-4993-431A-95A6-1F2162D8BD1B";

        public const string ROLE_MARINE = "Marine";
        public const string ROLE_SUPERVISOR = "Supervisor";
        public const string ROLE_DOD_ADMIN = "DOD_Admin";

        public static List<AppRole> GetAllRoles()
        {
            List<AppRole> Result = new List<AppRole>();
            AppRole Marine = new AppRole(ROLE_MARINE, "Basic User");
            Result.Add(Marine);
            AppRole Supervisor = new AppRole(ROLE_SUPERVISOR, "Basic User Superior");
            Result.Add(Supervisor);
            AppRole Admin = new AppRole(ROLE_DOD_ADMIN, "Application Admin");
            Result.Add(Admin);
            return Result;
        }
    }

    public class AppRole
    {
        public AppRole(string name, string desc)
        {
            Name = name;
            Description = desc;
        }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class AppClaim
    {

    }

}
