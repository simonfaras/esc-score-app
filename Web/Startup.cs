﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Web.Data;
using Web.Models;
using Web.Services;
using System.Reflection;
using Npgsql;
using SimpleMigrations.DatabaseProvider;
using SimpleMigrations;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Add application services.
            services.AddTransient<IEmailSender, EmailSender>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }

            // Migrate to latest database version
            var migrationAssembly = typeof(Startup).GetTypeInfo().Assembly;
            using (var connection = new NpgsqlConnection(Configuration.GetConnectionString("DefaultConnection"))) {
                var dbProvider = new PostgresqlDatabaseProvider(connection);
                var migrator = new SimpleMigrator(migrationAssembly, dbProvider);

                migrator.Load();
                migrator.MigrateToLatest();
            }


            app.UseAuthentication();

            app.UseMvc();
        }
    }
}