using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DATA.EF;
using webAPI.Models;
using webAPI.DTO;
using System.Data.Entity.Validation;
using System.Data.Entity;

namespace webAPI.Controllers
{
    public class ArticleController : ApiController
    {

        /// <summary>
        /// https://localhost:44370/api/Article/GetAllArticles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Article/GetAllArticles")]
        public IHttpActionResult GetAllArticles()
        {
            try
            {
                using (var db= new ArvinoDbContext())
                {
                    try
                    {
                        var list = db.RV_articles
                                        .Select(i => new ArticleDTO()
                                        {
                                            ID = i.ID,
                                            article = i.article,
                                            header=i.header,
                                            pictures = db.RV_ArticelPictures.Where(w => w.articleId == i.ID).ToList()
                                        }).ToList();
                        return Ok(list);
                    }
                    catch (Exception ex)
                    {
                        return Content(HttpStatusCode.BadRequest, ex);
                    }
                }

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}