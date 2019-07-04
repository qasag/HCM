using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_Location
    {
        public HCM_Location()
        {
            Country = new HCM_Country();
        }

        public int? LocationID { get; set; }
        public HCM_Country Country { get; set; }
        public string LocationName { get; set; }
        public string LocationDescription { get; set; }
        public bool Status { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
