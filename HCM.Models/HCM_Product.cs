using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
   public class HCM_Product
    {
        public int? ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
        public int CreatedAndUpdatedBy { get; set; }
    }
}
