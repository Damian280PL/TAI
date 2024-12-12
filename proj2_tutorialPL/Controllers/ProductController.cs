using Microsoft.AspNetCore.Mvc;
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services.Interfaces;
using System.Collections.Generic;
using System.IO;
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
            _warehouseService = warehouseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _warehouseService.GetAllAsync();

            // Convert PicturePath to Base64 if exists
            var result = products.Select(product => new
            {
                product.Id,
                product.Name,
                product.Model,
                product.Fuel_burning,
                product.Description,
                product.Category,
                product.Seats,
                product.Transmission,
                product.RentalPricePerDay,
                product.Color,
                PicturePath = !string.IsNullOrEmpty(product.PicturePath)
                    ? Convert.ToBase64String(System.IO.File.ReadAllBytes(product.PicturePath))
                    : null
            });

            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await _warehouseService.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            // Convert PicturePath to Base64 if exists
            if (!string.IsNullOrEmpty(product.PicturePath))
            {
                product.PicturePath = Convert.ToBase64String(System.IO.File.ReadAllBytes(product.PicturePath));
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct([FromForm] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "C:/Users/damia/Downloads");
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                product.PicturePath = $"C:/Users/damia/Downloads/{uniqueFileName}";
            }

            var productId = await _warehouseService.SaveAsync(product);
            return CreatedAtAction(nameof(GetProductById), new { id = productId }, product);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] Product updatedProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProduct = await _warehouseService.GetByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound("Product not found.");
            }

            // Update fields
            existingProduct.Name = updatedProduct.Name;
            existingProduct.Model = updatedProduct.Model;
            existingProduct.Category = updatedProduct.Category;
            existingProduct.Transmission = updatedProduct.Transmission;
            existingProduct.Seats = updatedProduct.Seats;
            existingProduct.Fuel_burning = updatedProduct.Fuel_burning;
            existingProduct.RentalPricePerDay = updatedProduct.RentalPricePerDay;
            existingProduct.Color = updatedProduct.Color;

            // Handle picture
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "C:/Users/damia/Downloads");
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Create folder if it doesn't exist
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                existingProduct.PicturePath = $"C:/Users/damia/Downloads/{uniqueFileName}";
            }

            await _warehouseService.UpdateAsync(existingProduct);
            return NoContent();
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _warehouseService.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            await _warehouseService.DeleteAsync(id);
            return NoContent();
        }
    }
}
