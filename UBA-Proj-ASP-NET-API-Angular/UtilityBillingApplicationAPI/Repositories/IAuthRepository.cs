using Microsoft.AspNetCore.Identity;
using UtilityBillingApplicationAPI.Entites.DTOs.Authentication;
using UtilityBillingApplicationAPI.Entites.Models;

namespace UtilityBillingApplicationAPI.Repositories
{
    public interface IAuthRepository
    {
        Task<IdentityResult> RegisterUserAsync(RegistrationDTO registerUser);

        // implement login method to return a token for the user to use for authentication  
        Task<SignInResult> LoginUserAsync( LoginDTO loginUser);

        Task<string> GenerateJwtToken(ApplicationUser user);
    }
}
