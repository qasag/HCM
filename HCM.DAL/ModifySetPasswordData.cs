using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.DAL
{
    
   public class ModifySetPasswordData
    {
        GetSqlConnection con = new GetSqlConnection();

        public string UpdateUserSetPassword(string EmailID,string Password)
        {
            string setPswd_result = "";

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = con.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_UpdateUserSetPassword", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@Email", Convert.ToString(EmailID));
                        cmd.Parameters.AddWithValue("@Password", Convert.ToString(Password));
                        int result = cmd.ExecuteNonQuery();
                        sql_obj.Close();

                        if (result > 0)
                        {
                            setPswd_result = "Success";
                        }
                        else
                        {
                            setPswd_result = "Failed";
                        }
                        return setPswd_result;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
