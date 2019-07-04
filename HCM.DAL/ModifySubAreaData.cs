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
    public class ModifySubAreaData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public List<HCM_SubArea> GetSubArea()
        {
            List<HCM_SubArea> subArea_list = new List<HCM_SubArea>();
            HCM_SubArea subArea_obj = new HCM_SubArea();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetSubArea", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                subArea_obj = new HCM_SubArea();  
                                subArea_obj.SubAreaID = Convert.ToInt32(dt.Rows[i]["SubAreaID"]);
                                subArea_obj.Product.ProductID = dt.Rows[i]["ProductID"] == DBNull.Value ? (int?)null : Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                subArea_obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                subArea_obj.Area.AreaID = Convert.ToInt32(dt.Rows[i]["AreaID"]);
                                subArea_obj.Area.Module.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                subArea_obj.Area.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                subArea_obj.SubAreaName = Convert.ToString(dt.Rows[i]["SubAreaName"]);
                                subArea_obj.SubAreaDescription = Convert.ToString(dt.Rows[i]["SubAreaDescription"]);
                                subArea_obj.Area.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);
                                subArea_obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                subArea_list.Add(subArea_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return subArea_list;
        }

        public List<HCM_Area> GetAreaByModuleID(int ModuleID)
        {
            List<HCM_Area> area_list = new List<HCM_Area>();
            HCM_Area area_obj = new HCM_Area();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetAreaByModuleID", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        if (ModuleID != null)
                        {
                            cmd.Parameters.AddWithValue("@ModuleID", ModuleID);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@ModuleID", DBNull.Value);
                        }
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                area_obj = new HCM_Area();
                                area_obj.AreaID = Convert.ToInt32(dt.Rows[i]["AreaID"]);
                                area_obj.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);
                                area_list.Add(area_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return area_list;
        }

        public string InsertAndUpdateSubArea(NameValueCollection subArea_data_collection)
        {
            string subArea_result = "";

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_InsertAndUpdateSubArea", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;

                        if (subArea_data_collection["SubAreaID"] == null || subArea_data_collection["SubAreaID"] == "" || subArea_data_collection["SubAreaID"] == "undefined")
                        {
                            cmd.Parameters.AddWithValue("@SubAreaID", DBNull.Value);
                            cmd.Parameters.AddWithValue("@Status", true);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@SubAreaID", subArea_data_collection["SubAreaID"].Trim());
                            cmd.Parameters.AddWithValue("@Status", subArea_data_collection["Status"].Trim());
                        }
                        cmd.Parameters.AddWithValue("@AreaID", subArea_data_collection["AreaID"].Trim());
                        cmd.Parameters.AddWithValue("@SubAreaName", subArea_data_collection["SubAreaName"].Trim());
                        cmd.Parameters.AddWithValue("@SubAreaDescription", subArea_data_collection["SubAreaDescription"].Trim());                        
                        cmd.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = cmd.ExecuteNonQuery();
                        sql_obj.Close();

                        if (result > 0)
                        {
                            subArea_result = "Success";
                        }
                        else
                        {
                            subArea_result = "Failed";
                        }
                        return subArea_result;
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
