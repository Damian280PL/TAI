using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace proj2_tutorialPL.Models
{
    public class Rent
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Driver")]
        public int? DriverId { get; set; } // Zmieniono na nullable

        [ForeignKey("Product")]
        public int? ProductId { get; set; } // Zmieniono na nullable

        [Required]
        public DateTime RentalDate { get; set; }

        public DateTime? ReturnDate { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal RentalCost { get; set; }

        [Required]
        public string Status { get; set; } = "nieopłacony";

        [Required]
        [Range(1, 3)]
        public int ProtectionPackage { get; set; }

        [Required]
        public string UserSub { get; set; }

        public Driver? Driver { get; set; } // Navigation property jest również nullable
        public Product? Product { get; set; } // Navigation property jest również nullable
    }
}
