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
    public class ModifyVersionsData
    {
        GetSqlConnection con = new GetSqlConnection();

        public List<HCM_Versions> GetAllVersions()
        {
            List<HCM_Versions> hcm_Version_list = new List<HCM_Versions>();
            HCM_Versions hcm_Version_Obj = new HCM_Versions();

            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetVersionsList", sqlcon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_Obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_Version_Obj = new HCM_Versions();
                                hcm_Version_Obj.VersionID = Convert.ToInt32(dt.Rows[i]["VersionID"]);
                                hcm_Version_Obj.Client.ClientID = Convert.ToInt32(dt.Rows[i]["ClientID"]);
                                hcm_Version_Obj.FromVersionID = dt.Rows[i]["FromVersionID"] == DBNull.Value ? 0 : Convert.ToInt32(dt.Rows[i]["FromVersionID"]);
                                hcm_Version_Obj.VersionName = Convert.ToString(dt.Rows[i]["VersionName"]);
                                hcm_Version_Obj.VersionDescription = Convert.ToString(dt.Rows[i]["VersionDescription"]);
                                hcm_Version_Obj.IsDefault = Convert.ToBoolean(dt.Rows[i]["IsDefault"]);
                                hcm_Version_Obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                hcm_Version_Obj.FromVersionName = Convert.ToString(dt.Rows[i]["FromVersionName"]);
                                hcm_Version_list.Add(hcm_Version_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return hcm_Version_list;

        }

        public List<HCM_Versions> GetActiveVersions()
        {
            List<HCM_Versions> hcm_Version_list = new List<HCM_Versions>();
            HCM_Versions hcm_Version_Obj = new HCM_Versions();

            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetActiveVersionsList", sqlcon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientID", Convert.ToInt32(HttpContext.Current.Session["ClientID"]));
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sqlcon_Obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_Version_Obj = new HCM_Versions();
                                hcm_Version_Obj.VersionID = Convert.ToInt32(dt.Rows[i]["VersionID"]);
                                hcm_Version_Obj.VersionName = Convert.ToString(dt.Rows[i]["VersionName"]);
                                hcm_Version_Obj.IsDefault = Convert.ToBoolean(dt.Rows[i]["IsDefault"]);
                                hcm_Version_list.Add(hcm_Version_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return hcm_Version_list;

        }

        public string InsertAndUpdateVersion(NameValueCollection VersionCollectionObj)
        {
            string version_Obj = "";
            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_InsertAndUpdateVersion", sqlcon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;

                        if (VersionCollectionObj["VersionID"] == "0" || VersionCollectionObj["VersionID"] == "" || VersionCollectionObj["VersionID"] == null)
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@VersionID", DBNull.Value);
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(true));
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@VersionID", Convert.ToString(VersionCollectionObj["VersionID"]).Trim());
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(VersionCollectionObj["Status"]));
                        }
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientID", HttpContext.Current.Session["ClientID"]);

                        if (VersionCollectionObj["FromVersionID"] == null || VersionCollectionObj["FromVersionID"] == "" || VersionCollectionObj["FromVersionID"] == "0")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@FromVersionID", DBNull.Value);
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@FromVersionID", Convert.ToInt32(VersionCollectionObj["FromVersionID"]));
                        }

                        sqlcmd_Obj.Parameters.AddWithValue("@VersionName", Convert.ToString(VersionCollectionObj["VersionName"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@VersionDesc", Convert.ToString(VersionCollectionObj["VersionDescription"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sqlcon_Obj.Close();

                        if (result > 0)
                        {
                            version_Obj = "Success";
                        }
                        else
                        {
                            version_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return version_Obj;
        }

        public string UpdateVersionToDefault(string VersionID)
        {
            string version_Obj = "";
            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_SetVersionAsDefault", sqlcon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientID", HttpContext.Current.Session["ClientID"]);
                        sqlcmd_Obj.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        sqlcmd_Obj.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sqlcon_Obj.Close();

                        if (result > 0)
                        {
                            version_Obj = "Success";
                        }
                        else
                        {
                            version_Obj = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return version_Obj;
        }

    }
}
