using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_ProjectSummary
    {
        public int ProjectSummaryID { get; set; }
        public string ProjectSummaryName { get; set; }
        public decimal ProjectInitiation { get; set; }
        public decimal RequirementGathering { get; set; }
        public decimal Development { get; set; }
        public decimal Testing { get; set; }
        public decimal Training { get; set; }
        public decimal RollOut { get; set; }
        public decimal CreatedOn { get; set; }
        public decimal CreatedBy { get; set; }
        public decimal UpdatedOn { get; set; }
        public decimal UpdatedBy { get; set; }

        public decimal? Total { get; set; }
    }
}
