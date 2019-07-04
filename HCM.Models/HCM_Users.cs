using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_Users
    {
        public HCM_Users()
        {
            Client = new HCM_Client();
            Region = new HCM_Region();
            Location = new HCM_Location();
            Country = new HCM_Country();
            Product = new HCM_Product();
            
        }

        public int UserID { get; set; }
        public HCM_Client Client { get; set; }
        public string UserType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

        public HCM_Region Region { get; set; }
        public HCM_Location Location { get; set; }
        public HCM_Country Country { get; set; }
        public HCM_Product Product { get; set; }

    }
}
