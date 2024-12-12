using Microsoft.AspNetCore.Mvc;
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proj2_tutorialPL.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProductController : ControllerBase
	{
		private readonly IWarehouseService _warehouseService;

		public ProductController(IWarehouseService warehouseService)
		{
			_warehouseService = warehouseService ?? throw new ArgumentNullException(nameof(warehouseService));
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
		{
			var productList = await _warehouseService.GetAllAsync();
			return Ok(productList); // Returns a JSON response
		}

		[HttpGet("search")]
		public async Task<ActionResult<IEnumerable<Product>>> SearchProducts(string searchString)
		{
			var productList = await _warehouseService.GetAllAsync();

			if (!string.IsNullOrEmpty(searchString))
			{
				var lowerCaseSearchString = searchString.ToLower();
				productList = productList
					.Where(n => n.Name != null && n.Model != null &&
								(n.Name.ToLower().Contains(lowerCaseSearchString) ||
								 n.Model.ToLower().Contains(lowerCaseSearchString)))
					.ToList();
			}

			return Ok(productList); // Returns the filtered products as JSON
		}
	}
}
