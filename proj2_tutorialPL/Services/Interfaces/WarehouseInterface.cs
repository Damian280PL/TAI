using proj2_tutorialPL.Models;

namespace proj2_tutorialPL.Services.Interfaces
{
	public interface WarehouseInterface
	{
		int Save(Product product);
		List<Product> GetAll();
		Product Get(int id);
		int Delete(int id);

		Task<List<Product>> GetAllAsync();
	}
}
