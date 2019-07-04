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
    public class ModifyAreaData
    {
        //SqlConnection
        GetSqlConnection con = new GetSqlConnection();

        #region Area Code Starts

        public List<HCM_Area> GetAllreas()
        {
            List<HCM_Area> hcm_AreaList_Obj = new List<HCM_Area>();
            HCM_Area hcm_Areas_Obj = new HCM_Area();

            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetAreasList", sqlcon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_Obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_Areas_Obj = new HCM_Area();
                                hcm_Areas_Obj.Product.ProductID = dt.Rows[i]["ProductID"]== DBNull.Value ? (int?)null: Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                hcm_Areas_Obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                hcm_Areas_Obj.AreaID = Convert.ToInt32(dt.Rows[i]["AreaID"]);
                                hcm_Areas_Obj.Module.ModuleID = Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                hcm_Areas_Obj.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);                                
                                hcm_Areas_Obj.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);
                                hcm_Areas_Obj.AreaDescription = Convert.ToString(dt.Rows[i]["AreaDescription"]);
                                hcm_Areas_Obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                hcm_Areas_Obj.CreatedOn = Convert.ToDateTime(dt.Rows[i]["CreatedOn"]);
                                hcm_AreaList_Obj.Add(hcm_Areas_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return hcm_AreaList_Obj;
        }

        public string AreaCreationAndUpdation(NameValueCollection areaCreateCollection)
        {
            string area_msg = "";
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = con.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_InsertAndUpdateArea", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;

                        if (areaCreateCollection["AreaID"] != "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@AreaID", Convert.ToInt32(areaCreateCollection["AreaID"]));
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(areaCreateCollection["Status"]));
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@AreaID", DBNull.Value);
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", true);
                        }
                        sqlcmd_Obj.Parameters.AddWithValue("@ModuleID", Convert.ToInt32(areaCreateCollection["ModuleID"]));
                        sqlcmd_Obj.Parameters.AddWithValue("@AreaName", Convert.ToString(areaCreateCollection["AreaName"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@AreaDescription", Convert.ToString(areaCreateCollection["AreaDescription"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);
                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sql_Obj.Close();
                        if (result > 0)
                        {
                            area_msg = "Success";
                        }
                        else
                        {
                            area_msg = "Fail";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
            return area_msg;

        }
              
        #endregion
    }
}
