using DATA.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webAPI.Models
{
    public class GroupModel
    {
        public static List<RV_Group> GetAllGroups(ArvinoDbContext db)
        {
            return db.RV_Group.ToList();
            //Test ron
        }

        public static List<RV_Group> GetFriendsGroup(string email)
        {
            try
            {
                using (var db = new ArvinoDbContext())
                {
                    var groupsGroupBy = db.RV_GroupMessages
                                            .Where(n=>n.userEmail == email)
                                             .GroupBy(n => n.GroupID)
                                                        .Select(n => new
                                                            {
                                                                groupID = n.Key,
                                                                groupCount = n.Count()
                                                            }
                                                        )
                                                        .OrderByDescending(n => n.groupCount);
                    List<RV_Group> groupList = new List<RV_Group>();

                    if (groupsGroupBy != null)
                    {
                        foreach (var item in groupsGroupBy)
                        {
                            groupList.Add(db.RV_Group.SingleOrDefault(i => i.groupId == item.groupID));
                        }
                    }

                    return groupList;
                }
            }
            catch
            {
                return null;
            }
        }
    }
}