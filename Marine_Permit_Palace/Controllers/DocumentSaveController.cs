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

        public struct DocumentMeta
        {
            public string field_name { get; set; }
            public AcroFields.FieldPosition field_position { get; set; }
            public string value { get; set; }
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
                Document document = _DocumentSerivce.Get(id);
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

        public JsonResult SaveFile([FromBody] SaveDocumentObject document)
        {
            if (document != null && !string.IsNullOrEmpty(document.name) && !string.IsNullOrEmpty(document.document_id))
            {
                Guid DocumentId;
                if (!Guid.TryParse(document.document_id, out DocumentId))
                {
                    return Json(new { result = "Failure", reason = "Incorrect GUID format" });
                }
                Document RefDocument = _DocumentSerivce.Get(DocumentId);
                if (RefDocument == null)
                {
                    return Json(new { result = "Failure", reason = "No Docuemnt with that ID exists" });
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
                //if (SignatureFields.All(e => !string.IsNullOrEmpty(e.Value)))
                //{
                //    //Check if all Fields are occupied based on javascript results ??? 
                //    //Use NODEJs to execute the stored Javascript code (Will call from a list of fields)
                //    //Like IsCompleted? Will return false if the field is empty and required
                //    //Think of other cool ideas to check if these fields are required or not
                //    SubmittedDoc.IsCompleted = true;
                //}
                if (sub_file_guid != Guid.Empty)
                {
                    SubmittedDoc = _SubmittedDocumentService.Add(SubmittedDoc);
                }
                else
                {
                    SubmittedDoc = _SubmittedDocumentService.Update(SubmittedDoc);
                }
                List<DocumentCheckBoxField> CBFields = document.document_meta
                    .Where(e => e.value == "True" || e.value == "False")
                    .Select(e => new DocumentCheckBoxField()
                    {
                        FormValue = (e.value == "On"),
                        IdFormName = e.field_name,
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument
                    }).ToList();

                List<DocumentFormField> FMFields = document.document_meta
                    .Where(e => e.value != "True" && e.value != "False")
                    .Select(e => new DocumentFormField()
                    {
                        FormValue = e.value,
                        IdFormName = e.field_name,
                        IdSubmittedDocumentId = SubmittedDoc.IdSubmittedDocument
                    }).ToList();

                ///TODO SIGNATURE FIELDS
                //Save the Sig Fields

                _DocumentCheckBoxService.SaveAllCheckBoxFields(CBFields);
                _DocumentFormFieldService.SaveAllFormFields(FMFields);


                return Json(new { result = "Success" });
            }

            else return Json(new { result = "Failure" });
        }

        /// <summary>
        /// Will return all documents that were edited / saved by the user.
        /// </summary>
        /// <returns></returns>
        public JsonResult GetSavedDocuments()
        {
            throw new NotImplementedException();
        }

        public JsonResult SearchSavedDocument(string name)
        {
            throw new NotImplementedException();
        }
    }
}
