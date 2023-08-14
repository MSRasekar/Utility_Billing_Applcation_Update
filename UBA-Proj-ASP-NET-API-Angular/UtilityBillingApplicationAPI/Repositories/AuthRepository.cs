using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using UtilityBillingApplicationAPI.Entites.DTOs.Authentication;
using UtilityBillingApplicationAPI.Entites.Models;
using UtilityBillingApplicationAPI.JWTService;

namespace UtilityBillingApplicationAPI.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UtilityBillingContext _context;
        private readonly JWTHandler _jwtHandler; // Inject JwtHandler

        public AuthRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, UtilityBillingContext context, JWTHandler jwtHandler)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            _jwtHandler = jwtHandler;
        }

        public async Task<IdentityResult> RegisterUserAsync(RegistrationDTO registerUser, string role)
        {
            if (await _roleManager.RoleExistsAsync(role))
            {
                var user = new ApplicationUser
                {
                    UserName = registerUser.Username,
                    Email = registerUser.Email,
                    PhoneNumber = registerUser.Phonenumber,
                    MaritalStatus = registerUser.MaritalStatus,
                    State = registerUser.State,
                    Dob = registerUser.Dob,
                    Gender = registerUser.Gender,
                    AddressLine = registerUser.AddressLine,
                    City = registerUser.City,
                    Pincode = registerUser.Pincode,
                    SecurityStamp = Guid.NewGuid().ToString(),
                };

                var result = await _userManager.CreateAsync(user, registerUser.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, role);

                    var newApplicationStatus = new ApplicationStatus
                    {
                      
                        UserId = user.Id,
                        DateOfRegistration = DateTime.Now,
                        Status = "pending",
                        // other properties
                    };
                   await _context.ApplicationStatus.AddAsync(newApplicationStatus);

                    await _context.SaveChangesAsync();

                    var newMeter = new Meter
                    {

                        UserId = user.Id,
                        ApplicationStatusId = newApplicationStatus.ApplicationStatusId,
                        RequiredLoad = registerUser.RequiredLoad ,
                        ConnectionType = registerUser.ConnectionType,
                        // other properties
                    };
                    _context.Meters.Add(newMeter);

                    await _context.SaveChangesAsync();
                }
                return result;
            }
            return IdentityResult.Failed(new IdentityError { Description = "Role does not exist!" });
        }


        public async Task<SignInResult> LoginUserAsync(LoginDTO loginUser)
        {
            var user = await _userManager.FindByEmailAsync(loginUser.Username);
            if (user == null)
            {
                return SignInResult.Failed;
            }

            var result = await _userManager.CheckPasswordAsync(user, loginUser.Password);
            if (result)
            {
                // Generate JWT token upon successful login
                var token = await GenerateJwtToken(user);
                return SignInResult.Success;
            }

            return SignInResult.Failed;
        }

        public async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var claims = await _jwtHandler.GetClaims(user);
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return token;
        }
    }
}
