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
            throw new NotImplementedException();
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
            throw new NotImplementedException();
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
