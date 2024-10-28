using Microsoft.AspNetCore.Mvc;
using proj2_tutorialPL.Models;
using System.Diagnostics;

namespace proj2_tutorialPL.Controllers
{
    public class HomeController : Controller
    {


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [Route("polityka")]
        public IActionResult Redirect()
        {
            return RedirectToAction("Privacy");
        }

        [Route("testowy/{name}")]
        public IActionResult Produkt(string name)
        { 
             return View();
        }
    }

}