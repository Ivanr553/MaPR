﻿using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Services
{
    public interface IDocumentService : IDataRowPropertiesInterface<Document>
    {

    }
    public interface ISubmittedDocumentService : IDataRowPropertiesInterface<SubmittedDocument>
    {
        SubmittedDocument GetPopulated(Guid IdSubmittedDocument);
        List<SubmittedDocument> GetAllAssigedToUser(string UserId, bool RequiresAttentionOnly = false);
    }

    public interface IDatabaseService
    {
        int SaveChanges();
    }
    public class DatabaseService : IDatabaseService
    {
        ApplicationDbContext _context;
        public DatabaseService(ApplicationDbContext ctx)
        {
            _context = ctx;
        }
        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }

    public interface IDocumentFormFieldService : IDataRowPropertiesInterface<DocumentFormField>
    {
        bool SaveAllFormFields(List<DocumentFormField> Fields);
    }
    public interface IDocumentCheckBoxFieldService : IDataRowPropertiesInterface<DocumentCheckBoxField>
    {
        bool SaveAllCheckBoxFields(List<DocumentCheckBoxField> Fields);
    }

    public class DocumentFormFieldService : DataRowPropertiesInterfaceImplementation<DocumentFormField>, IDocumentFormFieldService
    {
        public DocumentFormFieldService(ApplicationDbContext ctx, UserManager<ApplicationUser> uman) : base(ctx, uman)
        {

        }
        /// <summary>
        /// Will attempt to load and update or add the passed fields 
        /// </summary>
        /// <param name="Fields"></param>
        /// <returns></returns>
        public bool SaveAllFormFields(List<DocumentFormField> Fields)
        {
            if (Fields.Count > 0)
            {
                List<DocumentFormField> Existing = _context.DocumentFormField.AsNoTracking()
                    .Where(e => e.IdSubmittedDocumentId == Fields.First().IdSubmittedDocumentId).AsNoTracking()
                    .ToList();
                List<DocumentFormField> ToUpdate = new List<DocumentFormField>();
                List<DocumentFormField> ToAdd = new List<DocumentFormField>();
                if (Existing.Count() > 0)
                {
                    Fields.ForEach(e =>
                    {
                        var FdExi = Existing.FirstOrDefault(f => f.IdFormName == e.IdFormName);
                        if (FdExi != null)
                        {
                            e.AssigneeId = FdExi.AssigneeId;
                            ToUpdate.Add(e);
                        }
                        else ToAdd.Add(e);
                    });

                    Add(ToAdd);
                    Update(ToUpdate);
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    Add(Fields);
                    _context.SaveChanges();
                    return true;
                }
            }
            else return false;
        }
    }
    public class DocumentCheckBoxFieldService : DataRowPropertiesInterfaceImplementation<DocumentCheckBoxField>, IDocumentCheckBoxFieldService
    {
        public DocumentCheckBoxFieldService(ApplicationDbContext ctx, UserManager<ApplicationUser> uman) : base(ctx, uman)
        {

        }
        /// <summary>
        /// Will attempt to load and update or add the passed fields 
        /// </summary>
        /// <param name="Fields"></param>
        /// <returns></returns>
        public bool SaveAllCheckBoxFields(List<DocumentCheckBoxField> Fields)
        {
            if (Fields.Count > 0)
            {
                List<DocumentCheckBoxField> Existing = _context.DocumentCheckBoxField
                    .Where(e => e.IdSubmittedDocumentId == Fields.First().IdSubmittedDocumentId).AsNoTracking()
                    .ToList();
                List<DocumentCheckBoxField> ToUpdate = new List<DocumentCheckBoxField>();
                List<DocumentCheckBoxField> ToAdd = new List<DocumentCheckBoxField>();
                if (Existing.Count() > 0)
                {
                    Fields.ForEach(e =>
                    {
                        var CBExist = Existing.FirstOrDefault(f => f.IdFormName == e.IdFormName);
                        if (CBExist != null)
                        {
                            e.AssigneeId = CBExist.AssigneeId;
                            ToUpdate.Add(e);
                        }
                        else ToAdd.Add(e);
                    });

                     Add(ToAdd);
                     Update(ToUpdate);
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    Add(Fields);
                    _context.SaveChanges();
                    return true;
                }
            }
            else return false;

        }
    }

    public class DocumentService : DataRowPropertiesInterfaceImplementation<Document>, IDocumentService
    {
        public DocumentService(ApplicationDbContext ctx, UserManager<ApplicationUser> uman) : base(ctx, uman)
        {

        }
    }
    public class SubmittedDocumentService : DataRowPropertiesInterfaceImplementation<SubmittedDocument>, ISubmittedDocumentService
    {
        public SubmittedDocumentService(ApplicationDbContext ctx, UserManager<ApplicationUser> uman) : base(ctx, uman)
        {

        }

        public List<SubmittedDocument> GetAllAssigedToUser(string UserId, bool RequiresAttentionOnly = true)
        {
            var AssignedDocuments = _context.DocumentAssigneeIntermediate
                .Include(e => e.ActiveDocument)
                .ThenInclude(e => e.Document)
                .Include(e => e.ActiveDocument)
                .ThenInclude(e => e.Assigner)
                .Where(e => e.IdAssigneeId == UserId)
                .Select(e => e.ActiveDocument).ToList();
            if(RequiresAttentionOnly)
            {
                AssignedDocuments = AssignedDocuments
                .Where(e => !e.IsCompleted).ToList();
            }
            return AssignedDocuments;
        }
        

        public SubmittedDocument GetPopulated(Guid IdSubmittedDocument)
        {
            return _context.SubmittedDocument
                .Include(e => e.Document)
                .Include(e => e.DocumentFormFields)
                .Include(e => e.DocumentCheckBoxFields)
                .Include(e => e.DocumentSignatureFields).ThenInclude(e => e.SignatureData)
                .FirstOrDefault(e => e.IdSubmittedDocument == IdSubmittedDocument);
        }
    }

    public interface IDataStorageService : IDataRowPropertiesInterface<DataStorage>
    {

    }
    public class DataStorageService : DataRowPropertiesInterfaceImplementation<DataStorage> , IDataStorageService
    {
        public DataStorageService(ApplicationDbContext ctx, UserManager<ApplicationUser> um) : base(ctx, um)
        {

        }
    }

    public interface IDocumentSignatureDataService : IDataRowPropertiesInterface<DocumentSignatureField>
    {
        DocumentSignatureField SaveWithDocumentSignatureData(DocumentSignatureField field);
        List<DocumentSignatureField> SaveWithDocumentSignatureData(List<DocumentSignatureField> fields);
    }

    public class DocumentSigService : DataRowPropertiesInterfaceImplementation<DocumentSignatureField>, IDocumentSignatureDataService
    {
        IDataStorageService _DataStor;
        public DocumentSigService(ApplicationDbContext ctx, UserManager<ApplicationUser> um) :base(ctx, um)
        {
            _DataStor = new DataStorageService(ctx, um);
        }

        public DocumentSignatureField SaveWithDocumentSignatureData(DocumentSignatureField field)
        {
            if (field.SignatureData == null) return null;
            DataStorage stor;
            if (field.SignatureData.IdDataStorage == Guid.Empty)
            {
                //Add
                
                stor = _DataStor.Add(field.SignatureData);
            }
            else
            {
                //Update
                ///TODO - Confirm the storage data exists
                stor = _DataStor.Update(field.SignatureData);
            }

            field.SignatureDataId = stor.IdDataStorage;
            var Field = _context.DocumentSignatureField.AsNoTracking().FirstOrDefault(e => e.IdFormName == field.IdFormName && e.IdSubmittedDocumentId == field.IdSubmittedDocumentId);
            if (Field != null)
            {
                field.AssigneeId = Field.AssigneeId;
                //Update
                return Update(field);
            }
            else
            {
                //add
                return Add(field);
            }
        }

        public List<DocumentSignatureField> SaveWithDocumentSignatureData(List<DocumentSignatureField> fields)
        {
            List<DocumentSignatureField> Result = new List<DocumentSignatureField>();
            foreach(var field in fields)
            {
                Result.Add(SaveWithDocumentSignatureData(field));
            }
            return Result;
        }
    }

    public interface IDocumentAssigneeIntermediateService : IDataRowPropertiesInterface<DocumentAssigneeIntermediate>
    {
        List<ApplicationUser> GetAssignedUsers(Guid SubmittedDocumentId);
        List<SubmittedDocument> GetAssignedDocuments(string UserId);
        List<DocumentAssigneeIntermediate> GetByUser(string UserId);
        List<DocumentAssigneeIntermediate> GetByDocument(Guid SubmittedDocId);
    }

    public class DocumentAssigneeIntermediateService : DataRowPropertiesInterfaceImplementation<DocumentAssigneeIntermediate>, IDocumentAssigneeIntermediateService
    {
        public DocumentAssigneeIntermediateService(ApplicationDbContext ctx, UserManager<ApplicationUser> um) : base(ctx, um)
        {

        }

        public List<SubmittedDocument> GetAssignedDocuments(string UserId)
        {
            return _context.DocumentAssigneeIntermediate
                .Include(e => e.ActiveDocument)
                .Where(e => e.IsActive && e.IdAssigneeId == UserId)
                .Select(e => e.ActiveDocument)
                .ToList();
        }

        public List<ApplicationUser> GetAssignedUsers(Guid SubmittedDocumentId)
        {
            return _context.DocumentAssigneeIntermediate
                .Include(e => e.ActiveDocument)
                .Where(e => e.IsActive && e.IdActiveDocumentId == SubmittedDocumentId)
                .Select(e => e.Assignee)
                .ToList();
        }

        public List<DocumentAssigneeIntermediate> GetByDocument(Guid SubmittedDocumentId)
        {
            return _context.DocumentAssigneeIntermediate
                .Include(e => e.ActiveDocument)
                .Include(e => e.Assignee)
                .Where(e => e.IsActive && e.IdActiveDocumentId == SubmittedDocumentId)
                .ToList();
        }

        public List<DocumentAssigneeIntermediate> GetByUser(string UserId)
        {
            return _context.DocumentAssigneeIntermediate
                .Include(e => e.ActiveDocument)
                .Include(e => e.Assignee)
                .Where(e => e.IsActive && e.IdAssigneeId == UserId)
                .ToList();
        }
    }

    

}
