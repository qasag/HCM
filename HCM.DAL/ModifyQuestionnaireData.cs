using HCM.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HCM.DAL
{
    public class ModifyQuestionnaireData
    {
        GetSqlConnection sql = new GetSqlConnection();

        public List<HCM_QuestionnarieClientMapper> GetAllQuestionnairesList(int UserID, int ModuleID)
        {
            List<HCM_QuestionnarieClientMapper> questionnaire_list = new List<HCM_QuestionnarieClientMapper>();
            HCM_QuestionnarieClientMapper questionnaire_obj = new HCM_QuestionnarieClientMapper();
            int Srl_Numbers = 0;

            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_GetAllQuestionnaires", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@UserID", UserID);
                        cmd.Parameters.AddWithValue("@ModuleID", ModuleID);
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        da.Fill(dt);
                        sql_obj.Close();
                        if (dt.Rows.Count > 0)
                        {
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                questionnaire_obj = new HCM_QuestionnarieClientMapper();
                                questionnaire_obj.SerialNo = Convert.ToString(Srl_Numbers = i + 1);
                                questionnaire_obj.Module.ModuleName = Convert.ToString(dt.Rows[i]["ModuleName"]);
                                questionnaire_obj.WorkStream.WorkStreamName = Convert.ToString(dt.Rows[i]["WorkStreamName"]);
                                questionnaire_obj.Area.AreaID = Convert.ToInt32(dt.Rows[i]["AreaID"]);
                                questionnaire_obj.Area.AreaName = Convert.ToString(dt.Rows[i]["AreaName"]);
                                questionnaire_obj.SubArea.SubAreaID = Convert.ToInt32(dt.Rows[i]["SubAreaID"]);
                                questionnaire_obj.SubArea.SubAreaName = Convert.ToString(dt.Rows[i]["SubAreaName"]);
                               // questionnaire_obj.QuestionnaireClientMapperID = Convert.ToInt32(dt.Rows[i]["QuestionnaireClientMapperID"]);                                
                                questionnaire_obj.QuestionnaireName = Convert.ToString(dt.Rows[i]["QuestionnaireName"]);
                                questionnaire_obj.RowNumber = Convert.ToInt32(dt.Rows[i]["RowNumber"]);
                                questionnaire_obj.Response = Convert.ToString(dt.Rows[i]["Response"]);
                                questionnaire_obj.Comments = Convert.ToString(dt.Rows[i]["Comments"]);
                                questionnaire_obj.QuestionnaireID = Convert.ToInt32(dt.Rows[i]["QuestionnaireID"]);
                                questionnaire_obj.VersionID = Convert.ToInt32(dt.Rows[i]["VersionID"]);
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

        public string InsertAndUpdateUserResponse(string QuestionnaireID, string Response, string Comments)
        {
            string response_rslt = "";
            try
            {
                using (SqlConnection sql_obj = new SqlConnection())
                {
                    sql_obj.ConnectionString = sql.GetConnection();
                    sql_obj.Open();
                    using (SqlCommand cmd = new SqlCommand("HCM_PROC_InsertAndUpdateUserResponse", sql_obj))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 0;
                        cmd.Parameters.AddWithValue("@UserID", Convert.ToInt32(HttpContext.Current.Session["UserID"]));
                        cmd.Parameters.AddWithValue("@QuestionnaireID", Convert.ToInt32(QuestionnaireID));
                        cmd.Parameters.AddWithValue("@Response", Convert.ToString(Response));
                        cmd.Parameters.AddWithValue("@Comments", Convert.ToString(Comments));
                        cmd.Parameters.AddWithValue("@CreatedAndUpdatedBy", Convert.ToInt32(HttpContext.Current.Session["UserID"]));
                        int result = 0;
                        result = cmd.ExecuteNonQuery();
                        sql_obj.Close();

                        if (result > 0)
                        {
                            response_rslt = "Success";
                        }
                        else
                        {
                            response_rslt = "Failed";
                        }
                        return response_rslt;
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
