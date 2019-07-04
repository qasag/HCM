using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_WorkStream
    {
        public HCM_WorkStream()
        {
            Module = new HCM_Module();
            Product = new HCM_Product();

        }

        public int WorkStreamID { get; set; }
        public HCM_Product Product { get; set; }
        public HCM_Module Module { get; set; }
        public string WorkStreamName { get; set; }
        public string WorkStreamDescription { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
