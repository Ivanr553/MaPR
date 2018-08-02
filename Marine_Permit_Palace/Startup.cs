using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Marine_Permit_Palace.Global;

namespace Marine_Permit_Palace
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
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Add application services.
            services.AddTransient<IEmailSender, EmailSender>();

            //Scoped
            services.AddScoped<IStoredTokenService, StoredTokenService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<ISubmittedDocumentService, SubmittedDocumentService>();
            services.AddScoped<IDocumentFormFieldService, DocumentFormFieldService>();
            services.AddScoped<IDocumentCheckBoxFieldService, DocumentCheckBoxFieldService>();
            services.AddScoped<IDocumentSignatureDataService, DocumentSigService>();
            services.AddScoped<IDocumentAssigneeIntermediateService, DocumentAssigneeIntermediateService>();
            services.AddScoped<IFieldService, FieldService>();
            services.AddScoped<IDatabaseService, DatabaseService>();
            services.AddScoped<IDataStorageService, DataStorageService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISearchService, SearchService>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider prov)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
                //app.UseWebpackDevMiddleware(new Microsoft.AspNetCore.SpaServices.Webpack.WebpackDevMiddlewareOptions
                //{
                //    HotModuleReplacement = true
                //});
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            CreateRoles(prov);

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{Id?}");
            });
        }

        public void CreateRoles(IServiceProvider serviceProvider)
        {
            var RoleList = ApplicationPermissions.GetAllRoles();
            try
            {
                using (var rolemand = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>())
                {

                    foreach (var role in RoleList)
                    {
                        var roleExist = rolemand.RoleExistsAsync(role.Name).Result;
                        if (!roleExist)
                        {
                            var result = rolemand.CreateAsync(new IdentityRole(role.Name)).Result;
                            if (!result.Succeeded)
                            {
                                //Do Something?
                                throw new NotImplementedException();
                            }
                        }
                    }
                }
            }
            catch(Exception Ex)
            {
                return;
            }
           
        }
    }
}
