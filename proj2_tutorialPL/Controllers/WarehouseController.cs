using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services.Interfaces;

namespace proj2_tutorialPL.Controllers
{
	
	public class WarehouseController : Controller
	{
		private readonly IWarehouseService _warehouseService;

		public WarehouseController(IWarehouseService warehouseService)
        {
			_warehouseService = warehouseService;

		}
        public IActionResult Index()
		{
			return View();
		}
		[HttpGet]
		public IActionResult Add()
		{
			return View();
		}
		[HttpPost]

		
		public IActionResult Add(Product body)
		{
			
			if(!ModelState.IsValid)
			{
				return View(body);//po wyrzuceniu error wpisane dane zostana w formularzu
			}

			var id = _warehouseService.SaveAsync(body);

			TempData["ProductID"] = id;

			return RedirectToAction("List");
		}
		[HttpGet]
		public IActionResult List()
		{
			var products = _warehouseService.GetAll();
			return View(products);
		}
		[HttpGet]
		public IActionResult Details(int id)
		{
			var product= _warehouseService.Get(id); 
			return View(product);
		}
		[HttpPost]
		public IActionResult Delete(int id)
		{
			_warehouseService.DeleteAsync(id);
			return RedirectToAction("List");
		}
	}
	
	
}
