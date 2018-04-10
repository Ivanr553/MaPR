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

        public JsonResult SaveFile(string custom_name, IFormFile pdf_doc)
        {
            if (pdf_doc != null && !string.IsNullOrEmpty(custom_name))
            {
                return Json(new { result = "Success" });
            }
            else return Json(new { result = "FAILURE" });
        }

    }
}
