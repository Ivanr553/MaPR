using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Security.Claims;
using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Global;

namespace Marine_Permit_Palace.Services
{
    public interface IDataRowPropertiesInterface<T>
        {
            //Delayed Save Funcitons
            void SaveChanges();
            void UndoChangesDbContextLevel(DbContext context);
            void UndoChangesEntityLevel(DbContext context, object entity);
            //Add Functions
            T Add<T>(T add, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            T Add<T>(T add, bool save_context_after_execute = true) where T : DataRowProperties;
            void Add<T>(List<T> add, bool save_context_after_execute = true) where T : DataRowProperties;
            T AddBySystem<T>(T add, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            //Update Functions
            T Update<T>(T update, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            T Update<T>(T update, bool save_context_after_execute = true) where T : DataRowProperties;
            void Update<T>(List<T> update, bool save_context_after_execute = true) where T : DataRowProperties;
            T UpdateBySystem<T>(T update, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            //Delete Funcitons
            T FlagForDelete<T>(T delete, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            T FlagForDelete<T>(T delete, bool save_context_after_execute = true) where T : DataRowProperties;
            T FlagForDeleteBySystem<T>(T delete, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            //Toggle Activate Functions
            T ToggleRecordState<T>(T active_toggle, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            T ToggleRecordState<T>(T active_toggle, bool save_context_after_execute = true) where T : DataRowProperties;
            T ToggleRecordStateBySystem<T>(T active_toggle, bool save_context_after_execute = true) where T : UserEditableDataRowProperties;
            //Get Functions
            T Get(params object[] primary_key);
            IEnumerable<T> GetAll<T>() where T : DataRowProperties;
            IEnumerable<T> GetAllActive<T>() where T : DataRowProperties;

        }
        public interface IIncludeConnections<T>
        {

        }

        public class DataRowPropertiesInterfaceImplementation<T> : IDataRowPropertiesInterface<T>
        {
            protected ApplicationDbContext _context;
            protected UserManager<ApplicationUser> _UserManager;
            public DataRowPropertiesInterfaceImplementation(ApplicationDbContext ctx, UserManager<ApplicationUser> uman)
            {
                _context = ctx;
                _UserManager = uman;
            }

            //Delayed Save Funcitons
            public void SaveChanges()
            {
                _context.SaveChanges();
            }
            public void UndoChangesDbContextLevel(DbContext context)
            {
                foreach (EntityEntry entry in context.ChangeTracker.Entries())
                {
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            entry.State = EntityState.Unchanged;
                            break;
                        case EntityState.Added:
                            entry.State = EntityState.Detached;
                            break;
                        case EntityState.Deleted:
                            entry.Reload();
                            break;
                        default: break;
                    }
                }
            }
            public void UndoChangesEntityLevel(DbContext context, object entity)
            {
                EntityEntry entry = context.Entry(entity);
                switch (entry.State)
                {
                    case EntityState.Modified:
                        entry.State = EntityState.Unchanged;
                        break;
                    case EntityState.Added:
                        entry.State = EntityState.Detached;
                        break;
                    case EntityState.Deleted:
                        entry.Reload();
                        break;
                    default: break;
                }
            }
            //Add Functions
            public T Add<T>(T add, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = _UserManager.GetUserId(user);
                add.CreatedById = UserID;
                add.LastModifiedById = UserID;
                add.DateCreatedUtc = DateTime.UtcNow;
                add.DateLastModifiedUtc = DateTime.UtcNow;
                add.IsActive = true;
                var ent = _context.Add(add);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return add;
                }
                catch (Exception ex)
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T Add<T>(T add, bool save_context_after_execute = true) where T : DataRowProperties
            {
                add.DateCreatedUtc = DateTime.UtcNow;
                add.DateLastModifiedUtc = DateTime.UtcNow;
                add.IsActive = true;
                var ent = _context.Add(add);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return add;
                }
                catch (Exception ex)
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T AddBySystem<T>(T add, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = ApplicationPermissions.SOFTWARE_MANIPULATE_ROW_ID;
                add.CreatedById = UserID;
                add.LastModifiedById = UserID;
                add.DateCreatedUtc = DateTime.UtcNow;
                add.DateLastModifiedUtc = DateTime.UtcNow;
                add.IsActive = true;
                var ent = _context.Add(add);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return add;
                }
                catch (Exception ex)
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            //Update Functions
            public T Update<T>(T update, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = _UserManager.GetUserId(user);
                update.LastModifiedById = UserID;
                update.DateLastModifiedUtc = DateTime.UtcNow;
                var ent = _context.Update(update);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return update;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T Update<T>(T update, bool save_context_after_execute = true) where T : DataRowProperties
            {
                update.DateLastModifiedUtc = DateTime.UtcNow;
                var ent = _context.Update(update);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return update;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T UpdateBySystem<T>(T update, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = ApplicationPermissions.SOFTWARE_MANIPULATE_ROW_ID;
                update.LastModifiedById = UserID;
                update.DateLastModifiedUtc = DateTime.UtcNow;
                var ent = _context.Update(update);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return update;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            //Delete Funcitons
            public T FlagForDelete<T>(T delete, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = _UserManager.GetUserId(user);
                delete.LastModifiedById = UserID;
                delete.DateLastModifiedUtc = DateTime.UtcNow;
                delete.IsDelete = true;
                delete.DeleteCommissionDateUtc = DateTime.UtcNow;
                var ent = _context.Update(delete);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return delete;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T FlagForDelete<T>(T delete, bool save_context_after_execute = true) where T : DataRowProperties
            {
                delete.DateLastModifiedUtc = DateTime.UtcNow;
                delete.IsDelete = true;
                delete.DeleteCommissionDateUtc = DateTime.UtcNow;
                var ent = _context.Update(delete);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return delete;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T FlagForDeleteBySystem<T>(T delete, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = ApplicationPermissions.SOFTWARE_MANIPULATE_ROW_ID;
                delete.LastModifiedById = UserID;
                delete.DateLastModifiedUtc = DateTime.UtcNow;
                delete.IsDelete = true;
                delete.DeleteCommissionDateUtc = DateTime.UtcNow;
                var ent = _context.Update(delete);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return delete;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            //Toggle Activate Functions
            public T ToggleRecordState<T>(T active_toggle, ClaimsPrincipal user, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = _UserManager.GetUserId(user);
                active_toggle.LastModifiedById = UserID;
                active_toggle.DateLastModifiedUtc = DateTime.UtcNow;
                if (active_toggle.IsActive)
                {
                    active_toggle.IsActive = false;
                    active_toggle.DateInactivatedUtc = DateTime.UtcNow;
                }
                else // Was already inactivated
                {
                    active_toggle.IsActive = true;
                    active_toggle.DateInactivatedUtc = null;
                }
                var ent = _context.Update(active_toggle);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return active_toggle;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T ToggleRecordState<T>(T active_toggle, bool save_context_after_execute = true) where T : DataRowProperties
            {
                active_toggle.DateLastModifiedUtc = DateTime.UtcNow;
                if (active_toggle.IsActive)
                {
                    active_toggle.IsActive = false;
                    active_toggle.DateInactivatedUtc = DateTime.UtcNow;
                }
                else // Was already inactivated
                {
                    active_toggle.IsActive = true;
                    active_toggle.DateInactivatedUtc = null;
                }
                var ent = _context.Update(active_toggle);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return active_toggle;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            public T ToggleRecordStateBySystem<T>(T active_toggle, bool save_context_after_execute = true) where T : UserEditableDataRowProperties
            {
                string UserID = ApplicationPermissions.SOFTWARE_MANIPULATE_ROW_ID;
                active_toggle.LastModifiedById = UserID;
                active_toggle.DateLastModifiedUtc = DateTime.UtcNow;
                if (active_toggle.IsActive)
                {
                    active_toggle.IsActive = false;
                    active_toggle.DateInactivatedUtc = DateTime.UtcNow;
                }
                else // Was already inactivated
                {
                    active_toggle.IsActive = true;
                    active_toggle.DateInactivatedUtc = null;
                }
                var ent = _context.Update(active_toggle);
                try
                {
                    if (save_context_after_execute) _context.SaveChanges();
                }
                catch (DbUpdateException e)
                {
                    return active_toggle;
                }
                catch
                {
                    throw new NotImplementedException();
                }
                return ent.Entity;
            }
            //Get Functions
            public T Get(params object[] primary_key)
            {
                if (primary_key.Count() == 0 || primary_key[0] == null) return default(T);
                return (T)_context.Find(typeof(T), primary_key);
            }
            public IEnumerable<T> GetAll<T>() where T : DataRowProperties
            {
                return _context.Set<T>();
            }
            public IEnumerable<T> GetAllActive<T>() where T : DataRowProperties
            {
                return _context.Set<T>().Where(e => e.IsActive);
            }

        public void Add<T>(List<T> add, bool save_context_after_execute = true) where T : DataRowProperties
        {
            add.ForEach(e =>
            {
                e.DateCreatedUtc = DateTime.UtcNow;
                e.DateLastModifiedUtc = DateTime.UtcNow;
                e.IsActive = true;
            });
            _context.AddRange(add);
            try
            {
                if (save_context_after_execute) _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        public void Update<T>(List<T> update, bool save_context_after_execute = true) where T : DataRowProperties
        {
            update.ForEach(e =>
            {
                e.DateLastModifiedUtc = DateTime.UtcNow;
            });
            _context.UpdateRange(update);
            try
            {
                if (save_context_after_execute) _context.SaveChanges();
            }
            catch
            {
                throw new NotImplementedException();
            }
        }
    }

}
