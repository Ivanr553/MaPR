using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Marine_Permit_Palace.Models;

namespace Marine_Permit_Palace.Controllers
{
    public class AController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult App()
        {
            return View();
        }
    }
}
