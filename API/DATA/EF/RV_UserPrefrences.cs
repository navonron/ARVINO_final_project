//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DATA.EF
{
    using System;
    using System.Collections.Generic;
    
    public partial class RV_UserPrefrences
    {
        public int Id { get; set; }
        public string email { get; set; }
        public int PrefrenceID { get; set; }
        public string FreeText { get; set; }
        public Nullable<System.DateTime> registerAt { get; set; }
    
        public virtual RV_PrefrencesType RV_PrefrencesType { get; set; }
        public virtual RV_User RV_User { get; set; }
    }
}