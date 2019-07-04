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
    public class ModifyFinancialDashBoardData
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_FinancialConfiguration> GetDashBoardFinancialProjectHours()
        {
            List<HCM_FinancialConfiguration> list_FincalDashBrd_Obj = new List<HCM_FinancialConfiguration>();
            HCM_FinancialConfiguration FincalDashBrd_Obj = new HCM_FinancialConfiguration();
            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetDashBoardFinancialProjectHours", sqlcon_obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                FincalDashBrd_Obj = new HCM_FinancialConfiguration();
                                FincalDashBrd_Obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                FincalDashBrd_Obj.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                FincalDashBrd_Obj.WorkStream.WorkStreamName = Convert.ToString(dt.Rows[i]["WorkStreamName"]);
                                FincalDashBrd_Obj.Area.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);

                                FincalDashBrd_Obj.ProjectManagement = dt.Rows[i]["ProjectManagement"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["ProjectManagement"]);
                                FincalDashBrd_Obj.ChangeManagement = dt.Rows[i]["ChangeManagement"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["ChangeManagement"]);

                                FincalDashBrd_Obj.BusinessAnalyst = dt.Rows[i]["BusinessAnalyst"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["BusinessAnalyst"]);
                                FincalDashBrd_Obj.Configuration = dt.Rows[i]["Configuration"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Configuration"]);
                                FincalDashBrd_Obj.Testing = dt.Rows[i]["Testing"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Testing"]);
                                FincalDashBrd_Obj.Training = dt.Rows[i]["Training"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Training"]);

                                FincalDashBrd_Obj.TotalHours = dt.Rows[i]["TotalHours"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["TotalHours"]);

                                list_FincalDashBrd_Obj.Add(FincalDashBrd_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list_FincalDashBrd_Obj;

        }

        public List<HCM_FinancialConfiguration> GetDashBoardFinancialProjectCost()
        {
            List<HCM_FinancialConfiguration> list_Fincal_PrjctCst_Obj = new List<HCM_FinancialConfiguration>();
            HCM_FinancialConfiguration Fincal_PrjctCst_Obj = new HCM_FinancialConfiguration();
            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetDashBoardFinancialProjectCost", sqlcon_obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                Fincal_PrjctCst_Obj = new HCM_FinancialConfiguration();
                                Fincal_PrjctCst_Obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                Fincal_PrjctCst_Obj.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                Fincal_PrjctCst_Obj.WorkStream.WorkStreamName = Convert.ToString(dt.Rows[i]["WorkStreamName"]);
                                Fincal_PrjctCst_Obj.Area.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);

                                Fincal_PrjctCst_Obj.ProjectManagement = dt.Rows[i]["ProjectManagement"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["ProjectManagement"]);
                                Fincal_PrjctCst_Obj.ChangeManagement = dt.Rows[i]["ChangeManagement"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["ChangeManagement"]);

                                Fincal_PrjctCst_Obj.BusinessAnalyst = dt.Rows[i]["BusinessAnalyst"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["BusinessAnalyst"]);
                                Fincal_PrjctCst_Obj.Configuration = dt.Rows[i]["Configuration"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Configuration"]);
                                Fincal_PrjctCst_Obj.Testing = dt.Rows[i]["Testing"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Testing"]);
                                Fincal_PrjctCst_Obj.Training = dt.Rows[i]["Training"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Training"]);

                                Fincal_PrjctCst_Obj.TotalSolution = dt.Rows[i]["TotalSolution"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["TotalSolution"]);
                                list_Fincal_PrjctCst_Obj.Add(Fincal_PrjctCst_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list_Fincal_PrjctCst_Obj;

        }

        public List<HCM_ProjectSummary> GetProjectSummaryData()
        {
            List<HCM_ProjectSummary> list_PrjectSumry_Obj = new List<HCM_ProjectSummary>();
            HCM_ProjectSummary PrjectSumry_Obj = new HCM_ProjectSummary();
            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_GetProjectSummaryData", sqlcon_obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                PrjectSumry_Obj = new HCM_ProjectSummary();
                                PrjectSumry_Obj.ProjectSummaryName = Convert.ToString(dt.Rows[i]["ProjectSummaryName"]);

                                PrjectSumry_Obj.ProjectInitiation = dt.Rows[i]["ProjectInitiation"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["ProjectInitiation"]);
                                PrjectSumry_Obj.RequirementGathering = dt.Rows[i]["RequirementGathering"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["RequirementGathering"]);
                                PrjectSumry_Obj.Development = dt.Rows[i]["Development"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Development"]);

                                PrjectSumry_Obj.Testing = dt.Rows[i]["Testing"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Testing"]);
                                PrjectSumry_Obj.Training = dt.Rows[i]["Training"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["Training"]);
                                PrjectSumry_Obj.RollOut = dt.Rows[i]["RollOut"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["RollOut"]);

                                PrjectSumry_Obj.Total = dt.Rows[i]["Total"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["Total"]);
                              
                                list_PrjectSumry_Obj.Add(PrjectSumry_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return list_PrjectSumry_Obj;
        }

    }
}
