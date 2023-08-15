using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using UtilityBillingApplicationAPI.Entites.DTOs.Authentication;
using UtilityBillingApplicationAPI.Entites.DTOs;
using UtilityBillingApplicationAPI.Entites.Models;
using UtilityBillingApplicationAPI.Repositories;

namespace UtilityBillingApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthRepository _authRepository;

        public AuthenticationController(UserManager<ApplicationUser> userManager, IAuthRepository authRepository)
        {
            _userManager = userManager;
            _authRepository = authRepository;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationDTO registerUser)
        {
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);

            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new ResponseDTO { Status = "Error", Message = "User already exists!" });
            }

            var result = await _authRepository.RegisterUserAsync(registerUser);

            if (result.Succeeded)
            {
                return StatusCode(StatusCodes.Status201Created, new ResponseDTO { Status = "Success", Message = "User created Successfully!" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseDTO { Status = "Error", Message = "User registration failed!" });
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginUser)
        {
            var result = await _authRepository.LoginUserAsync(loginUser);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(loginUser.Email);
                var token = await _authRepository.GenerateJwtToken(user);

                return Ok(new AuthResponseDTO { IsAuthSuccessful = true, Token = token });
            }
            else
            {
                return Unauthorized(new AuthResponseDTO { ErrorMessage = "Invalid Authentication" });
            }
        }
    }
}
