using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Services
{
    public interface IDocumentService : IDataRowPropertiesInterface<Document>
    {

    }
    public interface ISubmittedDocumentService : IDataRowPropertiesInterface<SubmittedDocument>
    {
        SubmittedDocument GetPopulated(Guid IdSubmittedDocument);
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
                List<DocumentFormField> Existing = _context.DocumentFormField
                    .Where(e => e.IdSubmittedDocumentId == Fields.First().IdSubmittedDocumentId)
                    .ToList();
                List<DocumentFormField> ToUpdate = new List<DocumentFormField>();
                List<DocumentFormField> ToAdd = new List<DocumentFormField>();
                if (Existing.Count() > 0)
                {
                    Fields.ForEach(e =>
                    {
                        if (Existing.FirstOrDefault(f => f.IdFormName == e.IdFormName) != null)
                        {
                            ToUpdate.Add(e);
                        }
                        else ToAdd.Add(e);
                    });

                    _context.DocumentFormField.AddRange(ToAdd);
                    _context.DocumentFormField.UpdateRange(ToUpdate);
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    _context.DocumentFormField.AddRange(Fields);
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
                    .Where(e => e.IdSubmittedDocumentId == Fields.First().IdSubmittedDocumentId)
                    .ToList();
                List<DocumentCheckBoxField> ToUpdate = new List<DocumentCheckBoxField>();
                List<DocumentCheckBoxField> ToAdd = new List<DocumentCheckBoxField>();
                if (Existing.Count() > 0)
                {
                    Fields.ForEach(e =>
                    {
                        if (Existing.FirstOrDefault(f => f.IdFormName == e.IdFormName) != null)
                        {
                            ToUpdate.Add(e);
                        }
                        else ToAdd.Add(e);
                    });

                    _context.DocumentCheckBoxField.AddRange(ToAdd);
                    _context.DocumentCheckBoxField.UpdateRange(ToUpdate);
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    _context.DocumentCheckBoxField.AddRange(Fields);
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

        public SubmittedDocument GetPopulated(Guid IdSubmittedDocument)
        {
            return _context.SubmittedDocument
                .Include(e => e.Document)
                .Include(e => e.DocumentFormFields)
                .Include(e => e.DocumentCheckBoxFields)
                .Include(e => e.DocumentSignatureFields)
                .FirstOrDefault(e => e.IdSubmittedDocument == IdSubmittedDocument);
        }
    }
}
