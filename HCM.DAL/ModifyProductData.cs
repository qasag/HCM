using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;
using System.IO;
using HCM.Models;

namespace HCM.DAL
{
    #region Product Code Starts

    public class ModifyProductData
    {
        GetSqlConnection sql_con = new GetSqlConnection();

        public List<HCM_Product> GetAllProducts()
        {
            List<HCM_Product> list_HcmProduct = new List<HCM_Product>();
            HCM_Product hcm_Product_Obj = new HCM_Product();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql_con.GetConnection();
                    sql_obj.Open();

                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetAllProducts",sql_obj))
                    {
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.CommandTimeout = 0;
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_Product_Obj = new HCM_Product();
                                hcm_Product_Obj.ProductID = Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                hcm_Product_Obj.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                hcm_Product_Obj.ProductDescription = Convert.ToString(dt.Rows[i]["ProductDescription"]);
                                hcm_Product_Obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                hcm_Product_Obj.CreatedAndUpdatedBy = Convert.ToInt32(HttpContext.Current.Session["UserID"]);
                                list_HcmProduct.Add(hcm_Product_Obj);
                            }
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list_HcmProduct;
        }

        public string InsertAndUpdateProduct(NameValueCollection product_CreateCollection)
        {
            string result_Obj = "";
            try
            {

                SqlConnection sql_Obj = new SqlConnection();
                sql_Obj.ConnectionString = sql_con.GetConnection();
                sql_Obj.Open();

                using (SqlCommand sqlCmd_Obj = new SqlCommand("HCM_PROC_InsertAndUpdateProduct",sql_Obj))
                {
                    sqlCmd_Obj.CommandType = CommandType.StoredProcedure;
                    sqlCmd_Obj.CommandTimeout = 0;
                    if(product_CreateCollection["ProductID"]=="" || product_CreateCollection["ProductID"]==null)
                    {
                        sqlCmd_Obj.Parameters.AddWithValue("@ProductID",DBNull.Value);
                        sqlCmd_Obj.Parameters.AddWithValue("@Status", true);
                    }
                    else{
                        sqlCmd_Obj.Parameters.AddWithValue("@ProductID", product_CreateCollection["ProductID"]);
                        sqlCmd_Obj.Parameters.AddWithValue("@Status", product_CreateCollection["Status"]);
                    }
                    sqlCmd_Obj.Parameters.AddWithValue("@ProductName", product_CreateCollection["ProductName"]);
                    sqlCmd_Obj.Parameters.AddWithValue("@ProductDescription", product_CreateCollection["ProductDescription"]);
                    sqlCmd_Obj.Parameters.AddWithValue("@CreatedAndUpdatedBy", Convert.ToInt32(HttpContext.Current.Session["UserID"]));
                    int result = sqlCmd_Obj.ExecuteNonQuery();
                    sql_Obj.Close();
                    if (result > 0)
                    {
                        result_Obj = "Success";
                    }
                    else
                    {
                        result_Obj = "Failed";
                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result_Obj;

        }

        public List<HCM_Product> GetActiveProducts()
        {
            List<HCM_Product> list_HcmProduct = new List<HCM_Product>();
            HCM_Product hcm_Product_Obj = new HCM_Product();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql_con.GetConnection();
                    sql_obj.Open();

                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_GetActiveProductsList", sql_obj))
                    {
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.CommandTimeout = 0;
                        SqlDataAdapter da = new SqlDataAdapter(sqlcmd_Obj);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (var i = 0; i < dt.Rows.Count; i++)
                            {
                                hcm_Product_Obj = new HCM_Product();
                                hcm_Product_Obj.ProductID = Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                hcm_Product_Obj.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                list_HcmProduct.Add(hcm_Product_Obj);
                            }
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return list_HcmProduct;
        }

    }

    #endregion Code Ends
}
