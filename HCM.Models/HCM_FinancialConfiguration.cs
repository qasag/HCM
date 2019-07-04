using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_FinancialConfiguration
    {
        public HCM_FinancialConfiguration()
        {
            Module = new HCM_Module();
            WorkStream = new HCM_WorkStream();
            Area = new HCM_Area();
            Product = new HCM_Product();

        }

        public int FinancialConfigurationID { get; set; }
        public HCM_Product Product { get; set; }
        public HCM_Module Module { get; set; }
        public HCM_WorkStream WorkStream { get; set; }
        public HCM_Area Area { get; set; }
        public decimal? BusinessAnalyst { get; set; }
        public decimal? Configuration { get; set; }
        public decimal? Testing { get; set; }
        public decimal? Training { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

        public int Questions { get; set; }
        public decimal ProjectManagement { get; set; }
        public decimal ChangeManagement { get; set; }
        public decimal TotalHours { get; set; }
        public decimal TotalSolution { get; set; }
    }
}
