using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static Marine_Permit_Palace.Controllers.DocumentSaveController;

namespace Marine_Permit_Palace.Controllers
{
    [Authorize]
    public class DocumentManagerController : Controller
    {
        private IDocumentService _DocumentService;
        private ISubmittedDocumentService _SubmittedDocumentService;
        private IDatabaseService _DatabaseService;
        private IDocumentAssigneeIntermediateService _AssigneeIntermediate;
        private IDocumentCheckBoxFieldService _DocCheck;
        private IDocumentFormFieldService _DocForm;
        private IDocumentSignatureDataService _DocSig;
        private UserManager<ApplicationUser> _UserManager;

        public DocumentManagerController(IDocumentService ids,
            IDocumentCheckBoxFieldService idcs,
            IDocumentFormFieldService idfs,
            IDocumentSignatureDataService idss,
            IDocumentAssigneeIntermediateService idas,
            UserManager<ApplicationUser> um,
            IDatabaseService idbs,
            ISubmittedDocumentService isds)
        {
            _DocumentService = ids;
            _DocForm = idfs;
            _DocSig = idss;
            _DocCheck = idcs;
            _DatabaseService = idbs;
            _UserManager = um;
            _AssigneeIntermediate = idas;
            _SubmittedDocumentService = isds;
        }

