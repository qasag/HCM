using HCM.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HCM.DAL
{
    public class ModifyDashBoardData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public List<HCM_DashBoard> GetDashBoardData(string VersionID)
        {
            List<HCM_DashBoard> dashBrd_list = new List<HCM_DashBoard>();
            HCM_DashBoard dashBrd_Obj = new HCM_DashBoard();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetDashBoardData", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        cmd.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        cmd.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                dashBrd_Obj = new HCM_DashBoard();
                                dashBrd_Obj.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                dashBrd_Obj.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                dashBrd_Obj.Business = Convert.ToString(dt.Rows[i]["Business"]);
                                dashBrd_Obj.Technology = Convert.ToString(dt.Rows[i]["Technology"]);
                                dashBrd_list.Add(dashBrd_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dashBrd_list;
        }

        public List<HCM_DashBoard> GetOverallRiskScoreData(string VersionID)
        {
            List<HCM_DashBoard> Overallrisk_list = new List<HCM_DashBoard>();
            HCM_DashBoard Overallrisk_Obj = new HCM_DashBoard();
            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetOverallRiskScoreData", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        cmd.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        cmd.Parameters.AddWithValue("@ProductID",Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                Overallrisk_Obj = new HCM_DashBoard();
                                Overallrisk_Obj.RiskFactor = Convert.ToString(dt.Rows[i]["RiskFactor"]);
                                Overallrisk_Obj.Business = Convert.ToString(dt.Rows[i]["Business"]);
                                Overallrisk_Obj.Technology = Convert.ToString(dt.Rows[i]["Technology"]);
                                Overallrisk_Obj.RiskFactorColor = Convert.ToString(dt.Rows[i]["Color"]);
                                Overallrisk_list.Add(Overallrisk_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Overallrisk_list;
        }

        public DataTable GetOverallRiskScoreInnerData(string UserType, string RiskFactor, string VersionID)
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetOverallRiskScoreInnerData", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@RiskFactor", Convert.ToString(RiskFactor));
                        cmd.Parameters.AddWithValue("@UserType", Convert.ToString(UserType));
                        cmd.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        cmd.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(dt);
                        sql_obj.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetRiskFactorExcelFile(string UserType, string RiskFactor,string VersionID)
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = sql.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetRiskFactorExcelData", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@RiskFactor", Convert.ToString(RiskFactor));
                        sqlcmd_Obj.Parameters.AddWithValue("@UserType", Convert.ToString(UserType));
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

        public DataTable GetDashBoardInnerData(string ModuleId, string UserType, string VersionID)
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetDashBoardInnerData", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;

                        if (ModuleId == "null" || ModuleId == "undefined" || ModuleId == null)
                        {
                            cmd.Parameters.AddWithValue("@ModuleID", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@ModuleID", Convert.ToInt32(ModuleId));
                        }
                        cmd.Parameters.AddWithValue("@UserType", Convert.ToString(UserType));
                        cmd.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        cmd.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        cmd.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(dt);
                        sql_obj.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return dt;
        }

        public DataTable GetRiskFactorGuageData(string VersionID)
        {
            DataTable dt = new DataTable();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetRiskFactorGuageData", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        cmd.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        cmd.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        da.Fill(dt);
                        sql_obj.Close();
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
