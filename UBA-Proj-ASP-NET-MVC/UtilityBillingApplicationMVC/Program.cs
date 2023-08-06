using Microsoft.EntityFrameworkCore;
using UtilityBillingApplicationMVC.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<UtilityBillingApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("UtilityBillingDbContext") ?? throw new InvalidOperationException("Connection string 'UtilityBillingDbContext' not found.")));

// Add session services
builder.Services.AddDistributedMemoryCache(); // Use distributed memory cache for session data in development (you may use a different provider in production)
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Set the session timeout (adjust as needed)
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseSession(); // Enable session middleware

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
