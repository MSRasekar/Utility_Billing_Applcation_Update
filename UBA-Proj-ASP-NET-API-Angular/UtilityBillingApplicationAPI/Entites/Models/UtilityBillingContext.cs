using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace UtilityBillingApplicationAPI.Entites.Models
{
    public class UtilityBillingContext : IdentityDbContext<ApplicationUser>
    {
        public UtilityBillingContext(DbContextOptions<UtilityBillingContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);

            builder.Entity<Meter>()
                .HasOne(m => m.User)
                .WithOne(u => u.Meter)
                .HasForeignKey<Meter>(m => m.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<BillingHistory>()
                .HasOne(bh => bh.Meter)
                .WithMany(m => m.BillingHistory)
                .HasForeignKey(bh => bh.MeterId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<BillingHistory>()
                .HasOne(b => b.User)
                .WithMany(u => u.BillingHistory)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<BillingHistory>()
                .Property(bh => bh.MeterReading)
                .HasPrecision(18, 2);

            builder.Entity<BillingHistory>()
                .Property(bh => bh.BillingAmount)
                .HasPrecision(18, 2);

            builder.Entity<Payments>()
                .Property(p => p.PaymentAmount)
                .HasPrecision(18, 2);
        }

        private static void SeedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData
            (
                new IdentityRole() { Name = "SuperAdmin", ConcurrencyStamp = "1", NormalizedName = "SuperAdmin" },
                new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
                new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" }
            );
        }

        public virtual DbSet<Meter> Meters { get; set; }
        public virtual DbSet<ApplicationStatus> ApplicationStatus { get; set; }
        public virtual DbSet<BillingHistory> BillingHistory { get; set; }
        public virtual DbSet<Payments> Payments { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
    }
}
