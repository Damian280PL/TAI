using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using proj2_tutorialPL.Models;

namespace proj2_tutorialPL.Models
{
	public class Rent
	{
		[Key]
		public int Id { get; set; }

	
		[Required]
		[ForeignKey("User")]
		public string UserId { get; set; }
		public UserModel User { get; set; }

		[Required]
		[ForeignKey("Product")]
		public int ProductId { get; set; }
		public Product Product { get; set; }

		
		[Required(ErrorMessage = "Rental date is required.")]
		public DateTime RentalDate { get; set; }


		public DateTime? ReturnDate { get; set; }

		[Required(ErrorMessage = "Rental cost is required.")]
		[Range(0, double.MaxValue, ErrorMessage = "Cost must be a positive number.")]
		public decimal RentalCost { get; set; }

		[Required(ErrorMessage = "Status is required.")]
		public string Status { get; set; }
	}
}
