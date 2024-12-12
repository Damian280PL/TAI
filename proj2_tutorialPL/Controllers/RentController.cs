using Microsoft.AspNetCore.Mvc;
using proj2_tutorialPL.Models;
using System; // dodane dla DateTime
using Microsoft.AspNetCore.Identity; // dodane dla UserManager

namespace proj2_tutorialPL.Controllers
{
	public class RentController : Controller
	{
		private readonly UserManager<UserModel> _userManager; // UserManager do obsługi użytkowników

		public RentController(UserManager<UserModel> userManager)
		{
			_userManager = userManager;
		}

		public IActionResult Index()
		{
			return View();
		}

		public async Task<IActionResult> Rent()
		{
			// Pobieranie aktualnie zalogowanego użytkownika
			var user = await _userManager.GetUserAsync(User);
			if (user == null)
			{
				return Unauthorized(); // Użytkownik nie jest zalogowany
			}

			// Tworzenie obiektu Product
			var product = new Product
			{
				Id = 1,
				Name = "Bmw M6",
				Model = "ZX2",
				Fuel_burning = 6,
				Description = "Super samochód",
				Category = "samochód"
			};


			// Tworzenie obiektu Rent z powiązanym produktem i użytkownikiem
			var rent = new Rent
			{
				Id = 1,
				User = user, // Powiązanie wypożyczenia z użytkownikiem
				Product = product, // Powiązanie produktu z wypożyczeniem
				RentalDate = DateTime.Now, // Data wypożyczenia
				ReturnDate = DateTime.Now.AddDays(7), // Przykładowa data zwrotu po 7 dniach
				RentalCost = 1000, // Koszt wypożyczenia
				Status = "Active" // Status wypożyczenia
			};

			// Zwracamy widok z modelem Rent
			return View(rent);
		}
	}
}
