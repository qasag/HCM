using HCM.DAL;
using HCM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HCM.Controllers
{
    public class HomeController : Controller
    {
        ModifyVersionsData Versions_Obj = new ModifyVersionsData();
        ModifyProductData Products_Obj = new ModifyProductData();

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public JsonResult GetClients()
        {
            try
            {

                List<HCM_Client> client_list = new List<HCM_Client>();
                ModifyGlobalClientsData client_Obj = new ModifyGlobalClientsData();
                client_list = client_Obj.GetClients(String.IsNullOrEmpty(Convert.ToString(Session["ClientID"])) ? 0 : Convert.ToInt32(Session["ClientID"]), Convert.ToString(Session["UserType"]));
                if (String.IsNullOrEmpty(Convert.ToString(Session["ClientID"])))
                {
                    Session["ClientID"] = Convert.ToString(client_list.First().ClientID);
                }

                var jsonResult = Json(client_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult AssignClient(int ClientID)
        {

            try
            {
                Session["ClientID"] = Convert.ToString(ClientID);
                Session["VersionID"] = Convert.ToString(Versions_Obj.GetActiveVersions().Where(X => X.IsDefault == true).First().VersionID);
                Session["ProductID"] = Convert.ToInt32(Products_Obj.GetActiveProducts().First().ProductID);

                var jsonResult = Json("Success", JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult AssignVersion(int VersionID)
        {
            try
            {
                Session["VersionID"] = Convert.ToString(VersionID);

                var jsonResult = Json("Success", JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult AssignProduct(int ProductID)
        {
            try
            {
                Session["ProductID"] = Convert.ToInt32(ProductID);
                var jsonResult = Json("Success", JsonRequestBehavior.AllowGet);
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
