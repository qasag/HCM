using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.DAL
{
    public class GetSqlConnection
    {
        public string GetConnection()
        {
            string str = ConfigurationManager.ConnectionStrings["HCM_ConString"].ConnectionString;
            return str;
        }
    }
}
