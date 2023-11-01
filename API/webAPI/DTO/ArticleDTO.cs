using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DATA.EF;

namespace webAPI.DTO
{
    public class ArticleDTO
    {
        public int ID { get; set; }
        public string article { get; set; }
        public string header { get; set; }
        public List<RV_ArticelPictures> pictures { get; set; }
        
    }
}