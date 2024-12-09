using System.ComponentModel.DataAnnotations;

    namespace proj2_tutorialPL.Models
    {
        public class Driver
        {
            [Key]
            public int Id { get; set; }

            [Required(ErrorMessage = "Imię jest wymagane.")]
            public string FirstName { get; set; }

            [Required(ErrorMessage = "Nazwisko jest wymagane.")]
            public string LastName { get; set; }

            [Required(ErrorMessage = "E-mail jest wymagany.")]
            [EmailAddress(ErrorMessage = "Niepoprawny format adresu e-mail.")]
            public string Email { get; set; }

            [Required(ErrorMessage = "Telefon jest wymagany.")]
            [Phone(ErrorMessage = "Niepoprawny format numeru telefonu.")]
            public string Phone { get; set; }

            public string Pesel { get; set; }

            [Required(ErrorMessage = "Nr prawa jazdy jest wymagany.")]
            public string DrivingLicenseNumber { get; set; }

            // Dane adresowe
            [Required(ErrorMessage = "Ulica i numer domu/lokalu są wymagane.")]
            public string Street { get; set; }

            [Required(ErrorMessage = "Kod pocztowy jest wymagany.")]
            [RegularExpression(@"^\d{2}-\d{3}$", ErrorMessage = "Kod pocztowy powinien być w formacie XX-XXX.")]
            public string PostalCode { get; set; }

            [Required(ErrorMessage = "Miasto jest wymagane.")]
            public string City { get; set; }
        }
    }


