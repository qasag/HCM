using HCM.Models;
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
    public class ModifyExternalRate
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_ExternalRate> GetExternalRates()
        {
            List<HCM_ExternalRate> list_Extrnl_Obj = new List<HCM_ExternalRate>();
            HCM_ExternalRate Extrnl_Obj = new HCM_ExternalRate();
            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetExternalRates", sqlcon_obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                Extrnl_Obj = new HCM_ExternalRate();
                                Extrnl_Obj.ExternalRateID = Convert.ToInt32(dt.Rows[i]["ExternalRateID"]);
                                Extrnl_Obj.ExternalName = Convert.ToString(dt.Rows[i]["ExternalName"]);
                                Extrnl_Obj.ExternalRate = dt.Rows[i]["ExternalRate"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["ExternalRate"]); ;
                                list_Extrnl_Obj.Add(Extrnl_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list_Extrnl_Obj;

        }

        public string UpdateExternalRate(string ExtrnlRteID, string ExtrnlName, string ExtrnlPercent)
        {
            string Extrnl_Obj = "";
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = con.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_UpdateExternalRate", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ExternalRateID", Convert.ToInt32(ExtrnlRteID));
                        sqlcmd_Obj.Parameters.AddWithValue("@ExternalName", Convert.ToString(ExtrnlName));
                        sqlcmd_Obj.Parameters.AddWithValue("@ExternalRate", Convert.ToDecimal(ExtrnlPercent));
                        sqlcmd_Obj.Parameters.AddWithValue("@UpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sql_Obj.Close();

                        if (result > 0)
                        {
                            Extrnl_Obj = "Success";
                        }
                        else
                        {
                            Extrnl_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Extrnl_Obj;
        }
        
    }
}
