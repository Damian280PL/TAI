
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services.Interfaces;

namespace proj2_tutorialPL.Services.Interfaces
{
	public class IWarehouseService : WarehouseInterface
	{

		private readonly DbTestContext _context;

		public IWarehouseService(DbTestContext context)
		{
			_context = context;
		}

		public int Delete(int id)
		{
			var product = _context.Products.Find(id);
			_context.Products.Remove(product);	
			_context.SaveChanges();

			return id;
		}

		public Product Get(int id)
		{
			var product = _context.Products.Find(id);

			return product;
		}

		public List<Product> GetAll()
		{
			//zwarca queerable wiec trzeba tolist
			var products = _context.Products.ToList();

			return products;
		}

		public int Save(Product product)
		{

			_context.Products.Add(product);

			if(_context.SaveChanges() > 0)
				{
					System.Console.WriteLine("Sukces");
			};
			return product.Id;
		}
	}
}
