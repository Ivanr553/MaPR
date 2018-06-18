﻿using iTextSharp.text;
using iTextSharp.text.pdf;
using Marine_Permit_Palace.ModelManagers;
using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
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
    
    public class DocumentSaveController : Controller
    {
        private readonly IDocumentService _DocumentSerivce;
        private readonly ISubmittedDocumentService _SubmittedDocumentService;
        private readonly IDocumentCheckBoxFieldService _DocumentCheckBoxService;
        private readonly IDocumentFormFieldService _DocumentFormFieldService;
        private readonly IDocumentSignatureDataService _DocumentSignatureService;
        private UserManager<ApplicationUser> _UserManager { get; }
        public DocumentSaveController(IDocumentService ids,
            IDocumentCheckBoxFieldService idcbs,
            IDocumentFormFieldService idffs,
            IDocumentSignatureDataService idss,
            UserManager<ApplicationUser> um,
            ISubmittedDocumentService isds)
        {
            _DocumentSerivce = ids;
            _UserManager = um;
            _DocumentSignatureService = idss;
            _DocumentFormFieldService = idffs;
            _SubmittedDocumentService = isds;
            _DocumentCheckBoxService = idcbs;
        }

        public IActionResult GetAllDocuments()
        {
            return Json(_DocumentSerivce.GetAll<Marine_Permit_Palace.Models.Document>()
                .Select(e => new { e.IdDocument, e.Name }));
        }

        public async Task<IActionResult> GetNewAutopopulatedFile(string document_id)
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

                    ApplicationUser user = await _UserManager.GetUserAsync(User);
                    if (user != null)
                    {
                        //populate all the known fields based on user information
                        AutoFillManager.AutoFillBasedOnUser(user, pdfFormFields);
                    }
                }
                //return to the populated file
                return new FileStreamResult(new MemoryStream(PDF_Mem.ToArray()), "application/pdf");
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }

        public struct DocumentMeta
        {
            public string field_name { get; set; }
            public AcroFields.FieldPosition field_position { get; set; }
            public string value { get; set; }
            public string field_type { get; set; }
        }

        public async Task<JsonResult> GetDocumentMeta(string document_id) // Save the 
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
                        AutoFillManager.AutoFillBasedOnUser(user, pdfFormFields);
                    }


                    List<string> FieldNames = pdfFormFields.Fields.Select(e => e.Key).ToList();
                    List<DocumentMeta> JsonDocument = new List<DocumentMeta>();
                    foreach (string field in FieldNames)
                    {
                        var Position = pdfFormFields.GetFieldPositions(field).FirstOrDefault();
                        if (Position == null) continue;
                        string value = pdfFormFields.GetField(field);

                        string field_type;
                        switch(reader.AcroFields.GetFieldType(field))
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
                        JsonDocument.Add(new DocumentMeta() { field_name = field, field_position = Position, value = value, field_type = field_type });
                    }
                    var page1 = reader.GetPageSize(1);
                    return Json(new
                    {
                        document_size = page1,
                        document_meta = JsonDocument
                    });
                }
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }
        public IActionResult EditSavedFile(string submitted_document_id)
        {
            Guid id;
            if (Guid.TryParse(submitted_document_id, out id))
            {
                //Grab the desired file
                SubmittedDocument document = _SubmittedDocumentService.GetPopulated(id);
                MemoryStream PDF_Mem = new MemoryStream();
                MemoryStream file = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName)));
                file.CopyTo(PDF_Mem);
                using (PdfReader reader = new PdfReader(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName))))
                using (PdfStamper stamper = new PdfStamper(reader, PDF_Mem, '\0', false))
                {
                    stamper.FormFlattening = false;
                    AcroFields pdfFormFields = stamper.AcroFields;
                    AcroFields.FieldPosition fieldPosition = new AcroFields.FieldPosition();

                    List<string> FieldNames = pdfFormFields.Fields.Select(e => e.Key).ToList();
                    List<DocumentMeta> JsonDocument = new List<DocumentMeta>();
                    foreach (string field in FieldNames)
                    {
                        var Position = pdfFormFields.GetFieldPositions(field).FirstOrDefault();
                        if (Position == null) continue;
                        string value = pdfFormFields.GetField(field);
                        JsonDocument.Add(new DocumentMeta() { field_name = field, field_position = Position, value = value });
                    }
                    var page1 = reader.GetPageSize(1);
                    return Json(new
                    {
                        document_size = page1,
                        document_meta = JsonDocument
                    });
                }
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }

        public IActionResult GetSavedFile(string submitted_document_id)
        {
            Guid id;
            if (Guid.TryParse(submitted_document_id, out id))
            {
                //Grab the desired file
                SubmittedDocument document = _SubmittedDocumentService.GetPopulated(id);
                MemoryStream PDF_Mem = new MemoryStream();
                MemoryStream file = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName)));
                file.CopyTo(PDF_Mem);
                using (PdfReader reader = new PdfReader(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.Document.TemplateName))))
                using (PdfStamper stamper = new PdfStamper(reader, PDF_Mem, '\0', false))
                {
                    stamper.FormFlattening = false;
                    AcroFields pdfFormFields = stamper.AcroFields;
                    AcroFields.FieldPosition fieldPosition = new AcroFields.FieldPosition();
                    if (!AutoFillManager.AutoFillFromFields(pdfFormFields, document.DocumentFormFields.ToList(), document.DocumentCheckBoxFields.ToList(), document.DocumentSignatureFields.ToList()))
                    {
                        //not all fields were populated ... what do
                    }
                }
                //return to the populated file
                return new FileStreamResult(new MemoryStream(PDF_Mem.ToArray()), "application/pdf");
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }

        public IActionResult GetNewNotPopulatedFile(string document_id)
        {
            Guid id;
            if (Guid.TryParse(document_id, out id))
            {
                //Grab the desired file
                Marine_Permit_Palace.Models.Document document = _DocumentSerivce.Get(id);
                MemoryStream PDF_Mem = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName)));
                return new FileStreamResult(PDF_Mem, "application/pdf");
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }

        public class SaveDocumentObject
        {
            public List<DocumentMeta> document_meta { get; set; }
            public string name { get; set; }
            public string document_id { get; set; }
            public string submitted_file_id { get; set; }
        }


        [HttpPost]
        public JsonResult SaveFile([FromBody] SaveDocumentObject document)
        {
            if (document != null && !string.IsNullOrEmpty(document.name) && !string.IsNullOrEmpty(document.document_id))
            {
                Guid DocumentId;
                if (!Guid.TryParse(document.document_id, out DocumentId))
                {
                    return Json(new { result = "Failure", reason = "Incorrect GUID format" });
                }
                Marine_Permit_Palace.Models.Document RefDocument = _DocumentSerivce.Get(DocumentId);
                if (RefDocument == null)
                {
                    return Json(new { result = "Failure", reason = "No Document with that ID exists" });
                }

                Guid sub_file_guid = Guid.Empty;
                SubmittedDocument SubmittedDoc = null;
                if (Guid.TryParse(document.submitted_file_id, out sub_file_guid))
                {
                    SubmittedDoc = _SubmittedDocumentService.Get(sub_file_guid);
                    SubmittedDoc.Name = document.name;
                }
                else
                {
                    SubmittedDoc = new SubmittedDocument()
                    {
                        Document = RefDocument,
                        DocumentId = DocumentId,
                        Name = document.name
                    };
                }
                if (sub_file_guid == Guid.Empty)
                {
                    SubmittedDoc = _SubmittedDocumentService.Add(SubmittedDoc);
                }
                else
                {
                    SubmittedDoc = _SubmittedDocumentService.Update(SubmittedDoc);
                }
                List<DocumentCheckBoxField> CBFields = document.document_meta
                    .Where(e => e.field_type  == "Checkbox")
                    .Select(e => new DocumentCheckBoxField()
                    {
                        FormValue = (e.value == "On"),
                        IdFormName = e.field_name,
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument
                    }).ToList();

                List<DocumentFormField> FMFields = document.document_meta
                    .Where(e => e.field_type == "Text")
                    .Select(e => new DocumentFormField()
                    {
                        FormValue = e.value,
                        IdFormName = e.field_name,
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument
                    }).ToList();

                List<DocumentSignatureField> SigFields = document.document_meta
                    .Where(e => e.field_type == "Signature")
                    .Select(e => new DocumentSignatureField()
                    {
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument,
                        IdFormName = e.field_name,
                        SignatureData = new DataStorage()
                        {
                            Data = Convert.FromBase64String(e.value),
                            Type = AppDataType.SIGNATURE
                        }
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


                return Json(new Result(){ result = "Success", reason = SubmittedDoc.IdSubmittedDocument.ToString()});
            }

            else return Json(new Result(){ result = "Failure", status_code = 400 });
        }

        ///TODO Save signature by document ID ? -- Save signatures separately.


        /// <summary>
        /// Will return all documents that were edited / saved by the user.
        /// </summary>
        /// <returns></returns>
        public JsonResult GetSavedDocuments()
        {
            throw new NotImplementedException();
            var user = _UserManager.GetUserAsync(User).Result;
            //_SubmittedDocumentService get all from user.
        }

        public JsonResult SearchSavedDocument(string name)
        {
            throw new NotImplementedException();
        }
    }
}
