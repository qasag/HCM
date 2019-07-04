using HCM.DAL;
using HCM.Filters;
using HCM.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HCM.Controllers
{
    [QuestionnaireFilter]
    public class QuestionnaireController : Controller
    {

        public ActionResult Index()
        {
            ViewBag.Menu = "Questionnaire";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllQuestionnairesList(int ModuleID)
        {
            try
            {
                List<HCM_QuestionnarieClientMapper> questionnaire_list = new List<HCM_QuestionnarieClientMapper>();
                ModifyQuestionnaireData questionnaire_Obj = new ModifyQuestionnaireData();
                questionnaire_list = questionnaire_Obj.GetAllQuestionnairesList(Convert.ToInt32(Session["UserID"]), ModuleID);

                var jsonResult = Json(questionnaire_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertAndUpdateQuestionnaire(string QuestionnaireID, string Response, string Comments)
        {
            try
            {
                string Msg;
                ModifyQuestionnaireData create_Reponse_Obj = new ModifyQuestionnaireData();
                Msg = create_Reponse_Obj.InsertAndUpdateUserResponse(QuestionnaireID, Response, HttpUtility.UrlDecode(Comments));

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetModulesByUserID()
        {
            try
            {
                List<HCM_Module> module_list = new List<HCM_Module>();
                ModifyModulesData module_Obj = new ModifyModulesData();
                module_list = module_Obj.GetModulesByUserID(Convert.ToInt32(Session["UserID"]));

                var jsonResult = Json(module_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
