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

                    notification_count = RequiresAttention.Count + AwaitingFields.CheckBoxes.Count + AwaitingFields.FormFields.Count + AwaitingFields.SignatureFields.Count,

                    awaiting_documents = RequiresAttention.Select(e => new
                    {
                        submitted_document_name = e.Name,
                        submitted_document_id = e.IdSubmittedDocument,
                        document_id = e.DocumentId
                    }),

                    awaiting_signature = AwaitingFields.SignatureFields.Select(e => new
                    {
                        submitted_document_name = e.SubmittedDocument.Name,
                        submitted_document_id = e.IdSubmittedDocumentId,
                        document_id = e.SubmittedDocument.DocumentId
                    }),

                    awaiting_field_input = AwaitingFields.FormFields.Select(e => new
                    {
                        submitted_document_name = e.SubmittedDocument.Name,
                        submitted_document_id = e.IdSubmittedDocumentId,
                        document_id = e.SubmittedDocument.DocumentId
                    }),

                    awaiting_approval = AwaitingFields.CheckBoxes.Select(e => new
                    {
                        submitted_document_name = e.SubmittedDocument.Name,
                        submitted_document_id = e.IdSubmittedDocumentId,
                        document_id = e.SubmittedDocument.DocumentId
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
