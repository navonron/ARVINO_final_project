using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DATA.EF;
using webAPI.DTO;
using System.Data.Entity;

namespace webAPI.Models
{
    public class RateModel
    {

        public static List<RateDTO> TopWine(int wineryId, ArvinoDbContext db)
        {
            RV_WineComment[] rate = db.RV_WineComment.Where(x => x.RV_Wine.wineryId == wineryId && x.rate != null).OrderBy(x => x.wineId).ToArray();

            List<RateDTO> list = db.RV_WineComment
                    .Include(x => x.RV_Wine)
                        .Where(x => x.RV_Wine.wineryId == wineryId && x.rate != null)
                        .OrderByDescending(x => x.rate)
                        .Select(w => new RateDTO()
                        {
                            rateId = w.id,
                            rateDate = w.date,
                            rate = w.rate ?? 0,
                            wineId = w.wineId,
                            wineName  =db.RV_Wine.FirstOrDefault(e=>e.wineId == w.wineId).wineName,
                            ratedByUserEmail = w.email,
                            userName = db.RV_User.FirstOrDefault(e => e.email == w.email).Name,
                            UserPitcure = db.RV_User.FirstOrDefault(e => e.email == w.email).picture,
                            winePitcure = db.RV_Wine.FirstOrDefault(e => e.wineId == w.wineId).wineImgPath
                        }).ToList();


            List<RateDTO> rates = new List<RateDTO> { };


            for (int i = 0; i < rate.Length; i++)
            {

                double r = rate.Where(x => x.wineId == rate[i].wineId).Average(x => x.rate) ?? 0;


                for (int j = i + 1; j < rate.Length; j++)
                {
                    if (rate[i].wineId == rate[j].wineId)
                    {
                        rate[j].wineId = 0;
                    }
                }
                rate[i].rate = Convert.ToInt32(r);
                rate = rate.Where(x => x.wineId != 0).ToArray();

            }

            rate.OrderBy(x => x.rate).ToArray();
            list.OrderBy(x => x.rate).ToList();

            for (int i = 0; i < rate.Length; i++)
            {
                foreach (RateDTO item in list)
                {

                    if (item.wineId == rate[i].wineId)
                    {
                        item.rate = rate[i].rate ?? 0;
                        rates.Add(item);
                        break;
                    }
                }
            }
            return rates.OrderByDescending(x => x.rate).ToList();
        }

        public static List<RateDTO> GetUserRate(int id, ArvinoDbContext db)
        {
            try
            {
                return db.RV_Rate
                    .Include(x => x.RV_Wine)
                        .Where(x => x.RV_Wine.wineId == id)
                        .Select(w => new RateDTO()
                        {
                            rateId = w.rateId,
                            rateDate = w.rateDate,
                            ratedByUserEmail = w.ratedByUserEmail,
                            userName = db.RV_User.FirstOrDefault(e => e.email == w.ratedByUserEmail).Name,
                            UserPitcure = db.RV_User.FirstOrDefault(e => e.email == w.ratedByUserEmail).picture,
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static List<RateDTO> GetWineryInfoRates(int wineryId, ArvinoDbContext db)
        {
            try
            {
                return db.RV_Rate
                    .Include(x => x.RV_Wine)
                        .Where(x => x.RV_Wine.wineryId == wineryId)
                        .OrderByDescending(x => x.score)
                        .Select(w => new RateDTO()
                        {
                            rateId = w.rateId,
                            rateDate = w.rateDate,
                            score = w.score,
                            wineId = w.wineId,
                            ratedByUserEmail = w.ratedByUserEmail,
                            userName = db.RV_User.FirstOrDefault(e => e.email == w.ratedByUserEmail).Name,
                            UserPitcure = db.RV_User.FirstOrDefault(e => e.email == w.ratedByUserEmail).picture,
                            winePitcure = db.RV_Wine.FirstOrDefault(e => e.wineId == w.wineId).wineImgPath
                        }).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static bool IsUserAllowedToPublish(int wineId, string email, int days, ArvinoDbContext db)
        {
            try
            {
                bool isAllowed = false;
                var elements = db.RV_WineComment.Where(i => i.wineId == wineId && i.email == email);
                bool exists = elements.Count() > 0 ? true : false;
                if (!exists)
                    isAllowed = true; //ALLOWED
                else if (exists) //Check last message and make sure that it is more than X days
                {
                    RV_WineComment lastComment = db.RV_WineComment
                        .Where(i => i.email == email && i.wineId == wineId)
                            .OrderByDescending(i => i.date)
                                .ToList()
                                    .First();
                    if (DateTime.Now.Subtract(lastComment.date).TotalDays >= days)
                    {
                        isAllowed = true;
                    }
                }
                return isAllowed;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }


        public static List<RateDTO> comment(int wineryId, ArvinoDbContext db)
        {
            return db.RV_WineComment
                     .Include(x => x.RV_Wine)
                         .Where(x => x.RV_Wine.wineryId == wineryId && x.text != null | x.text != "")
                         .OrderByDescending(x => x.rate)
                         .Select(w => new RateDTO()
                         {
                             text = w.text,
                             rateId = w.id,
                             rateDate = w.date,
                             rate = w.rate ?? 0,
                             wineId = w.wineId,
                             ratedByUserEmail = w.email,
                             userName = db.RV_User.FirstOrDefault(e => e.email == w.email).Name,
                             UserPitcure = db.RV_User.FirstOrDefault(e => e.email == w.email).picture,
                             winePitcure = db.RV_Wine.FirstOrDefault(e => e.wineId == w.wineId).wineImgPath
                         }).ToList();
        }
    }
}