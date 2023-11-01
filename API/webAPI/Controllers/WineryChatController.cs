using DATA.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using webAPI.DTO;

namespace webAPI.Controllers
{
    public class WineryChatController : ApiController
    {
        public static ArvinoDbContext db = new ArvinoDbContext();


        /// <summary>
        /// https://localhost:44370/api/WineryChat?wineryId=1&email=vmagen@gmail.com
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public IHttpActionResult Get(int wineryId, string email  )
        {
            try
            {
                List<ChatDTO> messagesByGroup = new List<ChatDTO>();
                var winery = db.RV_Winery.SingleOrDefault(i => i.wineryId == wineryId);
                if (winery != null)
                {
                    
                    var messages = db.RV_ChatWineryUser
                                            .Where(i => (i.fromemail == email
                                                       && i.wineryId == wineryId) 
                                                        || i.fromemail == winery.wineryManagerEmail
                                                        && i.wineryId == wineryId
                                                            && i.toEmail == email);

                    foreach (var item in messages.OrderByDescending(i => i.dateTime))
                    {
                        try
                        {
                            ChatDTO single = new ChatDTO();
                            single._id = item.id;
                            single.text = item.text;
                            single.createdAt = item.dateTime;
                            single.wineryId = wineryId;
                            GMUserDTO gmUser = new GMUserDTO();
                            gmUser._id = item.fromemail;

                            var singleUser = db.RV_User.SingleOrDefault(i => i.email == item.fromemail);
                            if (singleUser != null)
                            {
                                gmUser.name = singleUser.Name;
                                gmUser.avatar = singleUser.picture;
                                single.user = gmUser;
                                messagesByGroup.Add(single);
                            }
                            else
                            {
                                return Content(HttpStatusCode.BadRequest, "can't find user!");
                            }

                        }
                        catch (Exception ex)
                        {
                            return Content(HttpStatusCode.BadRequest, ex.Message);

                        }
                    }
                }

                return Content(HttpStatusCode.OK, messagesByGroup);
            }


            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        public IHttpActionResult Post([FromBody] GMDTO value)
        {
            try
            {
                RV_GroupMessages gm = new RV_GroupMessages()
                {
                    createdAt = DateTime.Now,
                    userEmail = value.user._id,
                    text = value.text,
                    GroupID = value.groupId

                };
                db.RV_GroupMessages.Add(gm);
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}