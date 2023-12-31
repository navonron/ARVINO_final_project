﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DATA.EF;
using webAPI.DTO;
using System.Data.Entity;

namespace webAPI.Models
{
    public class WineryModel
    {
        public static List<WineryDTO> GetWinery(ArvinoDbContext db)
        {
            return db.RV_Winery.Include(x => x.RV_AreaCategory)
                               .Select(e => new WineryDTO()
                               {
                                   wineryId = e.wineryId,
                                   wineryName = e.wineryName,
                                   wineryAddress = e.wineryAddress,
                                   wineryEmail = e.wineryEmail,
                                   phone = e.phone,
                                   wineryImage = e.IconImgPath,
                                   wineryAreaName = e.RV_AreaCategory.areaName,
                                   areaId = e.areaId,
                                   likes = db.RV_LikesUsers
                                            .Where(i => i.entityType == 3 && i.entityId == e.wineryId)
                                              .Select(dt => new LikesDTO()
                                              {
                                                  likeId = dt.ID,
                                                  userName = db.RV_User.FirstOrDefault(w => w.email == dt.email).Name,
                                                  userImage = db.RV_User.FirstOrDefault(w => w.email == dt.email).picture

                                              }).ToList(),
                                   wineList = db.RV_Wine
                                                .Where(i => i.wineryId == e.wineryId)
                                                .Select(w => new WineDTO()
                                                {
                                                    wineId = w.wineId,
                                                    wineName = w.wineName,
                                                    wineImgPath = w.wineImgPath,
                                                    content = w.content,
                                                    price = w.price,
                                                    wineLabelPath = w.wineLabelPath,
                                                    categoryId = w.categoryId ?? 0,
                                                    wineryName = e.wineryName,
                                                    wineryImage = e.IconImgPath,
                                                    rate = db.RV_WineComment
                                                        .Where(i => i.wineId == w.wineId)
                                                                .Select(i => i.rate)
                                                                    .Average()

                                                }).ToList(),
                                   serviceList = db.RV_Service
                                   .Where(i => i.wineryId == e.wineryId)
                                                .Select(s => new ServiceDTO()
                                                {
                                                    serviceId = s.serviceId,
                                                    serviceName = s.serviceName,
                                                    serviceCategory = s.serviceCategory,
                                                    content = s.content,
                                                    price = s.price,
                                                    wineryName = e.wineryName,
                                                    wineryImg = e.IconImgPath,
                                                    images = db.RV_ServiceImage
                                                         .Where(i => i.serviceId == s.serviceId)
                                                                    .Select(dt => new ServiceImageDTO()
                                                                    {
                                                                        imgId = dt.imgId,
                                                                        ImgPath = dt.ImgPath

                                                                    }).ToList()
                                                }).ToList(),
                                   eventList = db.RV_Event
                                                    .Where(i => i.wineryId == e.wineryId)
                                                        .Select(dt => new EventDTO()
                                                        {
                                                            eventId = dt.eventId,
                                                            eventName = dt.eventName,
                                                            content = dt.content,
                                                            price = dt.price,
                                                            participantsAmount = dt.participantsAmount,
                                                            eventDate = dt.eventDate,
                                                            startTime = dt.startTime,
                                                            eventImgPath = dt.eventImgPath,
                                                            categoryId = dt.categoryId ?? 0,
                                                            wineryId = dt.wineryId ?? 0,
                                                            ticketsPurchased = dt.ticketsPurchased ?? 0,

                                                        }).ToList()

                               }).ToList();
        }

        public static List<WineryDTO> GetWineryByArea(ArvinoDbContext db, int areaId)
        {
            return GetWinery(db).Where(i => i.areaId == areaId).ToList();
        }

        public static RV_Winery GetWineryByUser(ArvinoDbContext db, string wineryManagerEmail)
        {
            return db.RV_Winery.SingleOrDefault(e => e.wineryManagerEmail == wineryManagerEmail);
        }

        public static WineryDTO GetWineryUser(string email, ArvinoDbContext db)
        {
            return db.RV_Winery.Where(x => email == x.wineryManagerEmail).Select(x => new WineryDTO()
            {
                wineryId = x.wineryId,
                wineryName = x.wineryName,
                wineryEmail = x.wineryEmail,
                wineryAddress = x.wineryAddress,
                areaId = x.areaId ?? 0,
                phone = x.phone,
                statusType = x.statusType,
                wineryImage = x.IconImgPath,
                email = db.RV_User.FirstOrDefault(u => u.email == email).email,
                wineryAreaName = db.RV_AreaCategory.FirstOrDefault(u => u.areaId == x.areaId).areaName,
                Name = db.RV_User.FirstOrDefault(u => u.email == email).Name,
                password = db.RV_User.FirstOrDefault(u => u.email == email).password,
            }).Single();

        }
    }


}