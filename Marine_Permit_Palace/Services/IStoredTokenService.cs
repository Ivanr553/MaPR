using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Global;
using Marine_Permit_Palace.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Services
{
    public interface IStoredTokenService
    {
        StoredToken UseToken(string TokenValue);
        StoredToken Get(string TokenValue);
        StoredToken GenerateNewToken(string TokenReason, TOKEN_TYPE type, string TokenData = null, DateTime? ExpirationDate = null);
    }
    public class StoredTokenService : IStoredTokenService
    {
        ApplicationDbContext _context;
        public StoredTokenService(ApplicationDbContext ctx)
        {
            _context = ctx;
        }

        public StoredToken GenerateNewToken(string TokenReason, TOKEN_TYPE type, string TokenData = null, DateTime? ExpirationDate = null)
        {
            StoredToken tk = new StoredToken();
            tk.ExpirationDate = ExpirationDate ?? DateTime.Now.AddDays(1);
            tk.TokenData = TokenData;
            tk.TokenReason = TokenReason;
            tk.TokenType = type;
            tk.TokenValue = HelperFunctions.GenerateRandomString(15);

            try
            {
                tk = _context.StoredToken.Add(tk).Entity;
                _context.SaveChanges();
                return tk;

            }
            catch
            {
                return null;
            }
        }

        public StoredToken Get(string TokenValue)
        {
            return _context.StoredToken.FirstOrDefault(e => e.TokenValue == TokenValue);
        }

        public StoredToken UseToken(string TokenValue)
        {
            StoredToken token = _context.StoredToken.FirstOrDefault(e => e.TokenValue == TokenValue);
            _context.StoredToken.Remove(token);
            _context.SaveChanges();
            return token;
        }
    }
}
