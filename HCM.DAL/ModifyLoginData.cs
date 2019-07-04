using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HCM.Models;
using System.Collections.Specialized;

namespace HCM.DAL
{
    public class ModifyLoginData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public HCM_Users LoginUser(NameValueCollection Login_User_Collection_Obj)
        {
            HCM_Users login_user_Obj = new HCM_Users();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_LoginUser", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@Email", Convert.ToString(Login_User_Collection_Obj["Email"]).Trim());
                        cmd.Parameters.AddWithValue("@Password", Convert.ToString(Login_User_Collection_Obj["Password"]).Trim());
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            login_user_Obj.UserID = Convert.ToInt32(dt.Rows[0]["UserID"]);
                            login_user_Obj.Client.ClientID = dt.Rows[0]["ClientID"] == DBNull.Value ? (int?)null : Convert.ToInt32(dt.Rows[0]["ClientID"]);
                            login_user_Obj.UserType = Convert.ToString(dt.Rows[0]["UserType"]);
                            login_user_Obj.Email = Convert.ToString(dt.Rows[0]["Email"]);
                            login_user_Obj.FirstName = Convert.ToString(dt.Rows[0]["FirstName"]);
                            login_user_Obj.LastName = Convert.ToString(dt.Rows[0]["LastName"]);
                        }
                        return login_user_Obj;
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
