using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using proj2_tutorialPL.Models;

namespace proj2_tutorialPL
{
	public class DbTestContext : IdentityDbContext<UserModel>
	{
		public DbTestContext(DbContextOptions<DbTestContext> options) : base(options) { }

		
		public DbSet<Product> Products { get; set; }

		
		public DbSet<Rent> Rents { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			// Configure relationship between Rent and UserModel (AspNetUsers)
			builder.Entity<Rent>()
				.HasOne(r => r.User)               // Rent has one User
				.WithMany()                        // A user can have many rents
				.HasForeignKey(r => r.UserId)      // UserId is a foreign key
				.OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete

			// Configure relationship between Rent and Product
			builder.Entity<Rent>()
				.HasOne(r => r.Product)            // Rent has one Product
				.WithMany()                        // A product can have many rents
				.HasForeignKey(r => r.ProductId)   // ProductId is a foreign key
				.OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete
		}
	}
}
