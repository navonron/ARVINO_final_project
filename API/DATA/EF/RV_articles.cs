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
    
    public partial class RV_articles
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public RV_articles()
        {
            this.RV_ArticelPictures = new HashSet<RV_ArticelPictures>();
        }
    
        public int ID { get; set; }
        public int wineryId { get; set; }
        public string article { get; set; }
        public string header { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RV_ArticelPictures> RV_ArticelPictures { get; set; }
        public virtual RV_Winery RV_Winery { get; set; }
    }
}