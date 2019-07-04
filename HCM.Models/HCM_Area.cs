using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_Area
    {
        public HCM_Area()
        {
            Module = new HCM_Module();
            Product = new HCM_Product();
        }
        public int AreaID { get; set; }
        public HCM_Product Product { get; set; }
        public HCM_Module Module { get; set; }
        public string AreaName { get; set; }
        public string AreaDescription { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
