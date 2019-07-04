using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    
    public class HCM_Module
    {

        public HCM_Module()
        {
            Product = new HCM_Product();
        }
        public int? ModuleID { get; set; }
        public HCM_Product Product { get; set; }
        public string ModuleName { get; set; }
        public string ModuleDescription { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public bool Show { get; set; }
    }
}
