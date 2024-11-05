using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using proj2_tutorialPL.Models;
using System.Threading.Tasks;

namespace proj2_tutorialPL.Controllers
{
	[ApiController]
	[Route("Account")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<UserModel> _userManager;
		private readonly SignInManager<UserModel> _signInManager;

		public AccountController(UserManager<UserModel> userManager, SignInManager<UserModel> signInManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
		}

		[HttpPost("Register")]
		public async Task<IActionResult> Register([FromBody] Register userRegisterData)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var newUser = new UserModel
			{
				Email = userRegisterData.Email,
				UserName = userRegisterData.UserName
			};

			var result = await _userManager.CreateAsync(newUser, userRegisterData.Password);
			if (!result.Succeeded)
			{
				return BadRequest(result.Errors);
			}

			await _userManager.AddToRoleAsync(newUser, "Admin");
			return Ok(new { Message = "Registration successful!" });
		}

		[HttpPost("Login")]
		public async Task<IActionResult> Login([FromBody] Login userLoginData)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var result = await _signInManager.PasswordSignInAsync(userLoginData.UserName, userLoginData.Password, false, false);
			if (!result.Succeeded)
			{
				return Unauthorized(new { Message = "Invalid login attempt." });
			}

			return Ok(new { Message = "Login successful!" });
		}

		[HttpGet("Logout")]
		public async Task<IActionResult> Logout()
		{
			await _signInManager.SignOutAsync();
			return Ok(new { Message = "Logout successful!" });
		}
	}
}
