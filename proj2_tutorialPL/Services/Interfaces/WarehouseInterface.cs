using proj2_tutorialPL.Models;

namespace proj2_tutorialPL.Services.Interfaces
{
    public interface IWarehouseService
    {
        Task<List<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
        Task UpdateAsync(Product product);
        Task<int> SaveAsync(Product product);
        Task DeleteAsync(int id);
        Product Get(int id);
        List<Product> GetAll();
    }
}
