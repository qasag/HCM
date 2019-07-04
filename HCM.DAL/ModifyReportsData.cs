using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HCM.DAL
{
    public class ModifyReportsData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public DataTable GetSurveyResultInExcelFile(string ModuleID, string ResponseType,string VersionID)
        {
            DataTable dt = new DataTable();           
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = sql.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetSurveyResultsExcelData", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;

                        if (ModuleID == "null" || ModuleID == "undefined" || ModuleID == null)
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@ModuleID", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@ModuleID", Convert.ToInt32(ModuleID));
                        }

                        sqlcmd_Obj.Parameters.AddWithValue("@UserType", Convert.ToString(ResponseType));
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        da.Fill(dt);
                        sql_Obj.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }
    }
}
