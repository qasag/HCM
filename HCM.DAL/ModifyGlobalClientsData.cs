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
    public class ModifyGlobalClientsData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public List<HCM_Client> GetClients(int ClientID,string UserType)
        {
            List<HCM_Client> client_list = new List<HCM_Client>();
            HCM_Client client_obj = new HCM_Client();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetClientsList", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                       // cmd.Parameters.AddWithValue("@ClientID", ClientID);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();

                        if (dt.Rows.Count > 0)
                        {
                            if (UserType!="SuperAdmin")
                            {
                                for (int i = 0; i < dt.Rows.Count; i++)
                                {
                                    if (Convert.ToInt32(dt.Rows[i]["ClientID"]) == ClientID)
                                    {
                                        client_obj = new HCM_Client();
                                        client_obj.ClientID = Convert.ToInt32(dt.Rows[i]["ClientID"]);
                                        client_obj.ClientName = Convert.ToString(dt.Rows[i]["ClientName"]);
                                        client_list.Add(client_obj);
                                    }
                                }
                            }
                            else
                            {
                                for (int i = 0; i < dt.Rows.Count; i++)
                                {
                                    client_obj = new HCM_Client();
                                    client_obj.ClientID = Convert.ToInt32(dt.Rows[i]["ClientID"]);
                                    client_obj.ClientName = Convert.ToString(dt.Rows[i]["ClientName"]);
                                    client_list.Add(client_obj);
                                }
                            }

                        }
                    }
                }
                return client_list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

    }
}
