using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Configuration;
using System.Collections.Specialized;
using System.Web;
using HCM.Models;

namespace HCM.DAL
{
    public class ModifyModulesData
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_Module> GetAllModules()
        {
            List<HCM_Module> hcm_ModuleList_Obj = new List<HCM_Module>();
            HCM_Module hcm_Modules_Obj = new HCM_Module();
            try
            {
                using (SqlConnection sqlcon_obj = new SqlConnection())
                {
                    sqlcon_obj.ConnectionString = con.GetConnection();
                    sqlcon_obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetModules", sqlcon_obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@Status", DBNull.Value);
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_Modules_Obj = new HCM_Module();
                                hcm_Modules_Obj.Product.ProductID = Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                hcm_Modules_Obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                hcm_Modules_Obj.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                hcm_Modules_Obj.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                hcm_Modules_Obj.ModuleDescription = Convert.ToString(dt.Rows[i]["ModuleDescription"]);
                                hcm_Modules_Obj.CreatedOn = Convert.ToDateTime(dt.Rows[i]["CreatedOn"]);
                                hcm_Modules_Obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                hcm_ModuleList_Obj.Add(hcm_Modules_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return hcm_ModuleList_Obj;

        }

        public string ModuleCreationAndUpdation(NameValueCollection moduleCreateCollection)
        {
            string module_Obj = "";
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = con.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_InsertAndUpdateModule", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;

                        if (moduleCreateCollection["ModuleID"] != "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@ModuleID", Convert.ToString(moduleCreateCollection["ModuleID"]).Trim());
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(moduleCreateCollection["Status"]));
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@ModuleID", DBNull.Value);
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", true);
                        }
                        sqlcmd_Obj.Parameters.AddWithValue("@ProductID", Convert.ToString(moduleCreateCollection["ProductID"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@ModuleName", Convert.ToString(moduleCreateCollection["ModuleName"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@ModuleDescription", Convert.ToString(moduleCreateCollection["ModuleDescription"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);
                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sql_Obj.Close();
                        if (result > 0)
                        {
                            module_Obj = "Success";
                        }
                        else
                        {
                            module_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
            return module_Obj;

        }

        public List<HCM_Module> GetAllModulesList()
        {
            List<HCM_Module> module_list = new List<HCM_Module>();
            HCM_Module module_obj = new HCM_Module();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = con.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetModules", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@Status", true);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                module_obj = new HCM_Module();
                                module_obj.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                module_obj.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                if (i == 0)
                                {

                                    module_obj.Show = true;
                                }
                                else
                                {
                                    module_obj.Show = false;
                                }
                                module_list.Add(module_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return module_list;
        }

        public List<HCM_Module> GetModulesByUserID(int UserID)
        {
            List<HCM_Module> Modle_list = new List<HCM_Module>();
            HCM_Module Modle_obj = new HCM_Module();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = con.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetModulesByUserID", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                Modle_obj = new HCM_Module();
                                Modle_obj.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                Modle_obj.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                Modle_list.Add(Modle_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return Modle_list;
        }


    }
}
