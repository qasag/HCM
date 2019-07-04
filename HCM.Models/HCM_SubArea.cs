using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_SubArea
    {

        public HCM_SubArea()
        {
            Area = new HCM_Area();
            Product = new HCM_Product();
        }

        public int? SubAreaID { get; set; }
        public HCM_Product Product { get; set; }
        public HCM_Area Area { get; set; }
        public string SubAreaName { get; set; }
        public string SubAreaDescription { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
