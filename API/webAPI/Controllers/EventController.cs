﻿using System;
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

namespace webAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EventController : ApiController
    {
        public static ArvinoDbContext db = new ArvinoDbContext();

        /// <summary>
        /// https://localhost:44370/api/Event/GetWineryEvents?id=1
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Event/GetWineryEvents")]
        public IHttpActionResult GetWineryEvents(int id)
        {
            try
            {
                return Ok(EventModel.GetEventsByWinery(id, db));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        /// <summary>
        /// https://localhost:44370/api/Event/GetAllEvents
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Event/GetAllEvents")]
        public IHttpActionResult GetAllEvents()
        {
            try
            {
                return Ok(EventModel.GetEvents(db));
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        /// <summary>
        /// https://localhost:44370/api/Event/DeleteEvent?id=1
        /// </summary>
        /// <returns></returns>
        [HttpDelete]
        [Route("api/Event/DeleteEvent")]
        public IHttpActionResult DeleteEvent(int id)
        {
            try
            {
                RV_Event eventD = db.RV_Event.SingleOrDefault(e => e.eventId == id);
                if (eventD != null)
                {
                    db.RV_Event.Remove(eventD);
                    db.SaveChanges();
                    return Ok();
                }
                return Content(HttpStatusCode.NotFound,
                    $"event with id {id} was not found to delete!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// https://localhost:44370/api/Event/GetEventByDate?id=1&type=1
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Event/GetEventByDate")]
        public IHttpActionResult GetEventByDate(int id, int type)
        {
            try
            {
                List<EventDTO> e = EventModel.GetEventByDate(id, type, db);
                if (e == null)
                {
                    return null;
                }
                return Ok(e);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        /// <summary>
        /// https://localhost:44370/api/Event/PutEvent?id=1
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("api/Event/PutEvent")]
        public IHttpActionResult PutEvent(int id, [FromBody] RV_Event value)
        {
            try
            {
                RV_Event e = db.RV_Event.SingleOrDefault(x => x.eventId == id);
                if (e != null)
                {
                    e.eventName = value.eventName;
                    e.content = value.content;
                    e.price = value.price;
                    e.participantsAmount = value.participantsAmount;
                    e.eventDate = value.eventDate;
                    e.startTime = value.startTime;
                    e.eventImgPath = value.eventImgPath;
                    e.categoryId = value.categoryId;
                    e.wineryId = value.wineryId;
                    db.SaveChanges();
                    return Ok(e);
                }
                return Content(HttpStatusCode.NotFound,
                    $"לא נמצא {id} אירוע עם מזהה");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// https://localhost:44370/api/Event/PostEvent
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/Event/PostEvent")]
        public IHttpActionResult PostEvent([FromBody] RV_Event value)
        {
            try
            {
                RV_Event newEvent = new RV_Event()
                {
                    eventName = value.eventName,
                    content = value.content,
                    price = value.price,
                    participantsAmount = value.participantsAmount,
                    eventDate = value.eventDate,
                    startTime = value.startTime,
                    eventImgPath = value.eventImgPath,
                    categoryId = value.categoryId,
                    wineryId = value.wineryId
                };
                db.RV_Event.Add(newEvent);
                db.SaveChanges();
                return Ok();
            }
            catch (DbEntityValidationException ex)
            {
                string errors = "";
                foreach (DbEntityValidationResult vr in ex.EntityValidationErrors)
                {
                    foreach (DbValidationError er in vr.ValidationErrors)
                    {
                        errors += $"PropertyName - {er.PropertyName }, Error {er.ErrorMessage} <br/>";
                    }
                }
                return Content(HttpStatusCode.BadRequest, errors);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        /// <summary>
        /// https://localhost:44370/api/Event/RegisterEvent
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/Event/RegisterEvent")]
        public IHttpActionResult RegisterEvent([FromBody] RV_PurchasedEventsByUsers value)
        {
            try
            {
                RV_Event singleEvent = db.RV_Event.SingleOrDefault(i => i.eventId == value.eventId);
                if (singleEvent != null)
                {
                    if (singleEvent.participantsAmount > value.ticketsPurchased)
                    {
                        RV_PurchasedEventsByUsers rv = new RV_PurchasedEventsByUsers()
                        {
                            ticketsPurchased = value.ticketsPurchased,
                            purchaseDateTime = DateTime.Now,
                            phoneNumber = value.phoneNumber,
                            email = value.email,
                            eventId = value.eventId
                        };

                        db.RV_PurchasedEventsByUsers.Add(rv);
                        singleEvent.ticketsPurchased += value.ticketsPurchased;
                        db.SaveChanges();

                        return Ok();
                    }
                    else {
                        return Content(HttpStatusCode.BadRequest, $"No tickets left-only left {singleEvent.participantsAmount}");
                    }
                }
                else
                    return Content(HttpStatusCode.BadRequest, "Can't find event");

            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}