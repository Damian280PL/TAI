using System.ComponentModel.DataAnnotations;

namespace proj2_tutorialPL.Models
{
    public class Product
    {
		[Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Pole nazwa jest wymagane:")]
        public string Name { get; set; }
		[Required(ErrorMessage = "Pole opis jest wymagane:")]

		public string Model { get; set; }
		[Required(ErrorMessage = "Pole opis jest wymagane:")]

		public int Fuel_burning { get; set; }
		[Required(ErrorMessage = "Pole opis jest wymagane:")]

		public string Description { get; set; }
		[Required(ErrorMessage = "Pole opis jest wymagane:")]

		public string Category { get; set; }
		
	}
}
