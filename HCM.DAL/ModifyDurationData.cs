using HCM.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HCM.DAL
{
    public class ModifyDurationData
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_ProjectSummary> GetDurations()
        {
            List<HCM_ProjectSummary> list_PrjctSumry_Obj = new List<HCM_ProjectSummary>();
            HCM_ProjectSummary PrjctSumry_Obj = new HCM_ProjectSummary();

            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetProjectSummary", sqlcon_obj))
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
                                PrjctSumry_Obj = new HCM_ProjectSummary();
                                PrjctSumry_Obj.ProjectSummaryID = Convert.ToInt32(dt.Rows[i]["ProjectSummaryID"]);
                                PrjctSumry_Obj.ProjectSummaryName = Convert.ToString(dt.Rows[i]["ProjectSummaryName"]);
                                PrjctSumry_Obj.ProjectInitiation = dt.Rows[i]["ProjectInitiation"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["ProjectInitiation"]);
                                PrjctSumry_Obj.RequirementGathering = dt.Rows[i]["RequirementGathering"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["RequirementGathering"]);
                                PrjctSumry_Obj.Development = dt.Rows[i]["Development"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Development"]);
                                PrjctSumry_Obj.Testing = dt.Rows[i]["Testing"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Testing"]);
                                PrjctSumry_Obj.Training = dt.Rows[i]["Training"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Training"]);
                                PrjctSumry_Obj.RollOut = dt.Rows[i]["RollOut"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["RollOut"]);
                                list_PrjctSumry_Obj.Add(PrjctSumry_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list_PrjctSumry_Obj;
        }

        public string UpdateDuration(NameValueCollection duration_CollectionData)
        {
            string duration_Obj = "";
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = con.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_UpdateProjectSummary", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ProjectSummaryID", Convert.ToInt32(duration_CollectionData["ProjectSummaryID"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@ProjectSummaryName", Convert.ToString(duration_CollectionData["ProjectSummaryName"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@ProjectInitiation", Convert.ToDecimal(duration_CollectionData["ProjectInitiation"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@RequirementGathering", Convert.ToDecimal(duration_CollectionData["RequirementGathering"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@Development", Convert.ToDecimal(duration_CollectionData["Development"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@Testing", Convert.ToDecimal(duration_CollectionData["Testing"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@Training", Convert.ToDecimal(duration_CollectionData["Training"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@RollOut", Convert.ToDecimal(duration_CollectionData["RollOut"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@UpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sql_Obj.Close();

                        if (result > 0)
                        {
                            duration_Obj = "Success";
                        }
                        else
                        {
                            duration_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return duration_Obj;
        }
    }
}
