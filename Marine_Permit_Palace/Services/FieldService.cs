using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Services
{
    public interface IFieldService
    {
        DocumentFields GetAllFields(Guid SubmittedDocId);
        DocumentFields GetAllAssignedFields(Guid SubmittedDocId, string UserId = null);
        DocumentFields GetAllAssignedFields(string UserId, bool ExcludeCompleted = false);
    }

    public class FieldService : IFieldService
    {
        ApplicationDbContext _context;
        public FieldService(ApplicationDbContext ctx)
        {
            _context = ctx;
        }

        public DocumentFields GetAllAssignedFields(string UserId, bool ExcludeCompleted = false)
        {
            DocumentFields fields = new DocumentFields()
            {
                CheckBoxes = _context.DocumentCheckBoxField
                .Include(e => e.SubmittedDocument)
                .Where(e => e.AssigneeId == UserId && e.IsActive
                   && e.IsCompleted == (!ExcludeCompleted) ? e.IsCompleted : false)
                    .ToList(),
                FormFields = _context.DocumentFormField
                .Include(e => e.SubmittedDocument)
                .Where(e => e.AssigneeId == UserId && e.IsActive
                  && e.IsCompleted == (!ExcludeCompleted) ? e.IsCompleted : false)
                    .ToList(),
                SignatureFields = _context.DocumentSignatureField
                .Include(e => e.SubmittedDocument)
                .Where(e => e.AssigneeId == UserId && e.IsActive
                 && e.IsCompleted == (!ExcludeCompleted) ? e.IsCompleted : false)
                    .ToList(),
            };
            return fields;
        }

        public DocumentFields GetAllFields(Guid SubmittedDocId)
        {
            DocumentFields fields = new DocumentFields()
            {
                CheckBoxes = _context.DocumentCheckBoxField.Where(e => e.IdSubmittedDocumentId == SubmittedDocId).ToList(),
                SignatureFields = _context.DocumentSignatureField.Where(e => e.IdSubmittedDocumentId == SubmittedDocId).ToList(),
                FormFields = _context.DocumentFormField.Where(e => e.IdSubmittedDocumentId == SubmittedDocId).ToList()
            };
            return fields;
        }

        DocumentFields IFieldService.GetAllAssignedFields(Guid SubmittedDocId, string UserId)
        {
            DocumentFields fields;
            if(string.IsNullOrEmpty(UserId))
            {
                fields = new DocumentFields()
                {
                    CheckBoxes = _context.DocumentCheckBoxField.Where(e => e.IdSubmittedDocumentId == SubmittedDocId).ToList(),
                    SignatureFields = _context.DocumentSignatureField.Where(e => e.IdSubmittedDocumentId == SubmittedDocId).ToList(),
                    FormFields = _context.DocumentFormField.Where(e => e.IdSubmittedDocumentId == SubmittedDocId).ToList()
                };
            }
            else
            {
                fields = new DocumentFields()
                {
                    CheckBoxes = _context.DocumentCheckBoxField
                        .Where(e => e.IdSubmittedDocumentId == SubmittedDocId && e.AssigneeId == UserId)
                        .ToList(),
                    SignatureFields = _context.DocumentSignatureField
                        .Where(e => e.IdSubmittedDocumentId == SubmittedDocId && e.AssigneeId == UserId)
                        .ToList(),
                    FormFields = _context.DocumentFormField
                        .Where(e => e.IdSubmittedDocumentId == SubmittedDocId && e.AssigneeId == UserId)
                        .ToList()
                };
            }
            return fields;
        }
    }

    public struct DocumentFields
    {
        public List<DocumentFormField> FormFields { get; set; }
        public List<DocumentSignatureField> SignatureFields { get; set; }
        public List<DocumentCheckBoxField> CheckBoxes { get; set; }
    }

}
