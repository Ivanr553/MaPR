using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Controllers
{
    [Authorize]
    public class DocumentManagerController : Controller
    {
        public DocumentManagerController()
        {

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
