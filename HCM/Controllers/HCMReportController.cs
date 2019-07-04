using ClosedXML.Excel;
using HCM.DAL;
using HCM.Filters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HCM.Controllers
{
    [AdminActionFilter]
    public class HCMReportController : Controller
    {

        GetSqlConnection con = new GetSqlConnection();

        public ActionResult GetSurveyResult()
        {
            ViewBag.Menu = "Reports";
            return View();
        }

        public ActionResult GetSurveyResultInExcelFile(string ModuleID, string ResponseType)
        {
            string filename = string.Format("HCM_SurveyResults_Report_{0}.xlsx", DateTime.Now.ToString("dd'_'MM'_'yyyy HH'_'mm'_'ss"));

            try
            {
                ModifyReportsData Report_Obj = new ModifyReportsData();
                DataTable dt = Report_Obj.GetSurveyResultInExcelFile(ModuleID, ResponseType, Convert.ToString(Session["VersionID"]));

                using (XLWorkbook wb = new XLWorkbook())
                {
                    wb.Worksheets.Add(dt, "HCM_SurveyResults");
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

    }
}
