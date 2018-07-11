using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Controllers
{
    [Authorize]
    public class DocumentManagerController : Controller
    {
        private IDocumentService _DocumentService;
        public DocumentManagerController(IDocumentService ids)
        {
            _DocumentService = ids;
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

        [HttpGet]
        public JsonResult AssignDocument()
        {
            return Json(false);
        }

        //User Search? -- Returns a list contacts in a class?
    }
}
