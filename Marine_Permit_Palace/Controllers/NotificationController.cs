using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Controllers
{
    public class NotificationController : Controller
    {
        private IDocumentAssigneeIntermediateService _DocAssigneeService;
        private ISubmittedDocumentService _SubmittedDocService;
        private IFieldService _FieldService;
        private UserManager<ApplicationUser> _UserManager;
        public NotificationController(IDocumentAssigneeIntermediateService idais,
            UserManager<ApplicationUser> um,
            IFieldService ifs,
            ISubmittedDocumentService isds)
        {
            _SubmittedDocService = isds;
            _UserManager = um;
            _FieldService = ifs;
            _DocAssigneeService = idais;
        }

        [HttpGet]
        public async Task<JsonResult> Index()
        {
            if(User.Identity.IsAuthenticated)
            {
                var user = await _UserManager.GetUserAsync(User);
                List<SubmittedDocument> RequiresAttention = _SubmittedDocService.GetAllAssigedToUser(user.Id, true);
                DocumentFields AwaitingFields = _FieldService.GetAllAssignedFields(user.Id, true);

                return Json(new
                {
                    result = "Success",

                    status_code = 200,

                    notification_count = RequiresAttention.Count,

                    awaiting_documents = RequiresAttention.Select(e => new
                    {
                        submitted_document_name = e.Name,
                        submitted_document_id = e.IdSubmittedDocument,
                        document_id = e.DocumentId,
                        assigned_by = (e.Assigner != null)? e.Assigner.Rank + " " + e.Assigner.FirstName + " " + e.Assigner.LastName : null,
                        date_assigned = e.DateCreatedUtc
                    }),

                    awaiting_signature = AwaitingFields.SignatureFields.Distinct().Select(e => new
                    {
                        submitted_document_name = e.SubmittedDocument.Name,
                        submitted_document_id = e.IdSubmittedDocumentId,
                        document_id = e.SubmittedDocument.DocumentId,
                        form_name = e.IdFormName
                    }),

                    awaiting_field_input = AwaitingFields.FormFields.Distinct().Select(e => new
                    {
                        submitted_document_name = e.SubmittedDocument.Name,
                        submitted_document_id = e.IdSubmittedDocumentId,
                        document_id = e.SubmittedDocument.DocumentId,
                        form_name = e.IdFormName
                    }),

                    awaiting_approval = AwaitingFields.CheckBoxes.Distinct().Select(e => new
                    {
                        submitted_document_name = e.SubmittedDocument.Name,
                        submitted_document_id = e.IdSubmittedDocumentId,
                        document_id = e.SubmittedDocument.DocumentId,
                        form_name = e.IdFormName
                    })

                });
            }
            else
            {
                return Json(new Result()
                {
                    reason = "User Not Autenticated",
                    result = "Failure",
                    status_code = 401
                });
            }
        }

        
    }
}
