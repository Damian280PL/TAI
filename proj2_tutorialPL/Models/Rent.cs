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

		// Relacja z tabelą AspNetUsers
		[Required]
		[ForeignKey("User")]
		public string UserId { get; set; }
		public UserModel User { get; set; }

		// Relacja z tabelą Products
		[Required]
		[ForeignKey("Product")]
		public int ProductId { get; set; }
		public Product Product { get; set; }

		// Data wypożyczenia
		[Required(ErrorMessage = "Rental date is required.")]
		public DateTime RentalDate { get; set; }

		// Data zwrotu (może być null, jeśli wypożyczenie trwa)
		public DateTime? ReturnDate { get; set; }

		// Koszt wypożyczenia
		[Required(ErrorMessage = "Rental cost is required.")]
		[Range(0, double.MaxValue, ErrorMessage = "Cost must be a positive number.")]
		public decimal RentalCost { get; set; }

		// Status wypożyczenia (np. "Active", "Completed", "Cancelled")
		[Required(ErrorMessage = "Status is required.")]
		public string Status { get; set; }
	}
}
