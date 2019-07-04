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
    public class ModifyLegendData
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_Legend> GetLegends()
        {
            List<HCM_Legend> list_legend_Obj = new List<HCM_Legend>();
            HCM_Legend legend_Obj = new HCM_Legend();
            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetLegends", sqlcon_obj))
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
                                legend_Obj = new HCM_Legend();
                                legend_Obj.LegendID = Convert.ToInt32(dt.Rows[i]["LegendID"]);
                                legend_Obj.LegendName = Convert.ToString(dt.Rows[i]["LegendName"]);
                                legend_Obj.LegendPercent = dt.Rows[i]["LegendPercent"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["LegendPercent"]); ;
                                list_legend_Obj.Add(legend_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list_legend_Obj;

        }

        public string UpdateLegend(string LegendID, string LegendName, string LegendPercent)
        {
            string legend_Obj = "";
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = con.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_UpdateLegend", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@LegendID", Convert.ToInt32(LegendID));
                        sqlcmd_Obj.Parameters.AddWithValue("@LegendName", Convert.ToString(LegendName));
                        sqlcmd_Obj.Parameters.AddWithValue("@LegendPercent", Convert.ToDecimal(LegendPercent));
                        sqlcmd_Obj.Parameters.AddWithValue("@UpdatedBy", HttpContext.Current.Session["UserID"]);
                        
                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sql_Obj.Close();
                      
                        if (result > 0)
                        {
                            legend_Obj = "Success";
                        }
                        else
                        {
                            legend_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return legend_Obj;
        }

    }
}
