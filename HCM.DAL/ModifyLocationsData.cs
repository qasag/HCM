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
    public class ModifyLocationsData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public List<HCM_Location> GetAllLocations()
        {
            List<HCM_Location> location_list = new List<HCM_Location>();
            HCM_Location location_obj = new HCM_Location();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetAllLocations", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                location_obj = new HCM_Location();
                                location_obj.LocationID = Convert.ToInt32(dt.Rows[i]["LocationID"]);
                                location_obj.Country.Region.RegionID = Convert.ToInt32(dt.Rows[i]["RegionID"]);
                                location_obj.Country.Region.RegionName = Convert.ToString(dt.Rows[i]["RegionName"]);
                                location_obj.Country.Region.RegionCode = Convert.ToString(dt.Rows[i]["RegionCode"]);
                                location_obj.LocationName = Convert.ToString(dt.Rows[i]["LocationName"]);
                                location_obj.Country.CountryID = Convert.ToInt32(dt.Rows[i]["CountryID"]);
                                location_obj.Country.CountryName = Convert.ToString(dt.Rows[i]["CountryName"]);
                                location_obj.LocationDescription = Convert.ToString(dt.Rows[i]["LocationDescription"]);
                                location_obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                location_list.Add(location_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return location_list;
        }

        public string InsertAndUpdateLocation(NameValueCollection location_data_collection)
        {
            string location_result = "";

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_InsertAndUpdateLocation", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;

                        if (location_data_collection["LocationID"] == null || location_data_collection["LocationID"] == "" || location_data_collection["LocationID"] == "undefined")
                        {
                            cmd.Parameters.AddWithValue("@LocationID", DBNull.Value);
                            cmd.Parameters.AddWithValue("@Status", true);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@LocationID", location_data_collection["LocationID"].Trim());
                            cmd.Parameters.AddWithValue("@Status", location_data_collection["Status"].Trim());
                        }

                        cmd.Parameters.AddWithValue("@CountryID", location_data_collection["CountryID"].Trim());
                        cmd.Parameters.AddWithValue("@LocationName", location_data_collection["LocationName"].Trim());
                        cmd.Parameters.AddWithValue("@LocationDesc", location_data_collection["LocationDescription"].Trim());
                        cmd.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = cmd.ExecuteNonQuery();
                        sql_obj.Close();

                        if (result > 0)
                        {
                            location_result = "Success";
                        }
                        else
                        {
                            location_result = "Failed";
                        }
                        return location_result;
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
