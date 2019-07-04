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
    public class ModifyClientData
    {
        GetSqlConnection con = new GetSqlConnection();

        #region Clients Code Starts

        public List<HCM_Client> GetAllClients()
        {
            List<HCM_Client> hcm_ClientList_Obj = new List<HCM_Client>();
            HCM_Client hcm_Clients_Obj = new HCM_Client();

            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetClientsList", sqlcon_Obj))
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

                                hcm_Clients_Obj = new HCM_Client();
                                hcm_Clients_Obj.ClientID = Convert.ToInt32(dt.Rows[i]["ClientID"]);
                                hcm_Clients_Obj.ClientName = Convert.ToString(dt.Rows[i]["ClientName"]);
                                hcm_Clients_Obj.ClientEmail = Convert.ToString(dt.Rows[i]["ClientEmail"]);
                                hcm_Clients_Obj.CreatedOn = Convert.ToDateTime(dt.Rows[i]["CreatedOn"]);
                                hcm_Clients_Obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                hcm_ClientList_Obj.Add(hcm_Clients_Obj);
                            }

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return hcm_ClientList_Obj;

        }

        public string ClientCreationAndUpdation(NameValueCollection clientCreateCollection)
        {
            string client_Obj = "";
            try
            {
                using (SqlConnection sqlcon_Obj = new SqlConnection())
                {
                    sqlcon_Obj.ConnectionString = con.GetConnection();
                    sqlcon_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_InsertAndUpdateClient", sqlcon_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;

                        if (clientCreateCollection["ClientID"] != "")
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@ClientID", Convert.ToString(clientCreateCollection["ClientID"]).Trim());
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(clientCreateCollection["Status"]));
                        }
                        else
                        {
                            sqlcmd_Obj.Parameters.AddWithValue("@ClientID", DBNull.Value);
                            sqlcmd_Obj.Parameters.AddWithValue("@Status", Convert.ToBoolean(true));
                        }
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientName", Convert.ToString(clientCreateCollection["ClientName"]).Trim());
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientEmail", Convert.ToString(clientCreateCollection["ClientEmail"]).Trim());
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

        #endregion Code Ends

    }
}
