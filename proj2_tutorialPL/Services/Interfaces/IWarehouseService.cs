using Microsoft.EntityFrameworkCore;
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services;
using proj2_tutorialPL.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace proj2_tutorialPL.Services
{
    public class WarehouseService : IWarehouseService
    {
        private readonly DbTestContext _context;

        public WarehouseService(DbTestContext context)
        {
            _context = context;
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product), "Product not found for deletion.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public Product Get(int id)
        {
            return _context.Products.Find(id);
        }

        public List<Product> GetAll()
        {
            return _context.Products.ToList();
        }

        public async Task<int> SaveAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task UpdateAsync(Product product)
        {
            var existingProduct = await _context.Products.FindAsync(product.Id);

            if (existingProduct == null)
            {
                throw new ArgumentNullException(nameof(product), "Product not found for update.");
            }

            
            existingProduct.Name = product.Name;
            existingProduct.Model = product.Model;
            existingProduct.Category = product.Category;
            existingProduct.Transmission = product.Transmission;
            existingProduct.Seats = product.Seats;
            existingProduct.Fuel_burning = product.Fuel_burning;
            existingProduct.RentalPricePerDay = product.RentalPricePerDay;

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();
        }
    }

}

