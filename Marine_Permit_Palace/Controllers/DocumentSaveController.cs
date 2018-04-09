using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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


        public IActionResult GetNewAutopopulatedFile(string document_id)
        {
            Guid id;
            if (Guid.TryParse(document_id, out id))
            {
                //Grab the desired file
                Document document = _DocumentSerivce.Get(id);
                //populate all the known fields
                //return to the populated file
            }
            else
            {
                return Json(new Result("Failure", "Incorrect Guid Format", 406));
            }




            throw new NotImplementedException();
            //return new FileStreamResult()
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
            throw new NotImplementedException();
        }

        public JsonResult SaveFile(string custom_name, IFormFile pdf_doc)
        {
            throw new NotImplementedException();
        }

    }
}
