using iTextSharp.text.pdf;
using Marine_Permit_Palace.ModelManagers;
using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        private UserManager<ApplicationUser> _UserManager { get; }
        public DocumentSaveController(IDocumentService ids,
            IDocumentCheckBoxFieldService idcbs,
            IDocumentFormFieldService idffs,
            UserManager<ApplicationUser> um,
            ISubmittedDocumentService isds)
        {
            _DocumentSerivce = ids;
            _UserManager = um;
            _DocumentFormFieldService = idffs;
            _SubmittedDocumentService = isds;
            _DocumentCheckBoxService = idcbs;

        }

        public IActionResult GetAllDocuments()
        {
            return Json(_DocumentSerivce.GetAll<Document>()
                .Select(e => new { e.IdDocument, e.Name }));
        }

        public async Task<IActionResult> GetNewAutopopulatedFile(string document_id)
        {
            Guid id;
            if (Guid.TryParse(document_id, out id))
            {
                //Grab the desired file
                Document document = _DocumentSerivce.Get(id);
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

        public async Task<JsonResult> GetDocumentMeta(string document_id)
        {
            Guid id;
            if (Guid.TryParse(document_id, out id))
            {
                //Grab the desired file
                Document document = _DocumentSerivce.Get(id);
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
                    List<object> JsonDocument = new List<object>();
                    foreach(string field in FieldNames)
                    {
                        
                        var Position = pdfFormFields.GetFieldPositions(field).FirstOrDefault();
                        if (Position == null) continue;
                        string value = pdfFormFields.GetField(field);
                        JsonDocument.Add(new { field_name = field, field_position = Position, value });
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
                Document document = _DocumentSerivce.Get(id);
                MemoryStream PDF_Mem = new MemoryStream(System.IO.File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "dist", "documents", document.TemplateName)));
                return new FileStreamResult(PDF_Mem, "application/pdf");
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }

        public JsonResult SaveFile(string custom_name, IFormFile pdf_doc, string document_id, string sub_file_id = null)
        {
            if (pdf_doc != null && !string.IsNullOrEmpty(custom_name) && !string.IsNullOrEmpty(document_id))
            {
                Guid DocumentId;
                if (!Guid.TryParse(document_id, out DocumentId))
                {
                    return Json(new { result = "Failure", reason = "Incorrect GUID format" });
                }
                Document RefDocument = _DocumentSerivce.Get(DocumentId);
                if (RefDocument == null)
                {
                    return Json(new { result = "Failure", reason = "No Docuemnt with that ID exists" });
                }
                MemoryStream saved_doc = new MemoryStream();
                pdf_doc.OpenReadStream().CopyTo(saved_doc);
                using (PdfReader reader = new PdfReader(saved_doc.ToArray()))
                using (PdfStamper stamper = new PdfStamper(reader, saved_doc))
                {
                    AcroFields form_fields = stamper.AcroFields;
                    //Field Name, Field Value
                    Dictionary<string, string> TextFields = new Dictionary<string, string>();
                    Dictionary<string, string> CheckBoxFields = new Dictionary<string, string>();
                    Dictionary<string, string> SignatureFields = new Dictionary<string, string>();

                    form_fields.Fields.Keys.ToList().ForEach(e =>
                    {
                        switch (form_fields.GetFieldType(e))
                        {
                            case AcroFields.FIELD_TYPE_TEXT:
                                {
                                    TextFields.Add(e, form_fields.GetField(e));
                                    break;
                                }
                            case AcroFields.FIELD_TYPE_CHECKBOX:
                                {
                                    CheckBoxFields.Add(e, form_fields.GetField(e));
                                    break;
                                }
                            case AcroFields.FIELD_TYPE_SIGNATURE:
                                {
                                    SignatureFields.Add(e, form_fields.GetField(e));
                                    break;
                                }
                            default:
                                {
                                    //Field not supported
                                    break;
                                }
                        }
                    });
                    Guid sub_file_guid;
                    SubmittedDocument SubmittedDoc = null;
                    if (Guid.TryParse(sub_file_id, out sub_file_guid))
                    {
                        SubmittedDoc = _SubmittedDocumentService.Get(sub_file_guid);
                    }
                    if (SubmittedDoc == null)
                    {
                        SubmittedDoc = new SubmittedDocument()
                        {
                            Document = RefDocument,
                            DocumentId = DocumentId,
                            Name = custom_name
                        };
                    }

                    SubmittedDoc.Name = custom_name;
                    if (SignatureFields.All(e => !string.IsNullOrEmpty(e.Value)))
                    {
                        //Check if all Fields are occupied based on javascript results ??? 
                        //Use NODEJs to execute the stored Javascript code (Will call from a list of fields)
                        //Like IsCompleted? Will return false if the field is empty and required
                        //Think of other cool ideas to check if these fields are required or not
                        SubmittedDoc.IsCompleted = true;
                    }
                    if (string.IsNullOrEmpty(sub_file_id))
                    {
                        SubmittedDoc = _SubmittedDocumentService.Add(SubmittedDoc);
                    }
                    else
                    {
                        SubmittedDoc = _SubmittedDocumentService.Update(SubmittedDoc);
                    }
                    List<DocumentCheckBoxField> CBFields = CheckBoxFields.Select(e => new DocumentCheckBoxField() { FormValue = (e.Value == "On"), IdFormName = e.Key, IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument }).ToList();
                    List<DocumentFormField> FMFields = TextFields.Select(e => new DocumentFormField() { FormValue = e.Value, IdFormName = e.Key, IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument }).ToList();

                    _DocumentCheckBoxService.SaveAllCheckBoxFields(CBFields);
                    _DocumentFormFieldService.SaveAllFormFields(FMFields);
                    ///TODO SIGNATURE FIELDS
                    //Save the Sig Fields
                }
                return Json(new { result = "Success" });
            }

            else return Json(new { result = "Failure" });
        }

    }
}
