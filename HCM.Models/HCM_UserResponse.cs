using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_UserResponse
    {
        public HCM_UserResponse()
        {
            User = new HCM_Users();
            Questionnarie = new HCM_Questionnaire();
        }
        public int UserResponseID { get; set; }
        public HCM_Users User { get; set; }
        public HCM_Questionnaire Questionnarie { get; set; }
        public string Response { get; set; }
        public string Comments { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }
    }
}