        [HttpGet]
        public JsonResult GetFlatDocument(string document_id)
        {
            Guid id;
            if (Guid.TryParse(document_id, out id))
            {
                //Grab the desired file
                Marine_Permit_Palace.Models.Document document = _DocumentService.Get(id);
                if(document != null)
                {
                    MemoryStream file = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName)));
                    return Json(new
                    {
                        file = Convert.ToBase64String(file.ToArray())
                    });
                }
                else
                {
                    return Json(new Result()
                    {
                        status_code = 404,
                        result = "Failure",
                        reason = "No document found"
                    });
                }
            }
            else
            {
                return Json(new Result()
                {
                    reason = "Invalid guid format",
                    result = "Failure",
                    status_code = 400
                });
            }
        }

        //Assign Document -- Requires role - Supervisor

        [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
        public class RequestSizeLimitAttribute : Attribute, IAuthorizationFilter, IOrderedFilter
        {
            private readonly FormOptions _formOptions;

            public RequestSizeLimitAttribute(int valueCountLimit)
            {
                _formOptions = new FormOptions()
                {
                    // tip: you can use different arguments to set each properties instead of single argument
                    KeyLengthLimit = (int)valueCountLimit,
                    ValueCountLimit = (int)valueCountLimit,
                    ValueLengthLimit = (int)valueCountLimit

                    // uncomment this line below if you want to set multipart body limit too
                    // MultipartBodyLengthLimit = valueCountLimit
                };
            }

            public int Order { get; set; }

            // taken from /a/38396065
            public void OnAuthorization(AuthorizationFilterContext context)
            {
                var contextFeatures = context.HttpContext.Features;
                var formFeature = contextFeatures.Get<IFormFeature>();

                if (formFeature == null || formFeature.Form == null)
                {
                    // Setting length limit when the form request is not yet being read
                    contextFeatures.Set<IFormFeature>(new FormFeature(context.HttpContext.Request, _formOptions));
                }
            }
        }

        [HttpPost]
        public async Task<JsonResult> AssignDocument([FromBody]AssignDocumentData data)
        {
            if(data != null)
            {
                //Assign the document to the specified users. With the specified field values.

                var assigning_user = await _UserManager.GetUserAsync(User);

                Marine_Permit_Palace.Models.Document RefDocument = _DocumentService.Get(data.document_id);
                if (RefDocument == null)
                {
                    return Json(new { result = "Failure", reason = "No Document with that ID exists" });
                }
                SubmittedDocument SubmittedDoc = null;

                SubmittedDoc = new SubmittedDocument()
                {
                    Document = RefDocument,
                    DocumentId = data.document_id,
                    Name = data.document_name,
                    AssignerId = assigning_user.Id
                };
                SubmittedDoc = _SubmittedDocumentService.Add(SubmittedDoc);

                if(SubmittedDoc != null)
                {
                    Dictionary<string, string> AssignedUsers = new Dictionary<string, string>();
                    foreach(var user in data.assignees)
                    {
                        ApplicationUser assignee = await _UserManager.FindByNameAsync(user.dod_id.ToString());
                        if (assignee == null) continue;
                        AssignedUsers.Add(assignee.UserName, assignee.Id);
                        DocumentAssigneeIntermediate documentAssigneeIntermediate = new DocumentAssigneeIntermediate()
                        {
                            IdActiveDocumentId = SubmittedDoc.IdSubmittedDocument,
                            IdAssigneeId = assignee.Id,
                            IsAllowedApprove = user.is_allowed_approve,
                            IsAllowedAssignFields = user.is_allowed_assign,
                            IsAllowedEdit = user.is_allowed_edit,
                            IsAllowedSubmit = user.is_allowed_submit
                        };
                        try { _AssigneeIntermediate.Add(documentAssigneeIntermediate, false); }
                        catch(Exception ex)
                        {
                            return Json(new Result()
                            {
                                reason = "Database save failure. Please try again later.",
                                result = "Failure",
                                status_code = 500
                            });
                        }
                    }



                    List<DocumentCheckBoxField> CBFields = data.document_meta
                    .Where(e => e.field_type == "Checkbox")
                    .Select(e => new DocumentCheckBoxField()
                    {
                        FormValue = (e.value == "On"),
                        IdFormName = e.field_name,
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument,
                        AssigneeId = string.IsNullOrEmpty(e.assigned_to) ? null : AssignedUsers[e.assigned_to]
                    }).ToList();

                    List<DocumentFormField> FMFields = data.document_meta
                        .Where(e => e.field_type == "Text")
                        .Select(e => new DocumentFormField()
                        {
                            FormValue = e.value,
                            IdFormName = e.field_name,
                            IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument,
                            AssigneeId = string.IsNullOrEmpty(e.assigned_to) ? null : AssignedUsers[e.assigned_to]
                        }).ToList();

                    List<DocumentSignatureField> SigFields = data.document_meta
                        .Where(e => e.field_type == "Signature")
                        .Select(e => new DocumentSignatureField()
                        {
                            IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument,
                            IdFormName = e.field_name,
                            AssigneeId = string.IsNullOrEmpty(e.assigned_to) ? null : AssignedUsers[e.assigned_to]
                        }).ToList();

                    try { _DocSig.Add(SigFields, false); }
                    catch (Exception ex)
                    {
                        return Json(new Result()
                        {
                            reason = ex.Message,
                            result = "Failure",
                            status_code = 500
                        });
                    }
                    try { _DocCheck.Add(CBFields); }
                    catch (Exception ex)
                    {
                        return Json(new Result()
                        {
                            reason = ex.Message,
                            result = "Failure",
                            status_code = 500
                        });
                    }
                    try { _DocForm.Add(FMFields); }
                    catch (Exception ex)
                    {
                        return Json(new Result()
                        {
                            reason = ex.Message,
                            result = "Failure",
                            status_code = 500
                        });
                    }

                    try { _DatabaseService.SaveChanges(); }
                    catch (Exception ex)
                    {
                        return Json(new Result()
                        {
                            reason = "Database save failure. Please try again later.",
                            result = "Failure",
                            status_code = 500
                        });
                    }

                    return Json(new Result()
                    {
                        reason = "Document Created Successfully.",
                        result = "Success",
                        status_code = 200
                    });

                }
                else
                {
                    return Json(new Result()
                    {
                        reason = "No document was found",
                        result = "Failure",
                        status_code = 404
                    });
                }

            }
            else
            {
                return Json(new Result() { reason = "No data was passed", result = "Failure", status_code = 400 });
            }
        }
    }
    public class AssignDocumentData
    {

        public string document_name { get; set; }
        public List<DocumentMeta> document_meta { get; set; }
        public List<DocumentAssinee> assignees { get; set; }
        public Guid document_id { get; set; }

    }

    public class DocumentAssinee
    {
        public int dod_id { get; set; }
        public bool is_allowed_edit { get; set; }
        public bool is_allowed_approve { get; set; }
        public bool is_allowed_submit { get; set; }
        public bool is_allowed_assign { get; set; }
    }
}
