using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

        

        [HttpPost]
        public async Task<JsonResult> AssignDocument([FromBody]AssignDocumentData data)
        {
            if(data != null)
            {
                //Assign the document to the specified users. With the specified field values.

                SubmittedDocument doc = _SubmittedDocumentService.Get(data.submitted_document_id);
                if(doc != null)
                {
                    foreach(var user in data.assignees)
                    {
                        ApplicationUser assignee = await _UserManager.FindByNameAsync(user.dod_id);
                        if (assignee == null) continue;

                        DocumentAssigneeIntermediate documentAssigneeIntermediate = new DocumentAssigneeIntermediate()
                        {
                            IdActiveDocumentId = doc.IdSubmittedDocument,
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

                    foreach(var field in data.document_meta)
                    {
                        //I Need to update each field
                        try
                        {
                            switch (field.field_type)
                            {
                                case "Checkbox":
                                    {
                                        if (!string.IsNullOrEmpty(field.assigned_to))
                                        {
                                            var cbox = _DocCheck.Get(doc.IdSubmittedDocument, field.field_name);
                                            if (cbox == null) continue;
                                            ApplicationUser user = await _UserManager.FindByNameAsync(field.assigned_to);
                                            if (user != null)
                                            {
                                                cbox.AssigneeId = user.Id;
                                                _DocCheck.Update(cbox, false);
                                            }
                                        }
                                        break;
                                    }
                                //case "Combobox":
                                //    {

                                //        break;
                                //    }
                                //case "List":
                                //    {

                                //        break;
                                //    }
                                case "Text":
                                    {

                                        if (!string.IsNullOrEmpty(field.assigned_to))
                                        {
                                            var cbox = _DocForm.Get(doc.IdSubmittedDocument, field.field_name);
                                            if (cbox == null) continue;
                                            ApplicationUser user = await _UserManager.FindByNameAsync(field.assigned_to);
                                            if (user != null)
                                            {
                                                cbox.AssigneeId = user.Id;
                                                _DocForm.Update(cbox, false);
                                            }
                                        }
                                        break;
                                    }
                                //case "Pushbutton":
                                //    {

                                //        break;
                                //    }
                                //case "Radiobutton":
                                //    {

                                //        break;
                                //    }
                                case "Signature":
                                    {

                                        if (!string.IsNullOrEmpty(field.assigned_to))
                                        {
                                            var cbox = _DocSig.Get(doc.IdSubmittedDocument, field.field_name);
                                            if (cbox == null) continue;
                                            ApplicationUser user = await _UserManager.FindByNameAsync(field.assigned_to);
                                            if (user != null)
                                            {
                                                cbox.AssigneeId = user.Id;
                                                _DocSig.Update(cbox, false);
                                            }
                                        }
                                        break;
                                    }
                                default:
                                    {
                                        continue;
                                    }
                            }
                        }
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
                        reason = "Document Updated Successfully.",
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


        public List<DocumentMeta> document_meta { get; set; }
        public List<DocumentAssinee> assignees { get; set; }
        public Guid submitted_document_id { get; set; }

    }

    public class DocumentAssinee
    {
        public string dod_id { get; set; }
        public bool is_allowed_edit { get; set; }
        public bool is_allowed_approve { get; set; }
        public bool is_allowed_submit { get; set; }
        public bool is_allowed_assign { get; set; }
    }
}
