using proj2_tutorialPL;
using proj2_tutorialPL.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using proj2_tutorialPL.Models;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Rejestracja us³ugi IWarehouseService z odpowiedni¹ implementacj¹
builder.Services.AddScoped<IWarehouseService, IWarehouseService>();


builder.Services.AddDbContext<DbTestContext>(options =>
	options.UseSqlServer(@"Data Source=DESKTOP-RV5HS5R\MSSQLSERVER2022;Initial Catalog=DbTest;Integrated Security=True")
);

// Konfiguracja Identity z poprawn¹ konfiguracj¹ i obs³ug¹ DbTestContext
builder.Services.AddIdentity<UserModel, IdentityRole>(async options =>
{
	options.Password.RequireDigit = false;
	options.Password.RequiredLength = 4;
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequireUppercase = false;
	options.Password.RequireLowercase = false;

	
})
	.AddEntityFrameworkStores<DbTestContext>()
	.AddDefaultTokenProviders();
// Dodaj MVC lub inne us³ugi
builder.Services.AddControllersWithViews();



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
	var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
	var roles = new[] { "Admin", "User" };

	foreach (var role in roles)
	{
		if (!await roleManager.RoleExistsAsync(role))
		{
			await roleManager.CreateAsync(new IdentityRole(role));
		}
	}
}

// Konfiguracja potoku HTTP
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
