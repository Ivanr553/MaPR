using Marine_Permit_Palace.Models;
using Marine_Permit_Palace.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Controllers
{
    public class DocumentUploadController : Controller
    {
        IDocumentService _DocumentService;
        IHostingEnvironment _HostingEnv;
        public DocumentUploadController(IDocumentService ids, IHostingEnvironment env)
        {
            _HostingEnv = env;
            _DocumentService = ids;
        }

        [HttpPost]
        public IActionResult Upload(List<IFormFile> files)
        {
            Dictionary<string, string> FileResults = new Dictionary<string, string>();

            if(files.Count == 0)
            {
                return Json(new Result()
                {
                    reason = "No files were sent",
                    result = "Failure",
                    status_code = 400
                });
            }
            foreach(var file in files)
            {
                //Verify the file type
                if(Path.GetExtension(file.FileName) == ".pdf")
                {
                    Document pdfDoc = new Document()
                    {
                        CategoryId = Guid.Parse("23E78816-B264-4403-8763-C5DE3300202B"),
                        Name = Path.GetFileNameWithoutExtension(file.FileName),
                        TemplateName = file.FileName
                    };
                    pdfDoc = _DocumentService.Add(pdfDoc, User);
                    ///TODO
                    //Read the entire document and warn of any unsuppored fields


                    string path = Path.Combine(_HostingEnv.WebRootPath, "dist", "documents");
                    
                    int FileExistCount = 2;
                    if(System.IO.File.Exists(Path.Combine(path, file.FileName)))
                    {
                        while(System.IO.File.Exists(Path.Combine(path, FileExistCount + "_" + file.FileName)))
                        {
                            FileExistCount++;
                        }
                        path = Path.Combine(path, FileExistCount + "_" + file.FileName);
                    }
                    else
                    {
                        path = Path.Combine(path, file.FileName);
                    }
                    using (FileStream fs = new FileStream(path, FileMode.CreateNew))
                    {
                        file.CopyTo(fs);
                    }
                    FileResults.Add(file.FileName, "Success");
                    
                }
                else
                {
                    FileResults.Add(file.FileName, "Failure; Filetype not supported");
                }
            }
            return Json(new
            {
                reason = "Result Received",
                result = "Success",
                status_code = 200,
                result_data = FileResults
            });
        }
    }
}
