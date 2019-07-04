using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web;
using HCM.Models;
using System.Collections.Specialized;

namespace HCM.DAL
{
    public class ModifyWorkStreamData
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_WorkStream> GetAllWorkStreams()
        {
            List<HCM_WorkStream> hcmWorkStream_List = new List<HCM_WorkStream>();
            HCM_WorkStream hcm_WorkStream_Obj = new HCM_WorkStream();

            try
            {
                using (SqlConnection sqlCon_Obj = new SqlConnection())
                {
                    sqlCon_Obj.ConnectionString = con.GetConnection();
                    sqlCon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetWorkStreamsList", sqlCon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlCon_Obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_WorkStream_Obj = new HCM_WorkStream();
                                hcm_WorkStream_Obj.WorkStreamID = Convert.ToInt32(dt.Rows[i]["WorkStreamID"]);
                                hcm_WorkStream_Obj.Product.ProductID = dt.Rows[i]["ProductID"]== DBNull.Value ? (int?)null : Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                hcm_WorkStream_Obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                hcm_WorkStream_Obj.Module.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                hcm_WorkStream_Obj.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                hcm_WorkStream_Obj.WorkStreamName = Convert.ToString(dt.Rows[i]["WorkStreamName"]);
                                hcm_WorkStream_Obj.WorkStreamDescription = Convert.ToString(dt.Rows[i]["WorkStreamDescription"]);
                                hcm_WorkStream_Obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                hcm_WorkStream_Obj.CreatedOn = Convert.ToDateTime(dt.Rows[i]["CreatedOn"]);
                                hcm_WorkStream_Obj.CreatedBy = Convert.ToInt32(dt.Rows[i]["CreatedBy"]);
                                hcmWorkStream_List.Add(hcm_WorkStream_Obj);
                            }

                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return hcmWorkStream_List;
        }

        public List<HCM_Module> GetModules()
        {
            List<HCM_Module> hcmModules_List = new List<HCM_Module>();
            HCM_Module hcm_Module_Obj = new HCM_Module();

            try
            {
                using (SqlConnection sqlCon_Obj = new SqlConnection())
                {
                    sqlCon_Obj.ConnectionString = con.GetConnection();
                    sqlCon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetModulesBasedOnProductID", sqlCon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlCon_Obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_Module_Obj = new HCM_Module();
                                hcm_Module_Obj.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                hcm_Module_Obj.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                hcmModules_List.Add(hcm_Module_Obj);
                            }

                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return hcmModules_List;
        }

        public string WorkStreamInsertionAndUpdation(NameValueCollection workStreamCollection)
        {
            string client_Obj = "";
            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_InsertAndUpdateWorkStream", sqlcon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        if (workStreamCollection["WorkStreamID"] != "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@WorkStreamID", Convert.ToString(workStreamCollection["WorkStreamID"]).Trim());
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(workStreamCollection["Status"]));
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@WorkStreamID", DBNull.Value);
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", true);
                        }
                        sqlcmd_Obj.Parameters.AddWithValue("@ModuleID", Convert.ToInt32(workStreamCollection["ModuleID"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@WorkStreamName", Convert.ToString(workStreamCollection["WorkStreamName"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@WorkStreamDescription", Convert.ToString(workStreamCollection["WorkStreamDescription"]).Trim());
                        //if (workStreamCollection["Status"] != "")
                        //{
                        //    sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(workStreamCollection["Status"]));
                        //}
                        //else
                        //{
                        //    sqlcmd_Obj.Parameters.AddWithValue("@Status", false);
                        //}
                        sqlcmd_Obj.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sqlcon_Obj.Close();

                        if (result > 0)
                        {
                            client_Obj = "Success";
                        }
                        else
                        {
                            client_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
            return client_Obj;

        }

    }
}
