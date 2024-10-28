using System.ComponentModel.DataAnnotations;

namespace proj2_tutorialPL.Models
{
	public class Login
	{
		[Required]
		public string UserName { get; set; }
		[Required]
		public string Password { get; set; }
	}
}
