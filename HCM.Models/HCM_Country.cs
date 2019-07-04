using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
  public  class HCM_Country
    {
      public HCM_Country()
      {
          Region = new HCM_Region();
      }

        public int? CountryID { get; set; }
        public HCM_Region Region { get; set; }
        public string CountryName { get; set; }
        public string CountryDescription { get; set; }
        public bool Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
