using System.ComponentModel.DataAnnotations;

namespace proj2_tutorialPL.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Pole nazwa jest wymagane:")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Pole opis jest wymagane:")]
        public string Model { get; set; }

        [Required(ErrorMessage = "Pole opis jest wymagane:")]
        public int Fuel_burning { get; set; }

        [Required(ErrorMessage = "Pole opis jest wymagane:")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Pole opis jest wymagane:")]
        public string Category { get; set; }

        [Required(ErrorMessage = "Pole ilość miejsc jest wymagane.")]
        [Range(1, 20, ErrorMessage = "Ilość miejsc musi być między 1 a 20.")]
        public int Seats { get; set; }

        [Required(ErrorMessage = "Pole skrzynia biegów jest wymagane.")]
        [RegularExpression("^(manualna|automatyczna)$", ErrorMessage = "Skrzynia biegów może być tylko 'manualna' lub 'automatyczna'.")]
        public string Transmission { get; set; }

        [Required(ErrorMessage = "Pole cena wypożyczenia jest wymagane.")]
        [Range(0, double.MaxValue, ErrorMessage = "Cena wypożyczenia musi być dodatnia.")]
        public decimal RentalPricePerDay { get; set; }

        [Required(ErrorMessage = "Pole kolor jest wymagane.")]
        public string Color { get; set; }
    }
}

