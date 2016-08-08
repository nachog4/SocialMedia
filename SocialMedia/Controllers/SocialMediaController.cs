using SocialMedia.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SocialMedia.Controllers
{
    public class SocialMediaController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: SocialMedia
        public ActionResult Index()
        {
            List<Post> visiblePosts = db.Posts.OrderByDescending(i => i.PostId).ToList();
            ViewBag.Posts = visiblePosts;
            return View();
        }
    }
}