using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using api.Models;

#nullable disable

namespace api.Data
{
    public partial class PlantContext : DbContext
    {
        public PlantContext()
        {
        }

        public PlantContext(DbContextOptions<PlantContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Plant> Plants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plant>(entity =>
            {
                entity.HasIndex(e => e.Id, "IX_Plants_Id")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
