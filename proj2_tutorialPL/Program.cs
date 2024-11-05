using proj2_tutorialPL;
using proj2_tutorialPL.Services.Interfaces;
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services; // Importuj rzeczywist¹ implementacjê IWarehouseService, np. WarehouseService
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Rejestracja us³ugi IWarehouseService z odpowiedni¹ implementacj¹
builder.Services.AddScoped<IWarehouseService, IWarehouseService>(); // Upewnij siê, ¿e WarehouseService jest rzeczywist¹ implementacj¹

// Konfiguracja CORS, aby umo¿liwiæ po³¹czenia z React
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowReactApp", policy =>
	{
		policy.WithOrigins("http://localhost:3000") 
			  .AllowAnyHeader()
			  .AllowAnyMethod();
	});
});

// Konfiguracja DbContext
builder.Services.AddDbContext<DbTestContext>(options =>
	options.UseSqlServer(@"Data Source=DESKTOP-RV5HS5R\MSSQLSERVER2022;Initial Catalog=DbTest;Integrated Security=True")
);

// Konfiguracja Identity z DbTestContext
builder.Services.AddIdentity<UserModel, IdentityRole>(options =>
{
	options.Password.RequireDigit = false;
	options.Password.RequiredLength = 4;
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequireUppercase = false;
	options.Password.RequireLowercase = false;
})
.AddEntityFrameworkStores<DbTestContext>()
.AddDefaultTokenProviders();

// Dodaj MVC i inne us³ugi
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Dodawanie ról po uruchomieniu aplikacji
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


app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

// Konfiguracja trasy
app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
