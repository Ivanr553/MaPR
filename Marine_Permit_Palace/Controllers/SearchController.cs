using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Controllers
{
    public class SearchController : Controller
    {
        public SearchController()
        {

        }

        [HttpGet]
        public JsonResult SubmittedDocuments(string search_terms)
        {
            /*
             I need to search the names of documents and dates of document completion and creation. 
             I need to search for the users Organization as well.
             I need the ability to send advanced search queries.
             
             
             
             
             */

            return Json(new { result="TEST", search_terms });
        }

        [HttpPost]
        public JsonResult SubmittedDocument(AdvancedSearchSettings settings)
        {
            return Json(new {result = "TEST", settings });
        }

        public struct AdvancedSearchSettings
        {
            public bool include_creation_date { get; set; }
            public bool include_completed_date { get; set; }
            public bool include_completed { get; set; }
            public bool include_in_progress { get; set; }
            public bool include_organization { get; set; }
            public bool include_user_name { get; set; }
            public bool include_dod { get; set; }
            public string search_terms { get; set; }
        }
    }
}
