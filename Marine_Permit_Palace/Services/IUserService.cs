using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Services
{

    public class UserData
    {
        public string dod_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string rank { get; set; }

    }

    public interface IUserService
    {
        List<UserData> FindUsers(string name_or_dod_id);
    }
    public class UserService : IUserService
    {
        ApplicationDbContext _context;
        public UserService(ApplicationDbContext ctx)
        {
            _context = ctx;
        }

        public List<UserData> FindUsers(string name_or_dod_id)
        {
            int dod_id;
            if(int.TryParse(name_or_dod_id, out dod_id))
            {
                //Search using the DoD id
                return _context.Users
                    .Where(e => e.DodIdNumber.ToString().Contains(dod_id.ToString()))
                    .Take(20)
                    .Select(e => new UserData
                    { dod_id = e.DodIdNumber.ToString(),
                        first_name = e.FirstName,
                        last_name = e.LastName,
                        rank = e.Rank
                    })
                    .ToList();
            }
            else
            {
                return _context.Users
                    .Where(e => e.FirstName.Contains(name_or_dod_id) || e.LastName.Contains(name_or_dod_id))
                    .Take(20)
                    .Select(e => new UserData
                    {
                        dod_id = e.DodIdNumber.ToString(),
                        first_name = e.FirstName,
                        last_name = e.LastName,
                        rank = e.Rank
                    })
                    .ToList();
            }
            
        }
    }
}
