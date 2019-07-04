using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HCM.Models;
using HCM.DAL;
using System.Data;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using HCM.Filters;
using System.IO;
using ClosedXML.Excel;

namespace HCM.Controllers
{
    [AdminActionFilter]
    public class DashBoardController : Controller
    {

        #region DashBoard Code Starts

        public ActionResult Index()
        {
            ViewBag.Menu = "Dashborad";
            return View();
        }

        [HttpPost]
        public JsonResult GetDashBoardData()
        {
            try
            {
                List<HCM_DashBoard> dashBrd_list = new List<HCM_DashBoard>();
                ModifyDashBoardData module_Obj = new ModifyDashBoardData();
                dashBrd_list = module_Obj.GetDashBoardData(Convert.ToString(Session["VersionID"]));
                return Json(dashBrd_list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetOverallRiskScoreData()
        {
            try
            {
                List<HCM_DashBoard> Overall_riskScore_list = new List<HCM_DashBoard>();
                ModifyDashBoardData Overall_riskScore_Obj = new ModifyDashBoardData();
                Overall_riskScore_list = Overall_riskScore_Obj.GetOverallRiskScoreData(Convert.ToString(Session["VersionID"]));

                return Json(Overall_riskScore_list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public string GetOverallRiskScoreInnerData(string UserType, string RiskFactor)
        {
            try
            {
                ModifyDashBoardData module_Obj = new ModifyDashBoardData();
                DataTable dt = module_Obj.GetOverallRiskScoreInnerData(UserType, RiskFactor, Convert.ToString(Session["VersionID"]));
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                return json;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public string GetDashBoardInnerData(string ModuleID, string UserType)
        {
            try
            {
                ModifyDashBoardData module_Obj = new ModifyDashBoardData();
                DataTable dt = module_Obj.GetDashBoardInnerData(ModuleID, UserType, Convert.ToString(Session["VersionID"]));
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                return json;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ActionResult GetRiskFactorExcelFile(string UserType, string ResponseType)
        {
            string filename = string.Format("HCM_RiskFactor_Report_{0}.xlsx", DateTime.Now.ToString("dd'_'MM'_'yyyy HH'_'mm'_'ss"));

            try
            {
                ModifyDashBoardData module_Obj = new ModifyDashBoardData();
                DataTable dt = module_Obj.GetRiskFactorExcelFile(UserType, ResponseType, Convert.ToString(Session["VersionID"]));

                using (XLWorkbook wb = new XLWorkbook())
                {
                    wb.Worksheets.Add(dt, "HCM_RiskFactor");
                    Response.Clear();
                    Response.Buffer = true;
                    Response.Charset = "";
                    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", filename));

                    using (MemoryStream MyMemoryStream = new MemoryStream())
                    {
                        wb.SaveAs(MyMemoryStream);
                        MyMemoryStream.WriteTo(Response.OutputStream);
                        Response.Flush();
                        Response.End();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return RedirectToAction("Index");
        }

        public ActionResult GetDashBoardDataInExcelFile(string ModuleID, string ResponseType)
        {
            string filename = string.Format("HCM_DashBoard_Report_{0}.xlsx", DateTime.Now.ToString("dd'_'MM'_'yyyy HH'_'mm'_'ss"));

            try
            {
                ModifyReportsData Report_Obj = new ModifyReportsData();
                DataTable dt = Report_Obj.GetSurveyResultInExcelFile(ModuleID, ResponseType, Convert.ToString(Session["VersionID"]));

                using (XLWorkbook wb = new XLWorkbook())
                {
                    wb.Worksheets.Add(dt, "HCM_DashBoard");
                    Response.Clear();
                    Response.Buffer = true;
                    Response.Charset = "";
                    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", filename));

                    using (MemoryStream MyMemoryStream = new MemoryStream())
                    {
                        wb.SaveAs(MyMemoryStream);
                        MyMemoryStream.WriteTo(Response.OutputStream);
                        Response.Flush();
                        Response.End();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return RedirectToAction("GetSurveyResult");
        }

        [HttpPost]
        public string GetRiskFactorGuageData()
        {
            try
            {
                ModifyDashBoardData module_Obj = new ModifyDashBoardData();
                DataTable dt = module_Obj.GetRiskFactorGuageData(Convert.ToString(Session["VersionID"]));
                string json = JsonConvert.SerializeObject(dt, Formatting.Indented);
                return json;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion DashBoard Code ends

        #region Financial_DshBrd Project Summary Related Code Starts

        public ActionResult GetProjectSummary()
        {
            ViewBag.Menu = "Dashborad";
            return View();
        }

        [HttpPost]
        public JsonResult GetProjectSummaryData()
        {
            try
            {
                List<HCM_ProjectSummary> PrjectSumry_list = new List<HCM_ProjectSummary>();
                ModifyFinancialDashBoardData PrjectSumry_Obj = new ModifyFinancialDashBoardData();
                PrjectSumry_list = PrjectSumry_Obj.GetProjectSummaryData();
                return Json(PrjectSumry_list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region Financial_DshBrd Project Hours Related Code Starts

        public ActionResult GetProjectHours()
        {
            ViewBag.Menu = "Dashborad";
            return View();
        }

        [HttpPost]
        public JsonResult GetDashBoardFinancialProjectHours()
        {
            try
            {
                List<HCM_FinancialConfiguration> FincalDashBrd_list = new List<HCM_FinancialConfiguration>();
                ModifyFinancialDashBoardData FincalDashBrd_Obj = new ModifyFinancialDashBoardData();
                FincalDashBrd_list = FincalDashBrd_Obj.GetDashBoardFinancialProjectHours();
                return Json(FincalDashBrd_list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region Financial_DshBrd Project Costs Related Code Starts

        public ActionResult GetProjectCost()
        {
            ViewBag.Menu = "Dashborad";
            return View();
        }

        [HttpPost]
        public JsonResult GetDashBoardFinancialProjectCost()
        {
            try
            {
                List<HCM_FinancialConfiguration> Fincal_PrjctCst_list = new List<HCM_FinancialConfiguration>();
                ModifyFinancialDashBoardData Fincal_PrjctCst_Obj = new ModifyFinancialDashBoardData();
                Fincal_PrjctCst_list = Fincal_PrjctCst_Obj.GetDashBoardFinancialProjectCost();
                return Json(Fincal_PrjctCst_list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

    }
}
