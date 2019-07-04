using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_Versions
    {
        public HCM_Versions()
        {
            Client = new HCM_Client();
        }

        public int VersionID { get; set; }
        public HCM_Client Client { get; set; }
        public int FromVersionID { get; set; }
        public string VersionName { get; set; }
        public string VersionDescription { get; set; }
        public bool IsDefault { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

        public string FromVersionName { get; set; }
       
    }
}
