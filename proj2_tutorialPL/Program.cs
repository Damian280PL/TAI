using proj2_tutorialPL;
using proj2_tutorialPL.Services.Interfaces;
using proj2_tutorialPL.Models;
using proj2_tutorialPL.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// 1. Rejestracja DbContext z connection string
builder.Services.AddDbContext<DbTestContext>(options =>
    options.UseSqlServer(@"Data Source=DESKTOP-RV5HS5R\MSSQLSERVER2022;Initial Catalog=DbTest;Integrated Security=True")
);


// 2. Konfiguracja Identity
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

// 3. Rejestracja serwisów aplikacyjnych
builder.Services.AddScoped<IWarehouseService, WarehouseService>();

// Rejestracja PayPalService z HttpClient
builder.Services.AddHttpClient<IPayPalService, PayPalService>();

// 4. Konfiguracja CORS dla aplikacji React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 5. Dodanie kontrolerów z widokami
builder.Services.AddControllersWithViews();

var app = builder.Build();

// 6. Dodawanie ról po uruchomieniu aplikacji
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

// 7. Konfiguracja potoku HTTP
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

// 8. Konfiguracja trasy
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
