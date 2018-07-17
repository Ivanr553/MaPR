using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Models.AccountViewModels;
using Marine_Permit_Palace.Services;
using Marine_Permit_Palace.Global;

namespace Marine_Permit_Palace.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;
        private readonly IStoredTokenService _StoredToken;
        private readonly IUserService _UserService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            IUserService ius,
            IStoredTokenService ists,
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _StoredToken = ists;
            _emailSender = emailSender;
            _UserService = ius;
            _logger = logger;
        }

        [TempData]
        public string ErrorMessage { get; set; }

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> Login(string returnUrl = null)
        //{
        //    string yp = GenerateRegistrationToken(ApplicationPermissions.ROLE_DOD_ADMIN);
        //    // Clear the existing external cookie to ensure a clean login process
        //    await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

        //    ViewData["ReturnUrl"] = returnUrl;
        //    return View();
        //}


        [HttpGet]
        [AllowAnonymous]
        public JsonResult FindUsers(string search)
        {
            //Users can search by a name or DoD ID
            return Json(_UserService.FindUsers(search));
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                var user = await _userManager.FindByNameAsync(model.dod_id);
                if(user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(model.dod_id, model.password, model.remember_me, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation("User logged in.");
                        return Json(new Result());
                    }
                    if (result.IsLockedOut)
                    {
                        _logger.LogWarning("User account locked out.");
                        return Json(new Result("Locked Out", "User is locked out.", 401));
                    }
                    else
                    {
                        return Json(new Result("Failure", "Invalid Login Attempt", 401));
                    }
                }
                else
                {
                    //This is a new DoD Id Number -- Will Need to Register
                    return Json(new Result("NotRegistered", "DoD currently does not exist in the system. Use RegisterAndLogin API call", 401));
                }
            }
            // If we got this far, something failed
            return Json(new Result("Failure", "Invalid Login Attempt", 401));
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterAndLogin([FromBody]RegisterAndLoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                var user = await _userManager.FindByNameAsync(model.dod_id);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(model.dod_id, model.password, model.remember_me, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation("User logged in.");
                        return Json(new Result());
                    }
                    if (result.IsLockedOut)
                    {
                        _logger.LogWarning("User account locked out.");
                        return Json(new Result("Locked Out", "User is locked out.", 401));
                    }
                    else
                    {
                        return Json(new Result("Failure", "Invalid Login Attempt", 401));
                    }
                }
                else
                {
                    //Register user
                    user = new ApplicationUser { UserName = model.dod_id.ToString(), Email = model.email };
                    var result = await _userManager.CreateAsync(user, model.password);
                    if (result.Succeeded)
                    {
                        _logger.LogInformation("User created a new account with password.");

                        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                        await _emailSender.SendEmailConfirmationAsync(model.email, callbackUrl);
                        //Each user is a marine
                        await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_MARINE);

                        //if (Token != null) // Verify which other roles the user is in
                        //{
                        //    if (Token.TokenData == ApplicationPermissions.ROLE_SUPERVISOR)
                        //    {
                        //        await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_SUPERVISOR);
                        //    }
                        //    if (Token.TokenData == ApplicationPermissions.ROLE_DOD_ADMIN)
                        //    {
                        //        await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_SUPERVISOR);
                        //        await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_DOD_ADMIN);
                        //    }
                        //}

                        await _signInManager.SignInAsync(user, isPersistent: true);
                        return Json(new Result());
                    }
                    else
                    {
                        string result_error = "";
                        result.Errors.Select(e => e.Description).ToList().ForEach(e => result_error += e + "; ");
                        return Json(new Result("Failure", $"User Could Not Be Created: {result_error}", 406));
                    }
                }
            }
            // If we got this far, something failed
            return Json(new Result("Failure", "Invalid Login Attempt Or Invliad JSON model.", 401));
        }
        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<IActionResult> LoginWith2fa(bool rememberMe, string returnUrl = null)
        //{
        //    // Ensure the user has gone through the username & password screen first
        //    var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

        //    if (user == null)
        //    {
        //        throw new ApplicationException($"Unable to load two-factor authentication user.");
        //    }

        //    var model = new LoginWith2faViewModel { RememberMe = rememberMe };
        //    ViewData["ReturnUrl"] = returnUrl;

        //    return View(model);
        //}

        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> LoginWith2fa(LoginWith2faViewModel model, bool rememberMe, string returnUrl = null)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(model);
        //    }

        //    var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
        //    if (user == null)
        //    {
        //        throw new ApplicationException($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
        //    }

        //    var authenticatorCode = model.TwoFactorCode.Replace(" ", string.Empty).Replace("-", string.Empty);

        //    var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(authenticatorCode, rememberMe, model.RememberMachine);

        //    if (result.Succeeded)
        //    {
        //        _logger.LogInformation("User with ID {UserId} logged in with 2fa.", user.Id);
        //        return RedirectToLocal(returnUrl);
        //    }
        //    else if (result.IsLockedOut)
        //    {
        //        _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
        //        return RedirectToAction(nameof(Lockout));
        //    }
        //    else
        //    {
        //        _logger.LogWarning("Invalid authenticator code entered for user with ID {UserId}.", user.Id);
        //        ModelState.AddModelError(string.Empty, "Invalid authenticator code.");
        //        return View();
        //    }
        //}

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithRecoveryCode(string returnUrl = null)
        {
            // Ensure the user has gone through the username & password screen first
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            ViewData["ReturnUrl"] = returnUrl;

            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginWithRecoveryCode(LoginWithRecoveryCodeViewModel model, string returnUrl = null)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                throw new ApplicationException($"Unable to load two-factor authentication user.");
            }

            var recoveryCode = model.RecoveryCode.Replace(" ", string.Empty);

            var result = await _signInManager.TwoFactorRecoveryCodeSignInAsync(recoveryCode);

            if (result.Succeeded)
            {
                _logger.LogInformation("User with ID {UserId} logged in with a recovery code.", user.Id);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User with ID {UserId} account locked out.", user.Id);
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                _logger.LogWarning("Invalid recovery code entered for user with ID {UserId}", user.Id);
                ModelState.AddModelError(string.Empty, "Invalid recovery code entered.");
                return View();
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Lockout()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register(string token = null, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            ViewData["Token"] = token;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model, string returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            if (ModelState.IsValid)
            {
                StoredToken Token = null;
                if(!string.IsNullOrEmpty(model.token))
                {
                    //Grab the token and verify that this token is valid (Then grab the Role)
                    Token = _StoredToken.UseToken(model.token);
                }
                var user = new ApplicationUser { UserName = model.dod_id.ToString(), Email = model.email };
                var result = await _userManager.CreateAsync(user, model.password);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User created a new account with password.");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    await _emailSender.SendEmailConfirmationAsync(model.email, callbackUrl);
                    //Each user is a marine
                    await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_MARINE);

                    if(Token != null) // Verify which other roles the user is in
                    {
                        if(Token.TokenData == ApplicationPermissions.ROLE_SUPERVISOR)
                        {
                            await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_SUPERVISOR);
                        }
                        if(Token.TokenData == ApplicationPermissions.ROLE_DOD_ADMIN)
                        {
                            await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_SUPERVISOR);
                            await _userManager.AddToRoleAsync(user, ApplicationPermissions.ROLE_DOD_ADMIN);
                        }
                    }
                    
                    await _signInManager.SignInAsync(user, isPersistent: true);
                    return Json(new Result(reason: returnUrl));
                }
                else
                {
                    string result_error = "";
                    result.Errors.Select(e => e.Description).ToList().ForEach(e => result_error += e + "; " );
                    return Json(new Result("Failure", $"User Could Not Be Created: {result_error}", 406));
                }
            }
            // If we got this far, something failed, redisplay form
            return Json(new Result("Failure", "Received Json Object did not meet required format.", 406));
        }

       

        /// <summary>
        /// Checks to verify the user is either in the same role or a higher role.
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        private string GenerateRegistrationToken(string role)
        {
            ///Verify the user is in the role they are trying to assign
            if (true)//User.IsInRole(role))
            {
                StoredToken RegisterToken = _StoredToken.GenerateNewToken("Manual Registration", TOKEN_TYPE.REGISTER, role);

                return Url.Action("Register", new { token = RegisterToken.TokenValue });
            }
            else return null;
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<JsonResult> Logout()
        //{
        //    await _signInManager.SignOutAsync();
        //    _logger.LogInformation("User logged out.");
        //    return Json(new Result()
        //    {
        //        reason = "User logged out.",
        //        result = "Success",
        //        status_code = 200
        //    });
        //}

        [HttpGet]
        [AllowAnonymous]
        public JsonResult WhoAmI()
        {
            if(User.Identity.IsAuthenticated)
            {
                return Json(new {username = User.Identity.Name});
            }
            else
            {
                return Json(false);
            }
        }

        [HttpGet]
        public async Task<JsonResult> Logout()
        {
            if(User.Identity.IsAuthenticated)
            {
                await _signInManager.SignOutAsync();
                _logger.LogInformation("User logged out.");
            }
            return Json(true);
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ErrorMessage = $"Error from external provider: {remoteError}";
                return RedirectToAction(nameof(Login));
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return RedirectToAction(nameof(Login));
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in with {Name} provider.", info.LoginProvider);
                return RedirectToLocal(returnUrl);
            }
            if (result.IsLockedOut)
            {
                return RedirectToAction(nameof(Lockout));
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                ViewData["ReturnUrl"] = returnUrl;
                ViewData["LoginProvider"] = info.LoginProvider;
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                return View("ExternalLogin", new ExternalLoginViewModel { Email = email });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ExternalLoginConfirmation(ExternalLoginViewModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await _signInManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    throw new ApplicationException("Error loading external login information during confirmation.");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await _userManager.AddLoginAsync(user, info);
                    if (result.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        _logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewData["ReturnUrl"] = returnUrl;
            return View(nameof(ExternalLogin), model);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ApplicationException($"Unable to load user with ID '{userId}'.");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return RedirectToAction(nameof(ForgotPasswordConfirmation));
                }

                // For more information on how to enable account confirmation and password reset please
                // visit https://go.microsoft.com/fwlink/?LinkID=532713
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.ResetPasswordCallbackLink(user.Id, code, Request.Scheme);
                await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                return RedirectToAction(nameof(ForgotPasswordConfirmation));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string code = null)
        {
            if (code == null)
            {
                throw new ApplicationException("A code must be supplied for password reset.");
            }
            var model = new ResetPasswordViewModel { Code = code };
            return View(model);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction(nameof(ResetPasswordConfirmation));
            }
            AddErrors(result);
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }


        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        #endregion
    }

    public class Result
    {
        public Result(string result = "Success", string reason = "", int statusCode = 200)
        {
            this.result = result;
            this.reason = reason;
            this.status_code = statusCode;
        }
        public string result { get; set; }
        public string reason { get; set; }
        public int status_code { get; set; } 
    }
}
