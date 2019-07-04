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
    public class ModifyFinancialConfigData
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_FinancialConfiguration> GetFinancialCOnfigurations()
        {
            List<HCM_FinancialConfiguration> list_FincalConfig_Obj = new List<HCM_FinancialConfiguration>();
            HCM_FinancialConfiguration FincalConfig_Obj = new HCM_FinancialConfiguration();
            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetFinancialConfig", sqlcon_obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@VersionID", Convert.ToInt32(HttpContext.Current.Session["VersionID"]));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                FincalConfig_Obj = new HCM_FinancialConfiguration();

                                FincalConfig_Obj.FinancialConfigurationID = Convert.ToInt32(dt.Rows[i]["FinancialConfigurationID"]);
                                FincalConfig_Obj.Product.ProductID = Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                FincalConfig_Obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                FincalConfig_Obj.Module.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                FincalConfig_Obj.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);

                                FincalConfig_Obj.WorkStream.WorkStreamID = dt.Rows[i]["WorkStreamID"] == DBNull.Value ? 0 : Convert.ToInt32(dt.Rows[i]["WorkStreamID"]);
                                FincalConfig_Obj.WorkStream.WorkStreamName = Convert.ToString(dt.Rows[i]["WorkStreamName"]);

                                FincalConfig_Obj.Area.AreaID = Convert.ToInt32(dt.Rows[i]["AreaID"]);
                                FincalConfig_Obj.Area.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);

                                FincalConfig_Obj.Questions = Convert.ToInt32(dt.Rows[i]["Questions"]);

                                FincalConfig_Obj.BusinessAnalyst = dt.Rows[i]["BusinessAnalyst"] == DBNull.Value ? (decimal?)null  : Convert.ToDecimal(dt.Rows[i]["BusinessAnalyst"]);
                                FincalConfig_Obj.Configuration = dt.Rows[i]["Configuration"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["Configuration"]);
                                FincalConfig_Obj.Testing = dt.Rows[i]["Testing"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["Testing"]);
                                FincalConfig_Obj.Training = dt.Rows[i]["Training"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(dt.Rows[i]["Training"]);

                                list_FincalConfig_Obj.Add(FincalConfig_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list_FincalConfig_Obj;

        }

        public string InsertFinancialConfig(NameValueCollection FincalConfig_Collection)
        {
            string FincalConfig_Obj = "";
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = con.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_InsertFinancialConfiguration", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;

                        if (FincalConfig_Collection["FinancialConfigurationID"] == null || FincalConfig_Collection["FinancialConfigurationID"] == "undefined" || FincalConfig_Collection["FinancialConfigurationID"] == "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@FinancialConfigurationID", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@FinancialConfigurationID", FincalConfig_Collection["FinancialConfigurationID"]);
                        }
                        sqlcmd_Obj.Parameters.AddWithValue("@ProductID", Convert.ToInt32(FincalConfig_Collection["ProductID"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@ModuleID", Convert.ToInt32(FincalConfig_Collection["ModuleID"]));


                        if (FincalConfig_Collection["WorkStreamID"] == "" || FincalConfig_Collection["WorkStreamID"] == null || FincalConfig_Collection["WorkStreamID"] == "0")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@WorkStreamID", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@WorkStreamID", Convert.ToInt32(FincalConfig_Collection["WorkStreamID"]));
                        }


                        sqlcmd_Obj.Parameters.AddWithValue("@AreaID", Convert.ToInt32(FincalConfig_Collection["AreaID"]));


                        if (FincalConfig_Collection["BusinessAnalyst"] == null || FincalConfig_Collection["BusinessAnalyst"] == "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@BussinessAnalyst", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@BussinessAnalyst", Convert.ToDecimal(FincalConfig_Collection["BusinessAnalyst"]));
                        }

                        if (FincalConfig_Collection["Configuration"] == null || FincalConfig_Collection["Configuration"] == "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@Configuration", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@Configuration", Convert.ToDecimal(FincalConfig_Collection["Configuration"]));
                        }

                        if (FincalConfig_Collection["Testing"] == null || FincalConfig_Collection["Testing"] == "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@Testing", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@Testing", Convert.ToDecimal(FincalConfig_Collection["Testing"]));
                        }

                        if (FincalConfig_Collection["Training"] == null || FincalConfig_Collection["Training"] == "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@Training", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@Training", Convert.ToDecimal(FincalConfig_Collection["Training"]));
                        }

                        sqlcmd_Obj.Parameters.AddWithValue("@CreatedBy", HttpContext.Current.Session["UserID"]);

                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sql_Obj.Close();

                        if (result > 0)
                        {
                            FincalConfig_Obj = "Success";
                        }
                        else
                        {
                            FincalConfig_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
            return FincalConfig_Obj;

        }

    }
}
