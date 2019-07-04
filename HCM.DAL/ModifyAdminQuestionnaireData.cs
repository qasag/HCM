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
    public class ModifyAdminQuestionnaireData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public List<HCM_QuestionnarieClientMapper> GetAllQuestionnairesList(int ClientID, string VersionID)
        {
            List<HCM_QuestionnarieClientMapper> questionnaire_list = new List<HCM_QuestionnarieClientMapper>();
            HCM_QuestionnarieClientMapper questionnaire_obj = new HCM_QuestionnarieClientMapper();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetAllQuestionnairesList", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@ClientID", ClientID);
                        cmd.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        cmd.Parameters.AddWithValue("@ProductID", Convert.ToInt32(HttpContext.Current.Session["ProductID"]));
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                questionnaire_obj = new HCM_QuestionnarieClientMapper();
                                questionnaire_obj.Product.ProductID = dt.Rows[i]["ProductID"] ==DBNull.Value ?(int?)null:  Convert.ToInt32(dt.Rows[i]["ProductID"]);
                                questionnaire_obj.Product.ProductName = Convert.ToString(dt.Rows[i]["ProductName"]);
                                questionnaire_obj.Module.ModuleID = dt.Rows[i]["ModuleID"]==DBNull.Value ?(int?)null : Convert.ToInt32(dt.Rows[i]["ModuleID"]);
                                questionnaire_obj.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);

                                questionnaire_obj.WorkStream.WorkStreamID = dt.Rows[i]["WorkStreamID"] == DBNull.Value ? 0 : Convert.ToInt32(dt.Rows[i]["WorkStreamID"]);
                                questionnaire_obj.WorkStream.WorkStreamName = Convert.ToString(dt.Rows[i]["WorkStreamName"]);

                                questionnaire_obj.Area.AreaID = Convert.ToInt32(dt.Rows[i]["AreaID"]);
                                questionnaire_obj.Area.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);

                                questionnaire_obj.SubArea.SubAreaID = Convert.ToInt32(dt.Rows[i]["SubAreaID"]);
                                questionnaire_obj.SubArea.SubAreaName = Convert.ToString(dt.Rows[i]["SubAreaName"]);

                                questionnaire_obj.QuestionnaireClientMapperID = Convert.ToInt32(dt.Rows[i]["QuestionnaireClientMapperID"]);
                                questionnaire_obj.QuestionnaireName = Convert.ToString(dt.Rows[i]["QuestionnaireName"]);

                                questionnaire_obj.OverallRating_Yes = dt.Rows[i]["OverallRating_Yes"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["OverallRating_Yes"]);
                                questionnaire_obj.BusinessScore_Yes = dt.Rows[i]["BusinessScore_Yes"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["BusinessScore_Yes"]);
                                questionnaire_obj.BusinessWeight_Yes = dt.Rows[i]["BusinessWeight_Yes"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["BusinessWeight_Yes"]);
                                questionnaire_obj.TechnologyScore_Yes = dt.Rows[i]["TechnologyScore_Yes"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["TechnologyScore_Yes"]);
                                questionnaire_obj.TechnologyWeight_Yes = dt.Rows[i]["TechnologyWeight_Yes"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["TechnologyWeight_Yes"]);

                                questionnaire_obj.OverallRating_No = dt.Rows[i]["OverallRating_No"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["OverallRating_No"]);
                                questionnaire_obj.BusinessScore_No = dt.Rows[i]["BusinessScore_No"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["BusinessScore_No"]);
                                questionnaire_obj.BusinessWeight_No = dt.Rows[i]["BusinessWeight_No"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["BusinessWeight_No"]);
                                questionnaire_obj.TechnologyScore_No = dt.Rows[i]["TechnologyScore_No"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["TechnologyScore_No"]);
                                questionnaire_obj.TechnologyWeight_No = dt.Rows[i]["TechnologyWeight_No"] == DBNull.Value ? 0 : Convert.ToDecimal(dt.Rows[i]["TechnologyWeight_No"]);

                                questionnaire_obj.Security = Convert.ToBoolean(dt.Rows[i]["Security"]);
                                questionnaire_obj.Audit = Convert.ToBoolean(dt.Rows[i]["Audit"]);
                                questionnaire_obj.Compliance = Convert.ToBoolean(dt.Rows[i]["Compliance"]);
                                questionnaire_obj.Opertional = Convert.ToBoolean(dt.Rows[i]["Opertional"]);

                               // questionnaire_obj.IsDefault = Convert.ToBoolean(dt.Rows[i]["IsDefault"]);
                                //questionnaire_obj.Mapped = Convert.ToBoolean(dt.Rows[i]["Mapped"]);
                                questionnaire_obj.Status = Convert.ToBoolean(dt.Rows[i]["Status"]);
                                questionnaire_list.Add(questionnaire_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return questionnaire_list;
        }

        public List<HCM_WorkStream> GetWorkStreamByModuleID(int ModuleID)
        {
            List<HCM_WorkStream> workStream_list = new List<HCM_WorkStream>();
            HCM_WorkStream workStream_obj = new HCM_WorkStream();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetWorkStreamsByModuleID", sql_obj))
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
                                workStream_obj = new HCM_WorkStream();
                                workStream_obj.WorkStreamID = Convert.ToInt32(dt.Rows[i]["WorkStreamID"]);
                                workStream_obj.WorkStreamName = Convert.ToString(dt.Rows[i]["WorkStreamName"]);
                                workStream_list.Add(workStream_obj);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return workStream_list;
        }

        public List<HCM_SubArea> GetSubAreaByAreaID(int AreaID)
        {
            List<HCM_SubArea> subArea_list = new List<HCM_SubArea>();
            HCM_SubArea subArea_obj = new HCM_SubArea();

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetSubAreaByAreaID", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@AreaID", AreaID);
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
                                subArea_obj.SubAreaName = Convert.ToString(dt.Rows[i]["SubAreaName"]);
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

        public string InsertUpdateAdminQuestionnaire(NameValueCollection qustnire_data_collection, string VersionID)
        {
            string questionnaire_result = "";

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_InsertAndUpdateQuestionnaire", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        if (qustnire_data_collection["QuestionnaireClientMapperID"] == null || qustnire_data_collection["QuestionnaireClientMapperID"] == "" || qustnire_data_collection["QuestionnaireClientMapperID"] == "undefined")
                        {
                            cmd.Parameters.AddWithValue("@QuestionnaireClientMapperID", DBNull.Value);
                            cmd.Parameters.AddWithValue("@Status", Convert.ToBoolean(true));
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@QuestionnaireClientMapperID", qustnire_data_collection["QuestionnaireClientMapperID"].Trim());
                            cmd.Parameters.AddWithValue("@Status", Convert.ToBoolean(qustnire_data_collection["Status"]));
                        }

                        cmd.Parameters.AddWithValue("@ClientID", HttpContext.Current.Session["ClientID"]);
                        if (qustnire_data_collection["ProductID"] == "" || qustnire_data_collection["ProductID"] == null || qustnire_data_collection["ProductID"] == "undefined")
                        {
                            cmd.Parameters.AddWithValue("@ProductID", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@ProductID", Convert.ToInt32(qustnire_data_collection["ProductID"]));
                        }
                        cmd.Parameters.AddWithValue("@ModuleID", Convert.ToInt32(qustnire_data_collection["ModuleID"]));

                        if (qustnire_data_collection["WorkStreamID"] == "" || qustnire_data_collection["WorkStreamID"] == null || qustnire_data_collection["WorkStreamID"] == "0")
                        {
                            cmd.Parameters.AddWithValue("@WorkStreamID", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@WorkStreamID", Convert.ToInt32(qustnire_data_collection["WorkStreamID"]));
                        }


                        cmd.Parameters.AddWithValue("@AreaID", Convert.ToInt32(qustnire_data_collection["AreaID"]));
                        cmd.Parameters.AddWithValue("@SubAreaID", Convert.ToInt32(qustnire_data_collection["SubAreaID"]));
                        cmd.Parameters.AddWithValue("@QuestionnaireName", Convert.ToString(qustnire_data_collection["QuestionnaireName"].Trim()));


                        // Yes //
                        if (qustnire_data_collection["OverallRating_Yes"] == "" || qustnire_data_collection["OverallRating_Yes"] == null)
                        {
                            cmd.Parameters.AddWithValue("@OverallRating_Yes", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@OverallRating_Yes", Convert.ToDecimal(qustnire_data_collection["OverallRating_Yes"]));
                        }

                        if (qustnire_data_collection["BusinessScore_Yes"] == "" || qustnire_data_collection["BusinessScore_Yes"] == null)
                        {
                            cmd.Parameters.AddWithValue("@BusinessScore_Yes", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@BusinessScore_Yes", Convert.ToDecimal(qustnire_data_collection["BusinessScore_Yes"]));
                        }

                        if (qustnire_data_collection["BusinessWeight_Yes"] == "" || qustnire_data_collection["BusinessWeight_Yes"] == null)
                        {
                            cmd.Parameters.AddWithValue("@BusinessWeight_Yes", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@BusinessWeight_Yes", Convert.ToDecimal(qustnire_data_collection["BusinessWeight_Yes"]));
                        }

                        if (qustnire_data_collection["TechnologyScore_Yes"] == "" || qustnire_data_collection["TechnologyScore_Yes"] == null)
                        {
                            cmd.Parameters.AddWithValue("@TechnologyScore_Yes", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@TechnologyScore_Yes", Convert.ToDecimal(qustnire_data_collection["TechnologyScore_Yes"]));
                        }

                        if (qustnire_data_collection["TechnologyWeight_Yes"] == "" || qustnire_data_collection["TechnologyWeight_Yes"] == null)
                        {
                            cmd.Parameters.AddWithValue("@TechnologyWeight_Yes", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@TechnologyWeight_Yes", Convert.ToDecimal(qustnire_data_collection["TechnologyWeight_Yes"]));
                        }

                        // NO //

                        if (qustnire_data_collection["OverallRating_No"] == "" || qustnire_data_collection["OverallRating_No"] == null)
                        {
                            cmd.Parameters.AddWithValue("@OverallRating_No", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@OverallRating_No", Convert.ToDecimal(qustnire_data_collection["OverallRating_No"]));
                        }

                        if (qustnire_data_collection["BusinessScore_No"] == "" || qustnire_data_collection["BusinessScore_No"] == null)
                        {
                            cmd.Parameters.AddWithValue("@BusinessScore_No", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@BusinessScore_No", Convert.ToDecimal(qustnire_data_collection["BusinessScore_No"]));
                        }

                        if (qustnire_data_collection["BusinessWeight_No"] == "" || qustnire_data_collection["BusinessWeight_No"] == null)
                        {
                            cmd.Parameters.AddWithValue("@BusinessWeight_No", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@BusinessWeight_No", Convert.ToDecimal(qustnire_data_collection["BusinessWeight_No"]));
                        }

                        if (qustnire_data_collection["TechnologyScore_No"] == "" || qustnire_data_collection["TechnologyScore_No"] == null)
                        {
                            cmd.Parameters.AddWithValue("@TechnologyScore_No", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@TechnologyScore_No", Convert.ToDecimal(qustnire_data_collection["TechnologyScore_No"]));
                        }

                        if (qustnire_data_collection["TechnologyWeight_No"] == "" || qustnire_data_collection["TechnologyWeight_No"] == null)
                        {
                            cmd.Parameters.AddWithValue("@TechnologyWeight_No", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@TechnologyWeight_No", Convert.ToDecimal(qustnire_data_collection["TechnologyWeight_No"]));
                        }

                        cmd.Parameters.AddWithValue("@Security", Convert.ToBoolean(qustnire_data_collection["Security"]));
                        cmd.Parameters.AddWithValue("@Audit", Convert.ToBoolean(qustnire_data_collection["Audit"]));
                        cmd.Parameters.AddWithValue("@Compliance", Convert.ToBoolean(qustnire_data_collection["Compliance"]));
                        cmd.Parameters.AddWithValue("@Opertional", Convert.ToBoolean(qustnire_data_collection["Opertional"]));
                       
                        cmd.Parameters.AddWithValue("@VersionID", Convert.ToInt32(VersionID));
                        //cmd.Parameters.AddWithValue("@IsDefault", Convert.ToBoolean(qustnire_data_collection["IsDefault"]));
                        cmd.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);

                        int result = cmd.ExecuteNonQuery();
                        sql_obj.Close();

                        if (result > 0)
                        {
                            questionnaire_result = "Success";
                        }
                        else
                        {
                            questionnaire_result = "Failed";
                        }
                        return questionnaire_result;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string InsertQuestionnaireClientMapper(int QuestionnaireID,string Mapped)
        {
            string QCM_Msg = "";
            try
            {
                using (SqlConnection sql_Obj = new SqlConnection())
                {
                    sql_Obj.ConnectionString = sql.GetConnection();
                    sql_Obj.Open();
                    using (SqlCommand sqlcmd_Obj = new SqlCommand("HCM_PROC_InsertQuestionnaireClientMapper", sql_Obj))
                    {
                        sqlcmd_Obj.CommandTimeout = 0;
                        sqlcmd_Obj.CommandType = CommandType.StoredProcedure;
                        sqlcmd_Obj.Parameters.AddWithValue("@QuestionnarieID", QuestionnaireID);
                        sqlcmd_Obj.Parameters.AddWithValue("@ClientID", HttpContext.Current.Session["ClientID"]);
                        sqlcmd_Obj.Parameters.AddWithValue("@CreatedAndUpdatedBy", HttpContext.Current.Session["UserID"]);
                        sqlcmd_Obj.Parameters.AddWithValue("@Mapped", Convert.ToBoolean(Mapped));
                        int result = sqlcmd_Obj.ExecuteNonQuery();
                        sql_Obj.Close();
                        if (result > 0)
                        {
                            QCM_Msg = "Success";
                        }
                        else if (result == -1)
                        {
                            QCM_Msg = "Data Exists";
                        }                       
                        else
                        {
                            QCM_Msg = "Failed";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return QCM_Msg;
        }

    }
}
