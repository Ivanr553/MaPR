﻿using iTextSharp.text;
using iTextSharp.text.pdf;
using Marine_Permit_Palace.ModelManagers;
using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Controllers
{
    
    [Authorize]
    public class DocumentSaveController : Controller
    {
        private readonly IDocumentService _DocumentSerivce;
        private readonly ISubmittedDocumentService _SubmittedDocumentService;
        private readonly IDocumentCheckBoxFieldService _DocumentCheckBoxService;
        private readonly IDocumentFormFieldService _DocumentFormFieldService;
        private readonly IDocumentSignatureDataService _DocumentSignatureService;
        private readonly IDocumentAssigneeIntermediateService _DocumentAsigneeService;
        private UserManager<ApplicationUser> _UserManager { get; }
        public DocumentSaveController(IDocumentService ids,
            IDocumentCheckBoxFieldService idcbs,
            IDocumentFormFieldService idffs,
            IDocumentAssigneeIntermediateService idas,
            IDocumentSignatureDataService idss,
            UserManager<ApplicationUser> um,
            ISubmittedDocumentService isds)
        {
            _DocumentSerivce = ids;
            _UserManager = um;
            _DocumentSignatureService = idss;
            _DocumentAsigneeService = idas;
            _DocumentFormFieldService = idffs;
            _SubmittedDocumentService = isds;
            _DocumentCheckBoxService = idcbs;
        }

        public IActionResult GetAllTemplateDocuments()
        {
            return Json(_DocumentSerivce.GetAll<Marine_Permit_Palace.Models.Document>()
                .Select(e => new { e.IdDocument, e.Name }));
        }


        public async Task<JsonResult> GetSubmittedDocumentMeta(string submitted_document_id)
        {
            try
            {
                Guid id;
                if (Guid.TryParse(submitted_document_id, out id))
                {
                    //Grab the desired file
                    SubmittedDocument SubmittedDocument = _SubmittedDocumentService.GetPopulated(id);

                    ApplicationUser user = await _UserManager.GetUserAsync(User);

                    var DocAssignees = _DocumentAsigneeService.GetByDocument(SubmittedDocument.IdSubmittedDocument);
                    var UserPermissions = DocAssignees.FirstOrDefault(e => e.IdAssigneeId == user.Id);
                    if(UserPermissions == null || !UserPermissions.IsActive)
                    {
                        return Json(new Result()
                        {
                            reason = "User does not have permission to view this document",
                            result = "Failure",
                            status_code = 401
                        });
                    }


                    Marine_Permit_Palace.Models.Document document = _DocumentSerivce.Get(SubmittedDocument.DocumentId);
                    MemoryStream PDF_Mem = new MemoryStream();
                    MemoryStream file = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName)));
                    file.CopyTo(PDF_Mem);
                    using (PdfReader reader = new PdfReader(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName))))
                    using (PdfStamper stamper = new PdfStamper(reader, PDF_Mem, '\0', false))
                    {
                        stamper.FormFlattening = false;
                        AcroFields pdfFormFields = stamper.AcroFields;

                        if (user != null)
                        {
                            //populate all the known fields based on user information
                            AutoFillManager.AutoFillBasedOnUser(user, pdfFormFields);
                        }

                        string RequestingUserId = user.Id;

                        List<string> FieldNames = pdfFormFields.Fields.Select(e => e.Key).ToList();
                        //List<DocumentMeta> JsonDocument = new List<DocumentMeta>();
                        List<PDFPage> pages = new List<PDFPage>();
                        foreach (string field in FieldNames)
                        {
                            var Position = pdfFormFields.GetFieldPositions(field).FirstOrDefault();
                            if (Position == null) continue;

                            if (pages.FirstOrDefault(e => e.page_number == Position.page) == null)
                            {
                                pages.Add(new PDFPage() { page_number = Position.page, page = reader.GetPageSize(Position.page), document_meta = new List<DocumentMeta>() });
                            }

                            int indexOfPage = pages.FindIndex(e => e.page_number == Position.page);


                            string field_type;
                            switch (reader.AcroFields.GetFieldType(field))
                            {
                                case AcroFields.FIELD_TYPE_CHECKBOX:
                                    field_type = ("Checkbox");
                                    break;
                                case AcroFields.FIELD_TYPE_COMBO:
                                    field_type = ("Combobox");
                                    break;
                                case AcroFields.FIELD_TYPE_LIST:
                                    field_type = ("List");
                                    break;
                                case AcroFields.FIELD_TYPE_NONE:
                                    field_type = ("None");
                                    break;
                                case AcroFields.FIELD_TYPE_PUSHBUTTON:
                                    field_type = ("Pushbutton");
                                    break;
                                case AcroFields.FIELD_TYPE_RADIOBUTTON:
                                    field_type = ("Radiobutton");
                                    break;
                                case AcroFields.FIELD_TYPE_SIGNATURE:
                                    field_type = ("Signature");
                                    break;
                                case AcroFields.FIELD_TYPE_TEXT:
                                    field_type = ("Text");
                                    break;
                                default:
                                    field_type = ("?");
                                    break;
                            }
                            string value, disabled_message = null;
                            bool IsAllowedToEdit = true;

                            FieldData field_data = SubmittedDocument[field];
                            var AssigneeDodID = "";
                            if (field_data == null)
                            {
                                value = pdfFormFields.GetField(field);
                            }
                            else
                            {
                                value = field_data.value;
                                if (!string.IsNullOrEmpty(field_data.user_assigned))
                                {
                                    var OtherUser = await _UserManager.FindByIdAsync(field_data.user_assigned);
                                    if (OtherUser != null)
                                    {
                                        AssigneeDodID = OtherUser.UserName;
                                        IsAllowedToEdit = RequestingUserId == field_data.user_assigned;
                                        if (!IsAllowedToEdit)
                                        {
                                            disabled_message = $"This field is assigned to {OtherUser.Rank}. {OtherUser.LastName}, {OtherUser.FirstName}";
                                        }
                                    }
                                }

                            }

                            pages[indexOfPage].document_meta.Add(new DocumentMeta()
                            {
                                field_name = field,
                                field_position = Position,
                                value = value,
                                field_type = field_type,
                                assigned_to = AssigneeDodID,
                                disabled_message = disabled_message,
                                is_disabled = !IsAllowedToEdit
                            });
                        }


                        return Json(new
                        {
                            result = "Success",
                            status_code = 200,
                            pages
                        });
                    }
                }
                else
                {
                    return Json(new Result("Failure", "Incorrect Guid Format", 406));
                }
            }
            catch (Exception ex)
            {
                return Json(new Result()
                {
                    reason = $"Something went wrong while reading the file: See Exception...  {ex.Message}",
                    result = "Failure",
                    status_code = 500
                });
            }
        }
        public class PDFPage
        {
            public int page_number { get; set; }
            public Rectangle page { get; set; }
            public List<DocumentMeta> document_meta { get; set; }
            public bool is_completed { get; set; }
            public bool is_edit_locked { get; set; }
        }

        public async Task<IActionResult> GetSavedDocument(string submitted_document_id)
        {
            Guid id;
            if (Guid.TryParse(submitted_document_id, out id))
            {
                //Grab the desired file
                SubmittedDocument SubmittedDocument = _SubmittedDocumentService.GetPopulated(id);



                string DocumentPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", SubmittedDocument.Document.TemplateName);

                if(!System.IO.File.Exists(DocumentPath))
                {
                    return Json(new Result()
                    {
                        reason = "Original Document Not Found In Template Folder",
                        result = "Failure",
                        status_code = 404
                    });
                }



                MemoryStream PDF_Mem = new MemoryStream(System.IO.File.ReadAllBytes(DocumentPath));

                using (PdfReader reader = new PdfReader(PDF_Mem.ToArray()))
                using (PdfStamper stamper = new PdfStamper(reader, PDF_Mem, '\0', false))
                {
                    stamper.FormFlattening = false;
                    AcroFields pdfFormFields = stamper.AcroFields;

                    pdfFormFields.Fields.Select(e => e.Key).ToList().ForEach(e =>
                    {
                        var data = SubmittedDocument[e];
                        if (data != null)
                        {
                            pdfFormFields.SetField(e, data.value, true);
                        }
                    });
                }
                //return to the populated file
                return new FileStreamResult(new MemoryStream(PDF_Mem.ToArray()), "application/pdf");
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }

        [HttpGet]
        public JsonResult GetSavedDocuments()
        {
            var saved_documents = _SubmittedDocumentService.GetAllAssigedToUser(_UserManager.GetUserId(User));

            return Json(new
            {
                result = "Success",
                status_code = 200,
                my_documents = saved_documents
                .OrderByDescending(e => e.DateLastModifiedUtc)
                .OrderBy(e => e.IsCompleted)
                .Select(e => new
                {
                    document_name = e.Name,
                    template_name = (e.Document != null) ? e.Document.Name : "",
                    submitted_document_id = e.IdSubmittedDocument,
                    last_modified_utc = e.DateLastModifiedUtc,
                    created_utc = e.DateCreatedUtc,
                    is_complete = e.IsCompleted
                })
            });
        }

        public struct DocumentMeta
        {
            public string field_name { get; set; }
            public AcroFields.FieldPosition field_position { get; set; }
            public string value { get; set; }
            public string field_type { get; set; }
            public bool is_disabled { get; set; }
            public string disabled_message { get; set; }
            //The dod id
            public string assigned_to { get; set; }
        }


        [HttpGet]
        public JsonResult GetAssignedUsers(string submitted_document_id)
        {
            Guid sd_id;
            if(Guid.TryParse(submitted_document_id, out sd_id))
            {
                var AssignedUserList = _DocumentAsigneeService.GetByDocument(sd_id)
                    .Select(e => new
                    {
                        dod_id = e.Assignee.DodIdNumber.ToString(),
                        first_name = e.Assignee.FirstName,
                        last_name = e.Assignee.LastName,
                        rank = e.Assignee.Rank,
                        is_allowed_approve = e.IsAllowedApprove,
                        is_allowed_assign = e.IsAllowedAssignFields,
                        is_allowed_edit = e.IsAllowedEdit,
                        is_allowed_submit = e.IsAllowedSubmit
                    })
                    .ToList();
                if(AssignedUserList.Count > 0)
                {
                    return Json(AssignedUserList);
                }
                else
                {
                    return Json(new Result()
                    {
                        reason = "No Assigned Users were found.",
                        result = "Failure",
                        status_code = 404
                    });
                }
                    
            }
            else
            {
                return Json(new Result()
                {
                    reason = "Submitted Document ID was in an invalid format.",
                    result = "Failure",
                    status_code = 406
                });
            }
            
        }

        public async Task<JsonResult> GetDocumentMeta(string document_id) // Save the 
        {
            try
            {
                Guid id;
                if (Guid.TryParse(document_id, out id))
                {
                    //Grab the desired file
                    Marine_Permit_Palace.Models.Document document = _DocumentSerivce.Get(id);
                    MemoryStream PDF_Mem = new MemoryStream();
                    MemoryStream file = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName)));
                    file.CopyTo(PDF_Mem);
                    using (PdfReader reader = new PdfReader(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName))))
                    using (PdfStamper stamper = new PdfStamper(reader, PDF_Mem, '\0', false))
                    {
                        stamper.FormFlattening = false;
                        AcroFields pdfFormFields = stamper.AcroFields;
                        //AcroFields.FieldPosition

                        ApplicationUser user = await _UserManager.GetUserAsync(User);
                        if (user != null)
                        {
                            //populate all the known fields based on user information
                            //AutoFillManager.AutoFillBasedOnUser(user, pdfFormFields);
                        }

                        List<PDFPage> pages = new List<PDFPage>();
                        List<string> FieldNames = pdfFormFields.Fields.Select(e => e.Key).ToList();
                        
                        foreach (string field in FieldNames)
                        {
                            var Position = pdfFormFields.GetFieldPositions(field).FirstOrDefault();
                            if (Position == null) continue;

                            if (pages.FirstOrDefault(e => e.page_number == Position.page) == null)
                            {
                                pages.Add(new PDFPage() { page_number = Position.page, page = reader.GetPageSize(Position.page), document_meta = new List<DocumentMeta>() });
                            }

                            int indexOfPage = pages.FindIndex(e => e.page_number == Position.page);

                            string value = pdfFormFields.GetField(field);

                            string field_type;
                            switch (reader.AcroFields.GetFieldType(field))
                            {
                                case AcroFields.FIELD_TYPE_CHECKBOX:
                                    field_type = ("Checkbox");
                                    break;
                                case AcroFields.FIELD_TYPE_COMBO:
                                    field_type = ("Combobox");
                                    break;
                                case AcroFields.FIELD_TYPE_LIST:
                                    field_type = ("List");
                                    break;
                                case AcroFields.FIELD_TYPE_NONE:
                                    field_type = ("None");
                                    break;
                                case AcroFields.FIELD_TYPE_PUSHBUTTON:
                                    field_type = ("Pushbutton");
                                    break;
                                case AcroFields.FIELD_TYPE_RADIOBUTTON:
                                    field_type = ("Radiobutton");
                                    break;
                                case AcroFields.FIELD_TYPE_SIGNATURE:
                                    field_type = ("Signature");
                                    break;
                                case AcroFields.FIELD_TYPE_TEXT:
                                    field_type = ("Text");
                                    break;
                                default:
                                    field_type = ("?");
                                    break;
                            }
                            pages[indexOfPage].document_meta.Add(new DocumentMeta()
                            {
                                field_name = field,
                                field_position = Position,
                                value = value,
                                field_type = field_type
                            });
                        }

                        return Json(new
                        {
                            result = "Success",
                            status_code = 200,
                            pages
                        });
                    }
                }
                else
                {
                    return Json(new Result("Failure", "Incorrect Guid Format", 406));
                }
            }
            catch(Exception ex)
            {
                return Json(new Result()
                {
                    reason = $"Something went wrong while reading the file: See Exception...  {ex.Message}",
                    result = "Failure",
                    status_code = 500
                });
            }
          
        }
        //public async Task<JsonResult> EditSavedFile(string submitted_document_id)
        //{
        //    Guid id;
        //    if (Guid.TryParse(submitted_document_id, out id))
        //    {
        //        //Grab the desired file
        //        SubmittedDocument document = _SubmittedDocumentService.GetPopulated(id);
        //        if(document == null)
        //        {
        //            return Json(new Result()
        //            {
        //                reason = "No file found",
        //                result = "Failure",
        //                status_code = 404
        //            });
        //        }
        //        string RequestingUserId = _UserManager.GetUserId(User);


        //        MemoryStream PDF_Mem = new MemoryStream();
        //        MemoryStream file = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName)));
        //        file.CopyTo(PDF_Mem);
        //        using (PdfReader reader = new PdfReader(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName))))
        //        using (PdfStamper stamper = new PdfStamper(reader, PDF_Mem, '\0', false))
        //        {
        //            stamper.FormFlattening = false;
        //            AcroFields pdfFormFields = stamper.AcroFields;
        //            AcroFields.FieldPosition fieldPosition = new AcroFields.FieldPosition();

        //            List<string> FieldNames = pdfFormFields.Fields.Select(e => e.Key).ToList();
        //            List<DocumentMeta> JsonDocument = new List<DocumentMeta>();
        //            foreach (string field in FieldNames)
        //            {
        //                string field_type;
        //                switch (reader.AcroFields.GetFieldType(field))
        //                {
        //                    case AcroFields.FIELD_TYPE_CHECKBOX:
        //                        field_type = ("Checkbox");
        //                        break;
        //                    case AcroFields.FIELD_TYPE_COMBO:
        //                        field_type = ("Combobox");
        //                        break;
        //                    case AcroFields.FIELD_TYPE_LIST:
        //                        field_type = ("List");
        //                        break;
        //                    case AcroFields.FIELD_TYPE_NONE:
        //                        field_type = ("None");
        //                        break;
        //                    case AcroFields.FIELD_TYPE_PUSHBUTTON:
        //                        field_type = ("Pushbutton");
        //                        break;
        //                    case AcroFields.FIELD_TYPE_RADIOBUTTON:
        //                        field_type = ("Radiobutton");
        //                        break;
        //                    case AcroFields.FIELD_TYPE_SIGNATURE:
        //                        field_type = ("Signature");
        //                        break;
        //                    case AcroFields.FIELD_TYPE_TEXT:
        //                        field_type = ("Text");
        //                        break;
        //                    default:
        //                        field_type = ("?");
        //                        break;
        //                }

        //                var Position = pdfFormFields.GetFieldPositions(field).FirstOrDefault();
        //                if (Position == null) continue;


        //                string value, disabled_message = null;
        //                bool IsAllowedToEdit = true;

        //                var field_data = document[field];
        //                if (field_data == null)
        //                {
        //                    value = pdfFormFields.GetField(field);
        //                }
        //                else
        //                {
        //                    value = field_data.value;
        //                    if(string.IsNullOrEmpty(field_data.user_assigned))
        //                    {
        //                        var OtherUser = await _UserManager.FindByIdAsync(field_data.user_assigned);
        //                        if(OtherUser != null)
        //                        {
        //                            IsAllowedToEdit = RequestingUserId == field_data.user_assigned;
        //                            if (!IsAllowedToEdit)
        //                            {
        //                                disabled_message = $"This field is assigned to {OtherUser.Rank}. {OtherUser.LastName}, {OtherUser.FirstName}";
        //                            }
        //                        }
        //                    }

        //                }
        //                JsonDocument.Add(new DocumentMeta() { field_name = field, field_position = Position, value = value, field_type = field_type, is_disabled = !IsAllowedToEdit, disabled_message = disabled_message });
        //            }
        //            var page1 = reader.GetPageSize(1);
        //            return Json(new
        //            {
        //                document_size = page1,
        //                document_meta = JsonDocument
        //            });
        //        }
        //    }
        //    else
        //    {
        //        return Json(new Result("Failure", "Incorrect Guid Format", 406));
        //    }
        //}

        //public IActionResult GetSavedFile(string submitted_document_id)
        //{
        //    Guid id;
        //    if (Guid.TryParse(submitted_document_id, out id))
        //    {
        //        //Grab the desired file
        //        SubmittedDocument document = _SubmittedDocumentService.GetPopulated(id);
        //        MemoryStream PDF_Mem = new MemoryStream();
        //        MemoryStream file = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName)));
        //        file.CopyTo(PDF_Mem);
        //        using (PdfReader reader = new PdfReader(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName))))
        //        using (PdfStamper stamper = new PdfStamper(reader, PDF_Mem, '\0', false))
        //        {
        //            stamper.FormFlattening = false;
        //            AcroFields pdfFormFields = stamper.AcroFields;
        //            AcroFields.FieldPosition fieldPosition = new AcroFields.FieldPosition();
        //            if (!AutoFillManager.AutoFillFromFields(pdfFormFields, document.DocumentFormFields.ToList(), document.DocumentCheckBoxFields.ToList(), document.DocumentSignatureFields.ToList()))
        //            {
        //                //not all fields were populated ...
        //            }
        //        }
        //        //return to the populated file
        //        return new FileStreamResult(new MemoryStream(PDF_Mem.ToArray()), "application/pdf");
        //    }
        //    else
        //    {
        //        return Json(new Result("Failure", "Incorrect Guid Format", 406));
        //    }
        //}

        //public IActionResult GetNewNotPopulatedFile(string document_id)
        //{
        //    Guid id;
        //    if (Guid.TryParse(document_id, out id))
        //    {
        //        //Grab the desired file
        //        Marine_Permit_Palace.Models.Document document = _DocumentSerivce.Get(id);
        //        MemoryStream PDF_Mem = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName)));
        //        return new FileStreamResult(PDF_Mem, "application/pdf");
        //    }
        //    else
        //    {
        //        return Json(new Result("Failure", "Incorrect Guid Format", 406));
        //    }
        //}

        public class SaveDocumentObject
        {
            public List<DocumentMeta> document_meta { get; set; }
            public string name { get; set; }
            public string document_id { get; set; }
            public string submitted_file_id { get; set; }
            public bool is_completed { get; set; }
        }


        [HttpPost]
        public JsonResult SaveFile([FromBody] SaveDocumentObject document)
        {
            if (document != null && !string.IsNullOrEmpty(document.submitted_file_id))
            {
                Guid SubmittedDocId;
                if (!Guid.TryParse(document.submitted_file_id, out SubmittedDocId))
                {
                    return Json(new { result = "Failure", reason = "Incorrect GUID format" });
                }
               
                var user = _UserManager.GetUserAsync(User).Result;
                Guid sub_file_guid = Guid.Empty;
                SubmittedDocument SubmittedDoc = null;
                if (Guid.TryParse(document.submitted_file_id, out sub_file_guid))
                {
                    SubmittedDoc = _SubmittedDocumentService.Get(sub_file_guid);
                    
                    
                    SubmittedDoc.Name = document.name;
                    if(SubmittedDoc.IsCompleted)
                    {
                        return Json(new Result()
                        {
                            reason = "Document is no longer editable. Document was completed.",
                            result = "Failure",
                            status_code = 400
                        });
                    }
                    if(SubmittedDoc.IsEditLocked)
                    {
                        return Json(new Result()
                        {
                            reason = "Document is not editable.",
                            result = "Failure",
                            status_code = 400
                        });
                    }
                }
                else
                {
                    return Json(new { result = "Failure", reason = "Incorrect GUID format", status_code = 400 });
                }
                    
                
                Marine_Permit_Palace.Models.Document RefDocument = _DocumentSerivce.Get(SubmittedDoc.DocumentId);
                if (RefDocument == null)
                {
                    return Json(new { result = "Failure", reason = "No Document with that ID exists" });
                }


                var AssignedUsers = _DocumentAsigneeService.GetByDocument(SubmittedDoc.IdSubmittedDocument);

                var UserPermissions = AssignedUsers.FirstOrDefault(e => e.IdAssigneeId == user.Id);
                if (UserPermissions == null || !UserPermissions.IsAllowedEdit)
                {
                    return Json(new Result()
                    {
                        reason = "User Does not have permission to edit this document.",
                        result = "Failure",
                        status_code = 401
                    });
                }
                List<DocumentCheckBoxField> CBFields = document.document_meta
                    .Where(e => e.field_type  == "Checkbox")
                    .Select(e => new DocumentCheckBoxField()
                    {
                        FormValue = (e.value == "On"),
                        IdFormName = e.field_name,
                        IsCompleted = (e.value == "On"),
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument
                    }).ToList();

                List<DocumentFormField> FMFields = document.document_meta
                    .Where(e => e.field_type == "Text")
                    .Select(e => new DocumentFormField()
                    {
                        FormValue = e.value,
                        IdFormName = e.field_name,
                        IsCompleted = !string.IsNullOrEmpty(e.value),
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument
                    }).ToList();

                List<DocumentSignatureField> SigFields = document.document_meta
                    .Where(e => e.field_type == "Signature")
                    .Select(e => new DocumentSignatureField()
                    {
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument,
                        IdFormName = e.field_name,
                        IsCompleted = !string.IsNullOrEmpty(e.value),
                        SignatureData = !string.IsNullOrEmpty(e.value) ? new DataStorage()
                        {
                            Data = Convert.FromBase64String(e.value),
                            Type = AppDataType.SIGNATURE
                        } : null
                    }).ToList();

                try { _DocumentSignatureService.SaveWithDocumentSignatureData(SigFields); } catch(Exception ex)
                {
                    return Json(new Result()
                    {
                        reason = ex.Message,
                        result = "Failure",
                        status_code = 500
                    });
                }
                try { _DocumentCheckBoxService.SaveAllCheckBoxFields(CBFields); }catch(Exception ex)
                {
                    return Json(new Result()
                    {
                        reason = ex.Message,
                        result = "Failure",
                        status_code = 500
                    });
                }
                try { _DocumentFormFieldService.SaveAllFormFields(FMFields); }catch(Exception ex)
                {
                    return Json(new Result()
                    {
                        reason = ex.Message,
                        result = "Failure",
                        status_code = 500
                    });
                }
                if(document.is_completed)
                {
                    if(UserPermissions.IsAllowedSubmit)
                    {
                        SubmittedDoc.IsCompleted = true;
                        SubmittedDoc.DateCompletedUtc = DateTime.UtcNow;
                        SubmittedDoc.IsEditLocked = true;
                    }
                    else
                    {
                        return Json(new Result()
                        {
                            reason = "Document saved, but user does not have permission to submit this document.",
                            result = "Failure",
                            status_code = 401
                        });
                    }
                }
                SubmittedDoc = _SubmittedDocumentService.Update(SubmittedDoc);
                return Json(new Result(){ result = "Success", reason = SubmittedDoc.IdSubmittedDocument.ToString()});
            }

            else return Json(new Result(){ result = "Failure", status_code = 400 });
        }

     
    }
}
