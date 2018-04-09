using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public enum TOKEN_TYPE {RANDOM, REGISTER }
    public class StoredToken
    {
        public Guid IdToken { get; set; }
        public string TokenValue { get; set; }
        public string TokenReason { get; set; }
        public string TokenData { get; set; }
        public TOKEN_TYPE TokenType { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
