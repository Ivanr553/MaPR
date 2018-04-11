using iTextSharp.text.pdf;
using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Http;
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
        public DocumentSaveController(IDocumentService ids, ISubmittedDocumentService isds)
        {
            _DocumentSerivce = ids;
            _SubmittedDocumentService = isds;
        }

        public IActionResult GetAllDocuments()
        {
            return Json(_DocumentSerivce.GetAll<Document>());
        }

        public IActionResult GetNewAutopopulatedFile(string document_id)
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

                    pdfFormFields.SetField("last_first_middle", "Bobby G", true);

                    pdfFormFields.SetField("rank", "G");

                    

                    //populate all the known fields
                    //return to the populated file
                }
                return new FileStreamResult(new MemoryStream(PDF_Mem.ToArray()), "application/pdf");
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }
        }

        public IActionResult GetSavedFile(string submitted_document_id)
        {
            //grab the document base
            //populate the file based on the saved results
            //return the populated saved file

            throw new NotImplementedException();
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
                //populate all the known fields
                //return to the populated file
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
                if(!Guid.TryParse(document_id, out DocumentId))
                {
                    return Json(new { result = "Failure", reason = "Incorrect GUID format" });
                }
                Document RefDocument = _DocumentSerivce.Get(DocumentId);
                if(RefDocument == null)
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

                    form_fields.Fields.Keys.ToList().ForEach(e => {
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
                    if(SubmittedDoc == null)
                    {
                        SubmittedDoc = new SubmittedDocument()
                        {
                            Document = RefDocument,
                            DocumentId = DocumentId,
                            Name = custom_name
                        };
                    }

                    SubmittedDoc.Name = custom_name;
                    if(SignatureFields.All(e => !string.IsNullOrEmpty(e.Value)))
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
                    //Save the Sig Fields
                    throw new NotImplementedException();
                }


                return Json(new { result = "Success" });
            }
            else return Json(new { result = "FAILURE" });
        }

    }
}
