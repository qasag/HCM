using HCM.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HCM.DAL
{
    public class ModifyUsersData
    {
        GetSqlConnection sql = new GetSqlConnection();
        ModifyEncryptDecryptData EncryptDecrypt_obj = new ModifyEncryptDecryptData();

        public List<HCM_Users> GetUsers()
        {
            List<HCM_Users> users_list = new List<HCM_Users>();
            HCM_Users user_obj = new HCM_Users();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetUsers", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@ClientID", HttpContext.Current.Session["ClientID"]);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                user_obj = new HCM_Users();
                                user_obj.UserID = Convert.ToInt32(dt.Rows[i]["UserID"]);
                                user_obj.Client.ClientID = Convert.ToInt32(dt.Rows[i]["ClientID"]);
                                user_obj.UserType = Convert.ToString(dt.Rows[i]["UserType"]);
                                user_obj.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                                user_obj.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                                user_obj.Email = Convert.ToString(dt.Rows[i]["Email"]);
                                user_obj.Password = Convert.ToString(dt.Rows[i]["Password"]);
                                user_obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                user_obj.Country.Region.RegionID = dt.Rows[i]["RegionID"] == DBNull.Value ? (int?)null : Convert.ToInt32(dt.Rows[i]["RegionID"]);
                               // user_obj.Product.ProductID = dt.Rows[i]["ProductID"]==DBNull.Value ? (int?) null: Convert.ToInt32(dt.Rows[i]["ProductID"]);
                               // user_obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                user_obj.Country.Region.RegionCode = Convert.ToString(dt.Rows[i]["RegionCode"]);
                                user_obj.Country.CountryID = dt.Rows[i]["CountryID"] == DBNull.Value ? (int?)null : Convert.ToInt32(dt.Rows[i]["CountryID"]); //Convert.ToInt32(dt.Rows[i]["CountryID"]);
                                user_obj.Country.CountryName = Convert.ToString(dt.Rows[i]["CountryName"]);
                                user_obj.Location.LocationID = dt.Rows[i]["LocationID"] == DBNull.Value ? (int?)null : Convert.ToInt32(dt.Rows[i]["LocationID"]);
                                user_obj.Location.LocationName = Convert.ToString(dt.Rows[i]["LocationName"]);
                                users_list.Add(user_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return users_list;
        }

        public string InsertAndUpdateUser(NameValueCollection User_data_collection)
        {
            string User_result = "";

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_InsertAndUpdateUser", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;

                        if (User_data_collection["UserID"] == null || User_data_collection["UserID"] == "" || User_data_collection["UserID"] == "undefined")
                        {
                            cmd.Parameters.AddWithValue("@UserID", DBNull.Value);
                            cmd.Parameters.AddWithValue("@Status", true);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@UserID", User_data_collection["UserID"].Trim());
                            cmd.Parameters.AddWithValue("@Status", User_data_collection["Status"].Trim());
                        }
                        cmd.Parameters.AddWithValue("@ClientID", HttpContext.Current.Session["ClientID"]);
                        cmd.Parameters.AddWithValue("@UserType", User_data_collection["UserType"].Trim());
                        cmd.Parameters.AddWithValue("@FirstName", User_data_collection["FirstName"].Trim());
                        cmd.Parameters.AddWithValue("@LastName", User_data_collection["LastName"].Trim());
                        cmd.Parameters.AddWithValue("@Email", User_data_collection["Email"].Trim());
                        cmd.Parameters.AddWithValue("@Password", User_data_collection["Password"].Trim());
                        cmd.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);
                        cmd.Parameters.AddWithValue("@ModuleID", User_data_collection["ModuleID"].Trim());
                        cmd.Parameters.AddWithValue("@LocationID", User_data_collection["LocationID"].Trim());

                        int result = cmd.ExecuteNonQuery();
                        sql_obj.Close();

                        if (result > 0)
                        {
                            User_result = "Success";
                        }
                        else
                        {
                            User_result = "Failed";
                        }
                        return User_result;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string SendEmail(string EmailTo, string FirstName, string LastName)
        {
            string EmailResult = "";

            try
            {
                MailMessage Msg = new MailMessage();
                Msg.From = new MailAddress(ConfigurationManager.AppSettings["FromEmail"]);
                Msg.To.Add(EmailTo);

                var EncryptEmail = EncryptDecrypt_obj.Encrypt(EmailTo);

                Msg.Subject = "HCM Set Password";
                string EmailBody = "<p style='font-size:14px;'>Hi " + FirstName + " " + LastName + ",<br/><br/>Please Set Password To Login HCM<br/> Hosted Url : <a href='" + ConfigurationManager.AppSettings["SetPasswordUrl"] + "?EmailID=" + EncryptEmail + "'>HCM</a><br/><br/>Thanks,<br/>Team Support.<p>";

                Msg.Body = EmailBody;
                Msg.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = ConfigurationManager.AppSettings["Host"];
                smtp.EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["SSL"]);
                NetworkCredential NetworkCred = new NetworkCredential();
                NetworkCred.UserName = ConfigurationManager.AppSettings["Username"];
                NetworkCred.Password = ConfigurationManager.AppSettings["Password"];
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = Convert.ToInt32(ConfigurationManager.AppSettings["Port"]);
                smtp.Send(Msg);
                Msg = null;
                EmailResult = "Success";

            }
            catch (Exception ex)
            {
                EmailResult = ex.InnerException.ToString();
            }
            return EmailResult;
        }

        public List<HCM_UserModuleMapper> EditUserById(string UserID)
        {
            List<HCM_UserModuleMapper> UserMdle_List = new List<HCM_UserModuleMapper>();
            HCM_UserModuleMapper userMdule_Obj = new HCM_UserModuleMapper();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_EditUserByID", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@UserID", Convert.ToInt32(UserID));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                userMdule_Obj = new HCM_UserModuleMapper();
                                userMdule_Obj.User.UserID = Convert.ToInt32(dt.Rows[i]["UserID"]);
                                userMdule_Obj.User.Client.ClientID = Convert.ToInt32(dt.Rows[i]["ClientID"]);
                                userMdule_Obj.User.UserType = Convert.ToString(dt.Rows[i]["UserType"]);
                                userMdule_Obj.User.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                                userMdule_Obj.User.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                                userMdule_Obj.User.Email = Convert.ToString(dt.Rows[i]["Email"]);
                                userMdule_Obj.User.Password = Convert.ToString(dt.Rows[i]["Password"]);
                                userMdule_Obj.User.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                userMdule_Obj.AssignedModules = Convert.ToString(dt.Rows[i]["ModuleID"]);
                                userMdule_Obj.Product.ProductID = dt.Rows[i]["ProductID"] == DBNull.Value ? (int?)null: Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                userMdule_Obj.User.Location.LocationID = dt.Rows[i]["LocationID"] == DBNull.Value ? (int?)null : Convert.ToInt32(dt.Rows[i]["LocationID"]);
                                UserMdle_List.Add(userMdule_Obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return UserMdle_List;
        }

        public List<HCM_Region> GetRegions()
        {
            List<HCM_Region> region_list = new List<HCM_Region>();
            HCM_Region region_obj = new HCM_Region();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetRegions", sql_obj))
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
                                region_obj = new HCM_Region();
                                region_obj.RegionID = Convert.ToInt32(dt.Rows[i]["RegionID"]);
                                region_obj.RegionCode = Convert.ToString(dt.Rows[i]["RegionCode"]);
                                region_list.Add(region_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return region_list;
        }

        public List<HCM_Country> GetCountriesBasedOnRegion(string RegionID)
        {
            List<HCM_Country> country_list = new List<HCM_Country>();
            HCM_Country country_obj = new HCM_Country();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetCountriesBasedOnRegionID", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@RegionID", Convert.ToInt32(RegionID));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                country_obj = new HCM_Country();
                                country_obj.CountryID = Convert.ToInt32(dt.Rows[i]["CountryID"]);
                                country_obj.CountryName = Convert.ToString(dt.Rows[i]["CountryName"]);
                                country_list.Add(country_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return country_list;
        }

        public List<HCM_Location> GetLocationBasedOnCountries(string CountryID)
        {
            List<HCM_Location> location_list = new List<HCM_Location>();
            HCM_Location location_obj = new HCM_Location();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetLocationsBasedOnCountryID", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@CountryID", Convert.ToInt32(CountryID));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                location_obj = new HCM_Location();
                                location_obj.LocationID = Convert.ToInt32(dt.Rows[i]["LocationID"]);
                                location_obj.LocationName = Convert.ToString(dt.Rows[i]["LocationName"]);
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

        public List<HCM_Module> GetModulesByProductID(int? ProductID)
        {
            List<HCM_Module> Modle_list = new List<HCM_Module>();
            HCM_Module Modle_obj = new HCM_Module();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetModulesBasedOnProductID", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        if (Convert.ToInt32(ProductID) != null)
                        {
                            cmd.Parameters.AddWithValue("@ProductID", Convert.ToInt32(ProductID));
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@ProductID", DBNull.Value);
                        }
                       
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
