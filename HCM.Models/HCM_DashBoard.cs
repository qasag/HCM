using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_DashBoard
    {
        public int ModuleID { get; set; }
        public string ModuleName { get; set; }
        public string Business { get; set; }
        public string Technology { get; set; }
        public string RiskFactor { get; set; }
        public string RiskFactorColor { get; set; }
    }
}
