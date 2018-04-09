using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Global
{
    public static class HelperFunctions
    {
        public static string GenerateRandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789qwertyuiopasdfghjklzxcvbnm#$!?()";
            return new string(Enumerable.Repeat(chars, length)
             .Select(s => s[random.Next(s.Length)]).ToArray());

        }
    }
}
