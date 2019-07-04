using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_UserModuleMapper
    {
        public HCM_UserModuleMapper()
        {
            User = new HCM_Users();
            Module = new HCM_Module();
            Product = new HCM_Product();

        }

        public int UserModuleMapperID { get; set; }
        public HCM_Users User { get; set; }
        public HCM_Module Module { get; set; }
        public HCM_Product Product { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

        public string AssignedModules { get; set; }
    }
}
